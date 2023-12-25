from flask import Flask, render_template, jsonify, request
from prompts.prompts import prompt, response_schema
from jsonschema import validate
import os
import openai
import json

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

# print(chat_completion)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('./index.html')
    
@app.route('/categorize/', methods=['POST'])
def my_link():
    data = request.get_json()
    
    # parse tasks list into string for the prompt (is this needed?)
    tasks = data['tasks']
    tasks_str = ""
    for task in tasks:
        tasks_str += f"{task}\n"

    message = prompt.format(tasks_str, response_schema)
    print(message)
    
    # OpenAI API call
    chat_completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-1106", 
        response_format={ "type": "json_object" },
        messages=[{"role": "user", "content": message}],
        temperature=0,
        max_tokens=2624,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    response = chat_completion["choices"][0]["message"]["content"]

    # Check the response to ensure that it's valid json and that it conforms to our expected schema
    json_respone = json.loads(response)
    print(json_respone)
    validate(instance=json_respone, schema=response_schema)
    # Right now we don't catch the exception thrown when the json doesn't conform to the schema or is invalid (we just assume it's valid), maybe we should reinvoke the api?

    return jsonify({"response": json_respone})

if __name__ == '__main__':
    app.run()
