let addTaskForm = document.getElementById("add-task");
let taskInput = document.getElementById("task-input");
let search = document.getElementById("search");
let taskList = document.getElementById("task-list");
let clearTaskBtn = document.getElementById("clear-task-btn");

addTaskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTaskBtn.addEventListener("click", clearTasks);
search.addEventListener("keyup", searchTask);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

function addTask(e) {
  if (taskInput.value === "") alert("Add a Task");
  else {
    addToLocalStorage(taskInput.value);
    taskInput.value = "";
  }
  //   e.preventDefault();
}

function removeTask(e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("Are you sure?")) {
      e.target.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

function clearTasks() {
  taskList.innerHTML = "";
  localStorage.clear();
}

function searchTask(e) {
  let searchText = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((li) => {
    let content = li.textContent.toLowerCase();
    if (content.indexOf(searchText) !== -1) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}

function addToLocalStorage(task) {
  let tasks = getFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks = getFromLocalStorage();

  tasks.forEach((task) => {
    let li = document.createElement("li");
    let deletebtn = document.createElement("button");
    deletebtn.innerText = "Delete";
    li.appendChild(document.createTextNode(task + " "));
    li.appendChild(deletebtn);
    taskList.appendChild(li);
  });
}

function removeTaskFromLocalStorage(task) {
  let tasks = getFromLocalStorage();

  let li = task;
  li.removeChild(li.lastChild); // removing button

  tasks.forEach((t, i) => {
    if (li.textContent.trim() === t.trim()) tasks.splice(i, 1);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) tasks = [];
  else tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks;
}
