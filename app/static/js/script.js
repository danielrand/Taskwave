// Categorize tasks into subgroups
function categorizeTasks() {
  var tasksInput = document.getElementById('taskInput');
  var tasks = tasksInput.value.split('\n');
  const requestData = { tasks: tasks };

  fetch("/categorize", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  }).then((response) => response.json())
    .then((data) => {
      // Handle the response from the server here (data contains the categorization result)
      console.log(data);
      console.log(typeof data);
      var categories = data.response.categories;
      displaySubgroups(categories);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle any errors that occurred during the request
    });
}

// Display the subgroups with tasks
function displaySubgroups(categories) {
  var subgroupList = document.getElementById('subgroupList');
  subgroupList.innerHTML = '';
  console.log(categories)
  for (const category of categories) {
    console.log(category)
    var subgroup = createSubgroup(category);
    subgroupList.appendChild(subgroup);
  }
}

// Create a subgroup with tasks
function createSubgroup(category) {
  var subgroup = document.createElement('li');
  subgroup.className = 'subgroup';

  var titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = category.category;
  titleInput.className = 'rounded-t-2xl block -mb-3 h-10 bg-background-dark text-white border-borderColor border-2'
  titleInput.addEventListener('input', function () {
    updateSubgroupTitle(this);
  });
  subgroup.appendChild(titleInput);

  var taskList = document.createElement('ul');
  taskList.className = 'taskList border-borderColor border-2 rounded-b rounded-tr';
  
  var tasks = category.tasks;
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i].task;
    var time = tasks[i].time;
    var taskItem = document.createElement('li');
    taskItem.className = 'text-white font-inter';
    taskItem.innerText = `• ${task.concat(" (", time, " minutes)")}`;
    taskList.appendChild(taskItem);
  }

  subgroup.appendChild(taskList);
  return subgroup;
}

// Update the title of a subgroup
function updateSubgroupTitle(input) {
  var subgroup = input.parentNode;
  var newTitle = input.value;
  subgroup.firstChild.data = newTitle;
}

// Andrew code
document.getElementById('taskInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.value += '\n• ';
  }
})
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('taskInput').value = '• ';

  const textAreaElement = document.getElementById('taskInput');
  textAreaElement.addEventListener('input', () => {
    textAreaElement.style.height = 'auto';
    textAreaElement.style.height = `${textAreaElement.scrollHeight + 10}px`;
  });
})