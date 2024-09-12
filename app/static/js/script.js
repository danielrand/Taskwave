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
    console.log(category);
    const catIndex = categories.indexOf(category);
    // console.log(typeof catIndex);
    var subgroup = createSubgroup(category, catIndex);
    subgroupList.appendChild(subgroup);

    sumTaskTimeCategory(category);
    // logic to express minutes in hours. minutes espressed as decimal point. eg 90 minutes = 1.5 hours
      // must account for 60 minutes in an hour
      // account for 120 minutes in 2 hrs and so on
      // if total minutes is less than 60, then it is expressed as minutes rounded down to nearest quarter hour (45/30/15 minutes)
      // minutes after the hour should be rounded to nearest quarter hour espressed in decimal (45/30/15 minutes)
  }
}

// Create a subgroup with tasks
function createSubgroup(category, catIndex) {
  var subgroup = document.createElement('li');
  subgroup.className = 'subgroup';

  var titleInput = document.createElement('input');
  titleInput.type = 'text';
  const newCategoryTitle = category.category.charAt(0).toUpperCase() + category.category.slice(1);
  titleInput.value = `Group ${catIndex+1}: ${newCategoryTitle}`;
  titleInput.className = 'rounded-t-2xl block -mb-3 h-10 bg-background-dark text-white border-borderColor border-2 text-center'
  titleInput.addEventListener('input', function () {
    updateSubgroupTitle(this);
  });
  subgroup.appendChild(titleInput);

  var taskList = document.createElement('ul');
  taskList.className = 'taskList border-borderColor border-2 rounded-b rounded-tr p-4';
  
  var tasks = category.tasks;
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i].task;
    var time = tasks[i].time;
    var taskItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'mr-2';
    taskItem.className = 'text-white font-inter';
    taskItem.innerText = `${task.concat(" (", time, " minutes)")}`;
    taskList.appendChild(taskItem);
    taskItem.insertAdjacentElement('afterbegin', checkbox);
  }

  const totalMinutes = sumTaskTimeCategory(category);
  const sumTime = document.createElement('p');
  sumTime.className = 'text-white font-inter text-right';
  sumTime.innerText = `${totalMinutes}`;
  taskList.appendChild(sumTime);
  resetTotalMinutes();
  
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

const resetTotalMinutes = () => {
  totalMinutes = 0;
}

const sumTaskTimeCategory = (category) => {
  let totalMinutes = 0;
  category.tasks.forEach(task => {
    totalMinutes += task.time;
  });
  const hoursAndMinutes = readableTimeHoursAndMins(totalMinutes);
  return hoursAndMinutes;
}

const readableTimeHoursAndMins = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  let minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0 && hours === 1) {
    return `${hours} hour`;
  } else if (minutes === 0 && hours > 1) {  
    return `${hours} hours`;
  } else if (minutes > 0 && hours === 1) {
    return `${hours} hour ${minutes} minutes`;
  } else {
    return`${hours} hours ${minutes} minutes`;
  }
}