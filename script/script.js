let addTaskForm = document.getElementById("add-task");
let taskInput = document.getElementById("task-input");
let search = document.getElementById("search");
let taskList = document.getElementById("task-list");
let clearTaskBtn = document.getElementById("clear-task-btn");

addTaskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearTaskBtn.addEventListener("click", clearTasks);
search.addEventListener("keyup", searchTask);

function addTask(e) {
  if (taskInput.value === "") alert("Add a Task");
  else {
    let li = document.createElement("li");
    let deletebtn = document.createElement("button");
    deletebtn.innerText = "Delete";
    li.appendChild(document.createTextNode(taskInput.value + " "));
    li.appendChild(deletebtn);
    taskList.appendChild(li);
    taskInput.value = "";
  }
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.tagName === "BUTTON") {
    if (confirm("Are you sure?")) e.target.parentElement.remove();
  }
}

function clearTasks() {
  taskList.innerHTML = "";
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
