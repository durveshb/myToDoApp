async function loadData(user) {
  let data = await fetch("./data/todos.json");
  data = await data.json();
  return data[user];
}

const model = {
  data: null,
  selectedFilter: "None",
  counter: 0,

  init: function(user){
    return new Promise((res) => {
      loadData(user)
        .then((data) => {
          this.data = data;
          this.counter = data.length;
        })
        .then(res);
    });
  },

  getData: function(){
    return this.data;
  },

  getSelectedFilter: function(){
    return this.selectedFilter;
  },

  setFilter: function(filter){
    this.selectedFilter = filter;
  },

  toggleTodoComplete: function(id){
    const [todo] = this.data.filter((item) => item.id === id);
    todo.completed = !todo.completed;
  },

  addTodo: function(body, urgency, category){
    this.data.push({
      id: ++counter,
      body,
      urgency,
      category,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    });
  },

  deleteTodo: function(id){
    this.data = this.data.filter((item) => item.id !== id);
  },
};

export default model;
