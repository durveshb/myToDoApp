import model from "./model.js";
import view from "./view.js";
import filterTodos from "./filterTodos.js";

function runView() {
  const data = model.getData();
  const filter = model.getSelectedFilter();
  const filteredData = filterTodos(data, filter);
  view.displayTodos(filteredData, handleMarkComplete, handleDelete);
  view.updateFilterTab(filter);
  view.updateAnalytics(filteredData);
}

function handleDelete(id) {
  model.deleteTodo(id);
  runView();
}

function handleMarkComplete(id) {
  model.toggleTodoComplete(id);
  runView();
}

function handleFilter(e) {
  if (e.target.nodeName === "IMG") {
    const currFil = model.getSelectedFilter();
    if (currFil === e.target.id) {
      model.setFilter("NONE");
    } else {
      model.setFilter(e.target.id);
    }
    runView();
  }
}

function handleForm(e) {
  e.preventDefault();
  const todoBody = document.querySelector(".addForm__message");
  const urgency = document.querySelector(".addForm__urgency");
  const category = document.querySelector(".addForm__category");

  if (todoBody.value !== "") {
    model.addTodo(todoBody.value, urgency.value, category.value);
    runView();
  }
  todoBody.value = "";
  urgency.value = 1;
  category.value = 1;
}

function init() {
  model.init("Adam").then(() => {
    view.initView(handleFilter, handleForm);
    runView();
  });
}
init();
