export default class Model {
  constructor(data) {
    this.data = data;
    this.selectedFilter = "NONE";
    this.counter = data.length;
  }

  getData() {
    return this.data;
  }

  getSelectedFilter() {
    return this.selectedFilter;
  }

  setFilter(filter) {
    this.selectedFilter = filter;
  }

  toggleTodoComplete(id) {
    const [todo] = this.data.filter((item) => item.id === Number(id));
    todo.completed = !todo.completed;
  }

  addTodo(body, urgency, category) {
    this.data.push({
      id: ++counter,
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    });
  }

  deleteTodo(id) {
    this.data = this.data.filter((item) => item.id !== Number(id));
  }
}
