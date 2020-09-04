function categoryFilter(todos,index){
  return todos.filter(todo => todo.category === index)
}

function urgencyFilter(todos,index){
  return todos.sort((todo1,todo2) => index*(todo1.urgency - todo2.urgency));
}

export default {
  urgencyFilter,
  categoryFilter,
};
