prompt = """
I am giving you a list of tasks that I need to get done 
can you look at these tasks on group based on the category 
of the task? Also, can you please keep the tasks general, 
don't get too specific in labeling the tasks so that the 
categories could apply to other tasks as well here's the tasks: 
{}
When you do that please format the tasks and 
categories into a json string. Please just respond with the json 
and the json should conform to this jsonschema
{}
"""

response_schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "categories": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "category": {
              "type": "string"
            },
            "tasks": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                }
              ]
            }
          },
          "required": [
            "category",
            "tasks"
          ]
        }
      ]
    }
  },
  "required": [
    "categories"
  ]
}