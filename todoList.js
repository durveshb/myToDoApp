import { months, days } from "./dates.js";
import {
  addTodo,
  markCompleteTodo,
  updateFilter,
  deleteTodo,
} from "./stateManipulation.js";
import { displayData, updateAnalytics } from "./viewModule.js";

function TodoAppState(data) {
  this.todoData = data;
  this.counter = this.todoData.length;
  this.selectedFilter = "NONE";

  this.addHandler = (event) => {
    event.preventDefault();
    this.todoData = addTodo([...this.todoData]);
    displayData([...this.todoData], this.selectedFilter);
  };

  this.deleteHandler = (event) => {
    if (event.target.classList.contains("todo__deleteBtn")) {
      this.todoData = deleteTodo(event.target, [...this.todoData]);
      displayData([...this.todoData], this.selectedFilter);
    }
  };

  this.markCompleteHandler = (event) => {
    if (event.target.classList.contains("todo__markComplete")) {
      this.todoData = markCompleteTodo(event.target, [...this.todoData]);
      updateAnalytics([...this.todoData], this.selectedFilter);
    }
  };

  this.filterHandler = (event) => {
    if (event.target.nodeName === "IMG") {
      this.selectedFilter = updateFilter(event.target, this.selectedFilter);
      displayData([...this.todoData], this.selectedFilter);
    }
  };
}

function loadHeader(name) {
  const currDate = new Date();
  document.querySelector(".header__calender").innerHTML = `${
    days[currDate.getDay()]
  }, ${months[currDate.getMonth()]} ${currDate.getDate()}`;
  document.querySelector(".header__logo").innerHTML = `Welcome, ${name}`;
}

function init(data) {
  const AppState = new TodoAppState(data);
  displayData([...AppState.todoData], AppState.selectedFilter);
  loadHeader(params.get("name"));

  const todoDisplay = document.querySelector(".todoDisplay");
  todoDisplay.addEventListener("click", AppState.markCompleteHandler);
  todoDisplay.addEventListener("click", AppState.deleteHandler);
  todoDisplay.addEventListener("mousedown", (e) => e.preventDefault(), false);

  document
    .querySelector(".addForm__form")
    .addEventListener("submit", AppState.addHandler);
  document
    .querySelector(".filter")
    .addEventListener("click", AppState.filterHandler);
}

async function loadData(user) {
  let data = await fetch("./data/todos.json");
  data = await data.json();
  return data[user];
}

const params = new URLSearchParams(window.location.search);
loadData(params.get("name")).then(init);
