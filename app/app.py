from flask import Flask, render_template, jsonify, request
import os
import openai
import json

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

# print(chat_completion)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/categorize/', methods=['POST'])
def my_link():
    data = request.get_json()
    tasks = data['tasks']
    tasks_str = ""
    for task in tasks:
        tasks_str += f"{task}\n"
    prompt = "I am giving you a list of tasks that I need to get done. can you look at these tasks on group based on the category of the task? also can you please keep the tasks general, don't get too specific in labeling the tasks so that the categories could apply to other tasks as well here's the tasks: " + tasks_str + " when you do that please format the tasks and categories into a json string. please just respond with the json and the json should be fomatted like so {'categories': [{'category': 'Category name goes here', 'tasks': ['Repot the snake plant', 'Declutter the apartment']}, {'category': 'Second category', 'tasks': ['Buy a new phone']}]}"
    print(prompt)
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k", 
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        max_tokens=2624,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    response = chat_completion["choices"][0]["message"]["content"]
    json_data = json.loads(response)
    print(json_data)
    return jsonify({"response": json_data})

if __name__ == '__main__':
    app.run()
