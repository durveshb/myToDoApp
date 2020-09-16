import TodoStore from "./model.js";
import view from "./view.js";
import loadData from "./loadData.js";
import filterTodos from "./filterTodos.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // listen to model state change
    this.model.bindStateChange(this.runView);
    // binding the view event handlers to the controller functions
    this.view.bindAddTodo(this.handleAdd);
    this.view.bindDeleteTodo(this.handleDelete);
    this.view.bindFilterTodo(this.handleFilter);
    this.view.bindCompleteTodo(this.handleMarkComplete);

    //initial paint
    this.runView(this.model.getAllTodos(), this.model.getSelectedFilter());
  }

  runView = (todos, filter) => {
    const filteredTodos = filterTodos(todos, filter);
    console.log(todos, filteredTodos);
    this.view.displayTodos(filteredTodos);
    this.view.updateFilterTab(filter);
    this.view.updateAnalytics(filteredTodos);
  };

  handleDelete = (id) => {
    const targetTodo = this.model.getSpecificTodo(id);
    if (targetTodo.completed) {
      this.model.deleteTodo(id);
    } else {
      this.view.showDeleteWarning(targetTodo, this.forceDelete);
    }
  };

  forceDelete = (id) => {
    this.model.deleteTodo(id);
  };

  handleMarkComplete = (id) => {
    this.model.toggleTodoComplete(id);
  };

  handleFilter = (newFil) => {
    const currFil = this.model.getSelectedFilter();
    if (currFil === newFil) {
      this.model.setFilter("NONE");
    } else {
      this.model.setFilter(newFil);
    }
  };

  handleAdd = (todoBody, urgencyLevel, category) => {
    this.model.addTodo(todoBody, urgencyLevel, category);
  };
}

loadData("Adam").then((todoData) => {
  const todoApp = new Controller(new TodoStore(todoData), view);
});
view.initView();
