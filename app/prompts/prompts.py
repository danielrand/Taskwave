prompt = """
I am giving you a list of tasks that I need to get done.
Can you look at these tasks and do the following:
1. Group them based on the category of the task? 
2. Keep the category names general, don't get too specific 
with the task labels. The categories could apply to other tasks as well 
3. Please estimate the time it would take to complete each task in minutes.

Here's the task list: 
{}
When you do that please format the tasks, categories and times 
into a json string. Please just respond with a json string that represents 
the above requirements and the json should conform to this jsonschema
{}
"""

task_schema = {
    "type": "object",
    "properties": {
        "task": {
            "type": "string"
        },
        "time": {
            "type": "integer"
        }
    },
    "required": [
        "task",
        "time"
    ]
}

category_schema = {
    "type": "object",
    "properties": {
        "category": {
            "type": "string"
        },
        "tasks": {
            "type": "array",
            "items": [task_schema]
        }
    },
    "required": [
        "category",
        "tasks"
    ]
}

response_schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "categories": {
            "type": "array",
            "items": [category_schema]
        }
    },
    "required": [
        "categories"
    ]
}
