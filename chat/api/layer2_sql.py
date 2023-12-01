from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents.agent_types import AgentType
from langchain.chat_models import ChatOpenAI
import pandas as pd

import sqlite3
import config


def get_sql_agent():
    trips_summary = config.trips_summary_path

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

    return trips_summary_agent_executor
