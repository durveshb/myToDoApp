const uuid = (function() {
  let uid = 100;
  return function() {
      uid += 1;
      return uid;
  }
})();

export default class TodoStore {
  constructor(allTodos) {
    this.allTodos = allTodos;
    this.selectedFilter = "NONE";
  }

  getAllTodos() {
    return this.allTodos;
  }

  getSpecificTodo(id){
    const [todo] = this.allTodos.filter((todo) => todo.id === Number(id));
    return todo;
  }

  getSelectedFilter() {
    return this.selectedFilter;
  }

  setFilter(filter) {
    this.selectedFilter = filter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  toggleTodoComplete(id) {
    const [todo] = this.allTodos.filter((todo) => todo.id === Number(id));
    todo.completed = !todo.completed;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  addTodo(body, urgency, category) {
    this.allTodos.push({
      id: uuid(),
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    });
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  deleteTodo(id) {
    this.allTodos = this.allTodos.filter((todo) => todo.id !== Number(id));
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  bindStateChange(callback){
    this.stateChanged = callback;
  }
}
