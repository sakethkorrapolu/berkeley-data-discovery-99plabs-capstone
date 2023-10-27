# Berkeley Data Science Discovery Program & 99P Labs
## Data Analyst in a Box

To run the React frontend:
* cd chat
* npm start

---

To run the Flask API:
* `cd chat/api`
* Create a virtual environment:
    * `python3 -m venv venv`
    * `. venv/bin/activate`
* To deactivate: 
    * `deactivate`

* `pip install -r requirements.txt`
* Add OpenAI API key, path to csv file, and database uri to config.py file
    * DB URI should look like: `sqlite:////{path_to_db}trips_summary.db`
*`flask run`