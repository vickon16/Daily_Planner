
$(document).ready(function() {
  //add task event
  $("#addTaskForm").on("submit", function(e){
    addTask(e);
  })

  //edit task event
  $("#editTaskForm").on("submit", function(e){
    updateTask(e);
  })

  //remove task event
  $("#task-table").on("click", "#remove-task", function() {
    id = $(this).data("id");
    removeTask(id);
  })

  //clear all task
  $("#clear-tasks").on("click", function() {
    clearAllTasks();
  })


  displayTask();

  

  //function to add a task
  function addTask(e) {
    //add a unique ID
    var newDate, id, task, task_priority, task_date, task_time
    newDate = new Date();
    id = newDate.getTime();

    task = $("#task").val();
    task_priority = $("#priority").val();
    task_date = $("#date").val();
    task_time = $("#time").val();
    
    //simple Validation
    if(task == "") {
      alert("Task field is required!!")
      e.preventDefault();//prevent it from redirecting back to index.html page
    } else if (task_priority == "") {
      task_priority = "Normal";
    } else if (task_date == "") {
      alert("Date field is required")
      e.preventDefault();
    } else if (task_time == "") {
      alert("Time field is required")
      e.preventDefault();
    } else {

     tasks = JSON.parse(localStorage.getItem("tasks"));

     //check for tasks
     if(tasks == null) {
       tasks = [];
     }

     //new Task object
     var newTask = {
       "id": id,
       "task":task,
       "task_priority":task_priority,
       "task_date":task_date,
       "task_time":task_time
     }

     tasks.push(newTask);
     localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  // function to update task

  function updateTask(e) {
    var id, task, task_priority, task_date, task_time

    id = $("#task_id").val();
    task = $("#task").val();
    task_priority = $("#priority").val();
    task_date = $("#date").val();
    task_time = $("#time").val();

    taskList = JSON.parse(localStorage.getItem("tasks"));
    
    for (var i=0; i < taskList.length; i++) {
      if(taskList[i].id == id) {
        taskList.splice(i,1);
      }
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }

     //simple Validation
    if(task == "") {
      alert("Task field is required!!")
      e.preventDefault();//prevent it from redirecting back to index.html page
    } else if (task_priority == "") {
      task_priority = "Normal";
    } else if (task_date == "") {
      alert("Date field is required")
      e.preventDefault();
    } else if (task_time == "") {
      alert("Time field is required")
      e.preventDefault();
    } else{

     tasks = JSON.parse(localStorage.getItem("tasks"));

     //check for tasks
     if(tasks == null) {
       tasks = [];
     }

     //new Task object
     var newTask = {
       "id": id,
       "task":task,
       "task_priority":task_priority,
       "task_date":task_date,
       "task_time":task_time
     }

     tasks.push(newTask);
     localStorage.setItem("tasks", JSON.stringify(tasks));
    }

  }


  //function to remove task

  function removeTask(id) {
    if(confirm("Are you sure you want to delete this Task??")) {
      var taskList = JSON.parse(localStorage.getItem("tasks"));

      for (var i=0; i < taskList.length; i++) {
      if(taskList[i].id == id) {
        taskList.splice(i,1);
      }
      localStorage.setItem("tasks", JSON.stringify(taskList));
      }
      location.reload();
    }
  }

  //function to clear all tasks

  function clearAllTasks() {
    if (confirm("Do you want to clear all tasks?")) {
      localStorage.clear();
      location.reload();
    }
  }

  //function to display task
  function displayTask() {
    var taskList = JSON.parse(localStorage.getItem("tasks"));

    if (taskList != null) {
      taskList = taskList.sort(sortByTime);
    }

    //set Counter
    var i = 0;
    //check task
    if(localStorage.getItem("tasks") != null) {
      //loop through each display
      $.each(taskList, function(key, value) {
          $("#task-table").append('<tr id="' + value.id + '">' + "<td>" + value.task + "</td><td>" + value.task_priority + "</td><td>" + value.task_date + "</td><td>" + value.task_time + "</td><td><a href='edit.html?id="+ value.id +"'>Edit</a> | <a href='#' id='remove-task' data-id='"+ value.id +"'>Remove</a></td>" + "</tr>");
      })
    }
    
  }

  //function to sort task
    function sortByTime(a, b) {
      var aTime = a.task_time;
      var bTime = b.task_time;
      return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0
      ));
  }

});

//fucntion for getting a simple task
function getTask() {
  var $_GET = getQueryParams(document.location.search);
  id = $_GET["id"];

  var taskList = JSON.parse(localStorage.getItem("tasks"));

  for(var i=0; i < taskList.length; i++) {
    if(taskList[i].id == id) {
      $("#editTaskForm #task_id").val(taskList[i].id);
      $("#editTaskForm #task").val(taskList[i].task);
      $("#editTaskForm #priority").val(taskList[i].task_priority);
      $("#editTaskForm #date").val(taskList[i].task_date);
      $("#editTaskForm #time").val(taskList[i].task_time);

    }
  }

}

//function to get http query params
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");
  var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;

}