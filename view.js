import {days,months} from "./dates.js";

function makeTodo(data, completeCallback, deleteCallback) {
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
  markComplete.addEventListener("click", () => {
    completeCallback(data.id);
  });

  if (data.completed) {
    todo.classList.add("todo--completed");
    markComplete.innerHTML = "Completed. Undo?";
  }

  const deleteButton = document.createElement("div");
  deleteButton.classList.add("todo__deleteBtn");
  deleteButton.innerHTML = "X";
  deleteButton.addEventListener("click", () => {
    deleteCallback(data.id);
  });

  todo.append(todoBody, timestamp, features, markComplete, deleteButton);
  return todo;
}

function displayTodos(data, completeCallback, deleteCallback) {
  const todoDisplay = document.querySelector(".todoDisplay");
  todoDisplay.innerHTML = "";

  const todoNodes = data.map((item) => {
    return makeTodo(item, completeCallback, deleteCallback);
  });
  todoDisplay.append(...todoNodes);
}

function updateFilterTab(filter) {
    let filterIcons = Array.from(document.querySelector(".filtericons").children);
    filterIcons.forEach(icon => {
        icon.classList.remove("filtericons__icon--selected");
        if(icon.id === filter){
            icon.classList.add("filtericons__icon--selected");
        }
    })
}

function updateAnalytics(data) {
  const percentage = document.querySelector(".analytics__percentage");
  const ratio = document.querySelector(".analytics__ratio");

  const completed = data.filter((todo) => todo.completed).length;
  const total = data.length;

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

function loadHeader(name) {
  const currDate = new Date();
  document.querySelector(".header__calender").innerHTML = `${
    days[currDate.getDay()]
  }, ${months[currDate.getMonth()]} ${currDate.getDate()}`;
}

function initView(filterCallback, addFormCallback) {
  loadHeader();
  document
    .querySelector(".filtericons")
    .addEventListener("click", filterCallback);

  document
    .querySelector(".addForm__form")
    .addEventListener("submit", addFormCallback);
}

export default {
  displayTodos,
  updateFilterTab,
  updateAnalytics,
  initView
};
