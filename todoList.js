import filterModule from "./filterModule.js";
import { months, days } from "./dates.js";

async function loadData(user) {
  let data = await fetch("./data/todos.json");
  data = await data.json();
  return data[user];
}

function displayData(todos, selectedFilter) {
  const todoDisplay = document.querySelector(".todoDisplay");
  const todoNodes = filterTodos(todos, selectedFilter).map(makeTodo);

  while (todoDisplay.firstChild)
    todoDisplay.removeChild(todoDisplay.firstChild);
  todoDisplay.append(...todoNodes);

  updateAnalytics(todos, selectedFilter);
}

function makeTodo(data) {
  const todo = document.createElement("div");
  todo.id = data.id;
  todo.classList.add("todo");

  const todoBody = document.createElement("div");
  todoBody.classList.add("todo__body");
  todoBody.innerHTML = data["body"];

  const timestamp = document.createElement("div");
  timestamp.classList.add("todo__timestamp");
  timestamp.innerHTML = data.timestamp;

  const features = document.createElement("div");
  features.classList.add("todo__features");
  const urgency = document.createElement("img");
  urgency.classList.add("todo__featureImg");
  urgency.src = "./images/urgency/" + data.urgency + ".svg";
  const category = document.createElement("img");
  category.classList.add("todo__featureImg");
  category.src = "./images/category/" + data.category + ".svg";
  features.append(urgency, category);

  const markComplete = document.createElement("div");
  markComplete.classList.add("todo__markComplete");
  markComplete.innerHTML = "Mark Complete";

  if (data.completed) {
    todo.classList.add("todo--completed");
    markComplete.innerHTML = "Completed. Undo?";
  }

  const deleteButton = document.createElement("div");
  deleteButton.classList.add("todo__deleteBtn");
  deleteButton.innerHTML = "X";

  todo.append(todoBody, timestamp, features, markComplete, deleteButton);
  return todo;
}

function updateAnalytics(todos, selectedFilter) {
  const percentage = document.querySelector(".analytics__percentage");
  const ratio = document.querySelector(".analytics__ratio");

  const filteredTodos = filterTodos(todos, selectedFilter);
  const completed = filteredTodos.filter((todo) => todo.completed).length;
  const total = filteredTodos.length;

  if (total === 0) {
    percentage.innerHTML = "0%";
    ratio.innerHTML = "0 / 0";
    return;
  }

  const per = Math.floor((completed * 100) / total);

  const progressL = document.querySelector(".graphic__leftProgress");
  const progressR = document.querySelector(".graphic__rightProgress");

  progressL.style.transform =
    "rotate(" + (Math.floor(per / 50) ? 180 : (per * 180) / 50) + "deg)";
  progressR.style.transform =
    "rotate(" + (per > 50 ? ((per - 50) * 180) / 50 : 0) + "deg)";

  percentage.innerHTML = per + "%";
  ratio.innerHTML = completed + " / " + total;
}

function filterTodos(todos, selectedFilter) {
  let filteredTodos = [...todos];
  switch (selectedFilter) {
    case "fil-ug-dec": {
      filteredTodos = filterModule.urgencyFilter(filteredTodos, -1);
      break;
    }
    case "fil-ug-inc": {
      filteredTodos = filterModule.urgencyFilter(filteredTodos, 1);
      break;
    }
    case "fil-cg-per": {
      filteredTodos = filterModule.categoryFilter(filteredTodos, 1);
      break;
    }
    case "fil-cg-aca": {
      filteredTodos = filterModule.categoryFilter(filteredTodos, 2);
      break;
    }
    case "fil-cg-soc": {
      filteredTodos = filterModule.categoryFilter(filteredTodos, 3);
      break;
    }
    default:
  }
  return filteredTodos;
}

function getIndex(id, arr) {
  return arr.findIndex((elem) => elem.id == id);
}

function TodoAppState(data) {
  this.todoData = data;
  this.counter = this.todoData.length;
  this.selectedFilter = "NONE";

  this.markCompleteHandler = (event) => {
    const todo = event.target.closest(".todo");
    if (todo && event.target.classList.contains("todo__markComplete")) {
      todo.classList.toggle("todo--completed");
      event.target.innerHTML =
        event.target.innerHTML === "Completed. Undo?"
          ? "Mark Complete"
          : "Completed. Undo?";
      const index = getIndex(todo.id, this.todoData);
      this.todoData[index].completed = !this.todoData[index].completed;

      updateAnalytics(this.todoData, this.selectedFilter);
    }
  };

  this.addHandler = (event) => {
    event.preventDefault();
    const todoBody = document.querySelector(".addForm__message");
    const urgency = document.querySelector(".addForm__urgency");
    const category = document.querySelector(".addForm__category");

    if (todoBody.value !== "") {
      this.todoData.push({
        id: ++this.counter,
        body: todoBody.value,
        urgency: urgency.value,
        category: category.value,
        completed: false,
        pinned: false,
        timestamp: new Date().toLocaleString(),
      });

      displayData(this.todoData, this.selectedFilter);

      todoBody.value = "";
      urgency.value = 1;
      category.value = 1;
    }
  };

  this.filterHandler = (event) => {
    if (event.target.nodeName === "IMG") {
      if (this.selectedFilter === event.target.id) {
        event.target.classList.remove("filtericons__icon--selected");
        this.selectedFilter = "NONE";
      } else {
        const filterIcons = document.querySelector(".filtericons");
        Array.from(filterIcons.children).forEach((child) =>
          child.classList.remove("filtericons__icon--selected")
        );
        event.target.classList.add("filtericons__icon--selected");
        this.selectedFilter = event.target.id;
      }
      displayData(this.todoData, this.selectedFilter);
    }
  };

  this.deleteHandler = (event) => {
    if (event.target.classList.contains("todo__deleteBtn")) {
      const todo = event.target.closest(".todo");
      if (todo) {
        this.todoData.splice(getIndex(todo.id, this.todoData), 1);
        displayData(this.todoData);
      }
    }
  };
}

function loadDate() {
  const currDate = new Date();
  document.querySelector(".header__calender").innerHTML = `${
    days[currDate.getDay()]
  }, ${months[currDate.getMonth()]} ${currDate.getDate()}`;
}

loadData("Eve").then((data) => {
  const AppState = new TodoAppState(data);
  displayData(AppState.todoData, AppState.selectedFilter);
  loadDate();

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
});
