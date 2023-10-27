from flask import Flask, request, jsonify
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents.agent_types import AgentType
from langchain.chat_models import ChatOpenAI
import sqlite3
import config
import pandas as pd

trips_summary = config.trips_summary_path
VERBOSE_LANGCHAIN = False


def create_sqlite_db_from_csv(csv_url, db_name, table_name):
    conn = sqlite3.connect(db_name)
    with open(csv_url, "r") as f:
        data_df = pd.read_csv(f)

    data_df.to_sql(table_name, conn, if_exists="replace", index=False)
    conn.commit()
    conn.close()
    print(f"Database {db_name} with table {table_name} created successfully!")


create_sqlite_db_from_csv(
    trips_summary, db_name="trips_summary.db", table_name="trips_summary"
)

trips_summary_db_uri = config.db_uri
trips_summary_db = SQLDatabase.from_uri(trips_summary_db_uri)
trips_summary_toolkit = SQLDatabaseToolkit(
    db=trips_summary_db,
    llm=OpenAI(
        temperature=0,
        openai_api_key=config.api_key,
    ),
)

trips_summary_agent_executor = create_sql_agent(
    llm=ChatOpenAI(
        temperature=0, model="gpt-3.5-turbo-0613", openai_api_key=config.api_key
    ),
    toolkit=trips_summary_toolkit,
    verbose=True,
    agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
)

app = Flask(__name__)


@app.route("/api/llm", methods=["POST"])
def predict():
    query = request.json["text"]
    query_template = f"{query} Execute all necessary queries, and always return results to the query, no explanations or apologies please. Word wrap output every 50 characters."
    result = trips_summary_agent_executor.run(query_template)
    return jsonify({"res": result})
