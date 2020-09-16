import {createElementHelper} from "./../DOMhelpers.js";
import {urgencyLevels,categories} from "./../appConstants.js";

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
  urgency.src = urgencyLevels.find(level => level.value === data.urgency).src;
  const category = createElementHelper("img", "todo__featureImg");
  category.src = categories.find(category => category.value === data.category).src;
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
  const todoDisplay = document.querySelector('[data-containertype="todoDisplay"]');
  todoDisplay.innerHTML = "";

  const todoNodes = data.map((item) => {
    return makeTodoNode(item);
  });
  todoDisplay.append(...todoNodes);
}

function deleteTodoHelper(e, callback) {
  if (e.target.dataset.type === "deleteBtn") {
    const removedTodo = event.target.closest(".todo");
    callback(removedTodo.id);
  }
}

function bindDeleteTodo(callback) {
  document
    .querySelector('[data-containertype="todoDisplay"]')
    .addEventListener("click", (e) => deleteTodoHelper(e, callback));
}

function completeTodoHelper(e, callback) {
  if (e.target.dataset.type === "completeBtn") {
    const toggledTodo = event.target.closest(".todo");
    callback(toggledTodo.id);
  }
}

function bindCompleteTodo(callback) {
  document
    .querySelector('[data-containertype="todoDisplay"]')
    .addEventListener("click", (e) => completeTodoHelper(e, callback));
}

export default {
  displayTodos,
  bindDeleteTodo,
  bindCompleteTodo,
};
