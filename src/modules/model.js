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
    this.timeline = [[allTodos,"NONE"]];
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
    this.selectedFilter = newFilter;
    this.addToTimeline(this.allTodos,this.selectedFilter);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  toggleTodoComplete(id) {
    const todoIndex = this.allTodos.findIndex((todo) => todo.id === id);
    const currState = this.allTodos[todoIndex].completed;
    const toggledTodo = {...this.allTodos[todoIndex], completed : !currState};
    this.allTodos = this.allTodos.slice(0,todoIndex).concat(toggledTodo,this.allTodos.slice(todoIndex+1));
    this.addToTimeline(this.allTodos,this.selectedFilter);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  addTodo(body, urgency, category) {
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
    this.addToTimeline(this.allTodos,this.selectedFilter);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  deleteTodo(id) {
    this.allTodos = this.allTodos.filter((todo) => todo.id !== id);
    this.addToTimeline(this.allTodos,this.selectedFilter);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  updateTodo(id, updateObject){
    const todoIndex = this.allTodos.findIndex((todo) => todo.id === id);
    const toggledTodo = {...this.allTodos[todoIndex], ...updateObject};
    this.allTodos = this.allTodos.slice(0,todoIndex).concat(toggledTodo,this.allTodos.slice(todoIndex+1));
    this.addToTimeline(this.allTodos,this.selectedFilter);
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  addToTimeline(todos, selectedFilter){
    const timelineNode = [todos,selectedFilter];
    this.pointInTime = this.pointInTime + 1;
    this.timeline = [...this.timeline.slice(0,this.pointInTime), timelineNode];
  }

  undo(){
    if(this.pointInTime <= 0) return;
    this.pointInTime = this.pointInTime - 1;
    const [todos, selectedFilter] = this.timeline[this.pointInTime];
    this.allTodos = todos;
    this.selectedFilter = selectedFilter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  redo(){
    if(this.pointInTime >= this.timeline.length-1) return;
    this.pointInTime = this.pointInTime + 1;
    const [todos, selectedFilter] = this.timeline[this.pointInTime];
    this.allTodos = todos;
    this.selectedFilter = selectedFilter;
    this.stateChanged(this.allTodos, this.selectedFilter);
  }

  bindStateChange(callback) {
    this.stateChanged = callback;
  }
}
