const uuid = (function () {
  let uid = 100;
  return function () {
    uid += 1;
    return uid.toString();
  };
})();

export default class TodoStore {
  constructor(allTodos) {
    this.allTodos = allTodos;
    this.selectedFilter = "NONE";
    this.history = [];
    this.pointInTime = 0;
  }

  getAllTodos() {
    return this.allTodos;
  }

  getSpecificTodo(id) {
    const [todo] = this.allTodos.filter((todo) => todo.id === id);
    return todo;
  }

  getSelectedFilter() {
    return this.selectedFilter;
  }

  setFilter(newFilter) {
    this.addToHistory(this.allTodos,this.selectedFilter);
    this.selectedFilter = newFilter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  toggleTodoComplete(id) {
    this.addToHistory(this.allTodos,this.selectedFilter);
    const todoIndex = this.allTodos.findIndex((todo) => todo.id === id);
    const currState = this.allTodos[todoIndex].completed;
    const toggledTodo = {...this.allTodos[todoIndex], completed : !currState};
    this.allTodos = this.allTodos.slice(0,todoIndex).concat(toggledTodo,this.allTodos.slice(todoIndex+1));
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  addTodo(body, urgency, category) {
    this.addToHistory(this.allTodos,this.selectedFilter);
    const newTodo = {
      id: uuid(),
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    };
    this.allTodos = [...this.allTodos, newTodo];
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  deleteTodo(id) {
    this.addToHistory(this.allTodos,this.selectedFilter);
    this.allTodos = this.allTodos.filter((todo) => todo.id !== id);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  updateTodo(id, updateObject){
    this.addToHistory(this.allTodos,this.selectedFilter);
    const todoIndex = this.allTodos.findIndex((todo) => todo.id === id);
    const toggledTodo = {...this.allTodos[todoIndex], ...updateObject};
    this.allTodos = this.allTodos.slice(0,todoIndex).concat(toggledTodo,this.allTodos.slice(todoIndex+1));
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  addToHistory(todos, selectedFilter){
    const historyNode = [todos,selectedFilter];
    this.history = [...this.history.slice(0,this.pointInTime), historyNode];
    this.pointInTime = this.pointInTime + 1;
  }

  undo(){
    if(this.pointInTime <= 0) return;
    if(this.pointInTime === this.history.length){
      this.addToHistory(this.allTodos, this.selectedFilter);
      this.pointInTime = this.pointInTime - 1;
    }
    this.pointInTime = this.pointInTime - 1;
    const [todos, selectedFilter] = this.history[this.pointInTime];
    this.allTodos = todos;
    this.selectedFilter = selectedFilter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  redo(){
    if(this.pointInTime >= this.history.length-1 || this.history.length === 0) return;
    this.pointInTime = this.pointInTime + 1;
    const [todos, selectedFilter] = this.history[this.pointInTime];
    this.allTodos = todos;
    this.selectedFilter = selectedFilter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  bindStateChange(callback) {
    this.stateChanged = callback;
  }
}
