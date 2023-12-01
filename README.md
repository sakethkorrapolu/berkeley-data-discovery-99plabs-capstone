# Berkeley Data Science Discovery Program & 99P Labs
## Data Analyst in a Box

<img width="1354" alt="front" src="https://github.com/cat-chu/honda-99plabs-data-analyst-in-a-box/assets/88006309/182cb426-c4b4-4f56-9640-f65c256f7c15">
<img width="1298" alt="visual" src="https://github.com/cat-chu/honda-99plabs-data-analyst-in-a-box/assets/88006309/283f70d8-b1b1-4c3e-acd0-27c5dbe323c4">

### To run the React frontend:
* `cd chat`
* `npm i`
* `npm start`

---

### To run the Flask API:
* `cd chat/api`
* Create a virtual environment:
    * `python3 -m venv venv`
    * `. venv/bin/activate`
* To deactivate: 
    * `deactivate`

* `pip install -r requirements.txt`
* Add OpenAI API key, path to csv file, and database uri to config.py file
    * DB URI should look like: `sqlite:////{path_to_db}trips_summary.db`
* `flask run`
