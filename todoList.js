import filterModule from "./filterModule.js";
import {months,days} from "./dates.js";

async function loadData() {
  let data = await fetch("./data/todos.json");
  data = await data.json();
  data = Object.values(data);
  return data;
}

function displayData(todos) {
  let todoDisplay = document.querySelector(".todoDisplay");
  while (todoDisplay.firstChild)
    todoDisplay.removeChild(todoDisplay.firstChild);
  todos.forEach((todo) => {
    todoDisplay.append(todo);
  });
  updateAnalytics(todos);
}

function makeTodo(data) {
  let todo = document.createElement("div");
  todo.id = data.id;
  todo.classList.add("todo");

  let todoBody = document.createElement("div");
  todoBody.classList.add("todoBody");

  let timestamp = document.createElement("div");
  timestamp.classList.add("timestamp");
  timestamp.innerHTML = data.timestamp;  

  let features = document.createElement("div");
  features.classList.add("features");
  let urgency = document.createElement("img");
  urgency.src = "./images/urgency/" + data.urgency + ".svg";
  let category = document.createElement("img");
  category.src = "./images/category/" + data.category + ".svg";
  features.append(urgency, category);

  todo.dataset.urgency = data.urgency;
  todo.dataset.category = data.category;

  let markComplete = document.createElement("div");
  markComplete.classList.add("markComplete");

  let deleteButton = document.createElement("div");
  deleteButton.classList.add("deleteBtn");
  deleteButton.innerHTML = "X";

  todoBody.innerHTML = data["body"];
  markComplete.innerHTML = "Mark Complete";

  if (data.completed) {
    todo.classList.add("completed");
    markComplete.innerHTML = "Completed. Undo?";
  }

  todo.append(todoBody, timestamp, features, markComplete, deleteButton);
  return todo;
}

function updateAnalytics(todos) {
  let percentage = document.getElementById("percentageComplete");
  let ratio = document.getElementById("completeRatio");

  let completed = todos.filter((todo) => todo.classList.contains("completed"))
    .length;
  let total = todos.length;
  if (total === 0) {
    percentage.innerHTML = "0%";
    ratio.innerHTML = "0 / 0";
    return;
  }

  let per = Math.floor((completed * 100) / total);

  let progressL = document.querySelector(".leftProgress");
  let progressR = document.querySelector(".rightProgress");

  progressL.style.transform =
    "rotate(" + (Math.floor(per / 50) ? 180 : (per * 180) / 50) + "deg)";
  progressR.style.transform =
    "rotate(" + (per > 50 ? ((per - 50) * 180) / 50 : 0) + "deg)";

  percentage.innerHTML = per + "%";
  ratio.innerHTML = completed + " / " + total;
}

function getIndex(id, arr) {
  return arr.findIndex((elem) => elem.id == id);
}

function TodoAppState(data) {
  this.todoData = data;
  this.nodeList = data.map(makeTodo);
  this.filteredNodelist = this.nodeList;
  this.counter = this.nodeList.length;
  this.selectedFilter = undefined;

  this.markCompleteHandler = (event) => {
    let todo = event.target.closest(".todo");
    if (todo && event.target.classList.contains("markComplete")) {
      todo.classList.toggle("completed");
      event.target.innerHTML =
        event.target.innerHTML === "Completed. Undo?"
          ? "Mark Complete"
          : "Completed. Undo?";
      let index = getIndex(todo.id, this.todoData);
      this.todoData[index].completed = !this.todoData[index].completed;

      updateAnalytics(this.filteredNodelist);
    }
  };

  this.addHandler = (event) => {
    event.preventDefault();
    let todoBody = document.querySelector("input");
    let urgency = document.getElementById("urgency");
    let category = document.getElementById("category");

    if (todoBody.value !== "") {
      let newTodo = {
        id: ++this.counter,
        body: todoBody.value,
        urgency: urgency.value,
        category: category.value,
        timestamp: new Date().toLocaleString(),
      };

      this.todoData.push(newTodo);
      this.nodeList.push(makeTodo(newTodo));
      displayData(this.nodeList);

      todoBody.value = "";
      urgency.value = 1;
      category.value = 1;
    }
  };

  this.filterHelper = (category) => {
    this.filteredNodelist = filterModule.categoryFilter(
      this.nodeList,
      category
    );
    displayData(this.filteredNodelist);
    updateAnalytics(this.filteredNodelist);
  };

  this.filterHandler = (event) => {
    if (event.target.nodeName === "IMG") {
      if (this.selectedFilter)
        this.selectedFilter.classList.remove("fil-selected");
      if(this.selectedFilter === event.target){
          this.nodeList.forEach(node => node.style.order = 0);
          this.selectedFilter = undefined;
          displayData(this.nodeList);
          return;
      }  
      event.target.classList.add("fil-selected");
      this.selectedFilter = event.target;
      switch (event.target.id) {
        case "fil-ug-dec": {
          this.filteredNodelist = filterModule.urgencyFilter(this.nodeList, -1);
          displayData(this.filteredNodelist);
          break;
        }
        case "fil-ug-inc": {
          this.filteredNodelist = filterModule.urgencyFilter(this.nodeList, 1);
          displayData(this.filteredNodelist);
          break;
        }
        case "fil-cg-per": {
          this.filterHelper(1);
          break;
        }
        case "fil-cg-aca": {
          this.filterHelper(2);
          break;
        }
        case "fil-cg-soc": {
          this.filterHelper(3);
          break;
        }
        default:
          displayData(this.filteredNodelist);
      }
    }
  };

  this.deleteHelper = (arr, elem) => {
    let index = arr.indexOf(elem);
    if (index != -1) arr.splice(index, 1);
  };
  this.deleteHandler = (event) => {
    if (event.target.classList.contains("deleteBtn")) {
      let todo = event.target.closest(".todo");
      if (todo) {
        this.deleteHelper(this.nodeList, todo);
        this.deleteHelper(this.filteredNodelist, todo);
        this.todoData.splice(getIndex(todo.id, this.todoData), 1);

        displayData(this.filteredNodelist);
      }
    }
  };
}

loadData().then((data) => {
  let AppState = new TodoAppState(data);
  displayData(AppState.nodeList);
  document
    .querySelector("form")
    .addEventListener("submit", AppState.addHandler);
  document
    .querySelector(".todoDisplay")
    .addEventListener("click", AppState.markCompleteHandler);
  document
    .querySelector(".filter")
    .addEventListener("click", AppState.filterHandler);
  document
    .querySelector(".todoDisplay")
    .addEventListener("click", AppState.deleteHandler);
});

let d = new Date();
document.querySelector(".calender").innerHTML = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
