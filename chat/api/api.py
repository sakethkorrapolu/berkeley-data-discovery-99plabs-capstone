from flask import Flask, request, jsonify
import shutil
import layer1
import layer2_pandasai
import layer2_sql

############ SQL Queries #############

sql_agent = layer2_sql.get_sql_agent()

############ PandasAI Visualizations #############

trips_summary_sdf = layer2_pandasai.get_pandasai_model()

############ Flask App #############

app = Flask(__name__)


@app.route("/api/llm", methods=["POST"])
def predict():
    query = request.json["text"]
    output_type = "sql"
    result = ""

    output_type = layer1.determine_output_type(query)

    if output_type == "numerical":
        query_template = f"{query} Execute all necessary queries, and always return results to the query, no explanations or apologies please. Word wrap output every 50 characters."
        result = sql_agent.run(query_template)

    elif output_type == "visual":
        temp = trips_summary_sdf.chat("Using dfs[0], " + query)
        shutil.copyfile(
            "./exports/charts/temp_chart.png", "../src/assets/temp_chart.png"
        )
        result = "visual"

    return jsonify({"res": result})


if __name__ == "__main__":
    app.run()
