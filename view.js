import { days, months } from "./dates.js";

// nodeName is the only mandatory argument
function createElementHelper(nodeName, className = null, innerHTML = null) {
  const node = document.createElement(nodeName);
  if (className) node.className = className;
  if (innerHTML) node.innerHTML = innerHTML;

  return node;
}

function makeTodoNode(data) {
  const todo = createElementHelper("div", "todo");
  todo.id = data.id;

  const todoBody = createElementHelper("div", "todo__body", data["body"]);
  const timestamp = createElementHelper(
    "div",
    "todo__timestamp",
    data.timestamp
  );
  const features = createElementHelper("div", "todo__features");
  const urgency = createElementHelper("img", "todo__featureImg");
  urgency.src = `./images/urgency/${data.urgency}.svg`;
  const category = createElementHelper("img", "todo__featureImg");
  category.src = `./images/category/${data.category}.svg`;
  features.append(urgency, category);
  const markComplete = createElementHelper(
    "div",
    "todo__markComplete",
    "Mark Complete"
  );
  markComplete.dataset.type = "completeBtn";
  if (data.completed) {
    todo.classList.add("todo--completed");
    markComplete.innerHTML = "Completed. Undo?";
  }
  const deleteButton = createElementHelper("div", "todo__deleteBtn", "X");
  deleteButton.dataset.type = "deleteBtn";

  todo.append(todoBody, timestamp, features, markComplete, deleteButton);
  return todo;
}

function displayTodos(data) {
  const todoDisplay = document.querySelector(".todoDisplay");
  todoDisplay.innerHTML = "";

  const todoNodes = data.map((item) => {
    return makeTodoNode(item);
  });
  todoDisplay.append(...todoNodes);
}

// Correctly display the selected filter
function updateFilterTab(filter) {
  const filterIcons = Array.from(
    document.querySelector(".filtericons").children
  );
  filterIcons.forEach((icon) => {
    icon.classList.remove("filtericons__icon--selected");
    if (icon.id === filter) {
      icon.classList.add("filtericons__icon--selected");
    }
  });
}

// Handle the Analytics tab
function updateProgressCircle(percentage) {
  const progressL = document.querySelector(".graphic__leftProgress");
  const progressR = document.querySelector(".graphic__rightProgress");

  progressL.style.transform =
    "rotate(" +
    (Math.floor(percentage / 50) ? 180 : (percentage * 180) / 50) +
    "deg)";
  progressR.style.transform =
    "rotate(" + (percentage > 50 ? ((percentage - 50) * 180) / 50 : 0) + "deg)";
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
  updateProgressCircle(per);
  percentage.innerHTML = `${per}%`;
  ratio.innerHTML = `${completed} / ${total}`;
}

function loadHeader() {
  const currDate = new Date();
  document.querySelector(".header__calender").innerHTML = `${
    days[currDate.getDay()]
  }, ${months[currDate.getMonth()]} ${currDate.getDate()}`;
}

function showDeleteWarning(todo, deleteHandler) {
  const warning = createElementHelper("div", "deleteWarning");
  const warningNote = createElementHelper(
    "div",
    "deleteNote",
    "You haven't finished this todo yet!"
  );
  let cancelbtn = createElementHelper(
    "button",
    "cancelWarning warningBtn",
    "Cancel"
  );
  let deletebtn = createElementHelper(
    "button",
    "deleteAnyway warningBtn",
    "Delete Anyway"
  );
  cancelbtn.addEventListener("click", () => {
    document.body.removeChild(warning);
    cancelbtn = null;
    deletebtn = null;
  });
  deletebtn.addEventListener("click", () => {
    document.body.removeChild(warning);
    cancelbtn = null;
    deletebtn = null;
    deleteHandler(todo.id);
  });

  warning.append(warningNote, cancelbtn, deletebtn);
  document.body.append(warning);
}

function addTodoHelper(e, callback) {
  e.preventDefault();
  const todoBody = document.querySelector(".addForm__message");
  const urgency = document.querySelector(".addForm__urgency");
  const category = document.querySelector(".addForm__category");

  if (todoBody.value !== "")
    callback(todoBody.value, urgency.value, category.value);

  todoBody.value = "";
  urgency.value = 1;
  category.value = 1;
}

function bindAddTodo(callback) {
  document
    .querySelector(".addForm__form")
    .addEventListener("submit", (e) => addTodoHelper(e, callback));
}

function deleteTodoHelper(e, callback) {
  if (e.target.dataset.type === "deleteBtn") {
    const removedTodo = event.target.closest(".todo");
    callback(removedTodo.id);
  }
}

function bindDeleteTodo(callback) {
  document
    .querySelector(".todoDisplay")
    .addEventListener("click", (e) => deleteTodoHelper(e, callback));
}

function filterTodoHelper(e, callback) {
  if (e.target.nodeName === "IMG") {
    callback(e.target.id);
  }
}

function bindFilterTodo(callback) {
  document
    .querySelector(".filtericons")
    .addEventListener("click", (e) => filterTodoHelper(e, callback));
}

function completeTodoHelper(e, callback) {
  if (e.target.dataset.type === "completeBtn") {
    const toggledTodo = event.target.closest(".todo");
    callback(toggledTodo.id);
  }
}

function bindCompleteTodo(callback) {
  document
    .querySelector(".todoDisplay")
    .addEventListener("click", (e) => completeTodoHelper(e, callback));
}

export default {
  loadHeader,
  displayTodos,
  updateFilterTab,
  updateAnalytics,
  showDeleteWarning,
  bindAddTodo,
  bindDeleteTodo,
  bindFilterTodo,
  bindCompleteTodo,
};
