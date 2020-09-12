import Modal from "./model.js";
import view from "./view.js";
import loadData from "./loadData.js";
import filterTodos from "./filterTodos.js";

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // binding the view event handlers to the controller functions
    this.view.loadHeader();
    this.view.bindAddTodo(this.handleAdd);
    this.view.bindDeleteTodo(this.handleDelete);
    this.view.bindFilterTodo(this.handleFilter);
    this.view.bindCompleteTodo(this.handleMarkComplete);

    //initial paint
    this.runView();
  }

  runView = () => {
    const data = this.model.getData();
    const filter = this.model.getSelectedFilter();
    const filteredData = filterTodos(data, filter);
    this.view.displayTodos(filteredData);
    this.view.updateFilterTab(filter);
    this.view.updateAnalytics(filteredData);
  };

  handleDelete = (id) => {
    this.model.deleteTodo(id);
    this.runView();
  };

  handleMarkComplete = (id) => {
    this.model.toggleTodoComplete(id);
    this.runView();
  };

  handleFilter = (newFil) => {
    const currFil = this.model.getSelectedFilter();
    if (currFil === newFil) {
      this.model.setFilter("NONE");
    } else {
      this.model.setFilter(newFil);
    }
    this.runView();
  }

  handleAdd = (todoBody, urgencyLevel, category) => {
    this.model.addTodo(todoBody, urgencyLevel, category);
    this.runView();
  }
}

loadData("Adam").then((data) => {
  const todoApp = new Controller(new Modal(data), view);
});
