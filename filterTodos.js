const incUrgency = 1;
const decUrgency = -1;
const onlyPersonal = 1;
const onlyAcademic = 2;
const onlySocial = 3;

function categoryFilter(todos,index){
  return todos.filter(todo => todo.category === index)
}

function urgencyFilter(todos,index){
  return todos.sort((todo1,todo2) => index*(todo1.urgency - todo2.urgency));
}

function makeCopy(todos){
    return todos;
}

export default function filterTodos(todos, selectedFilter) {
  let filteredTodos = makeCopy(todos);
  switch (selectedFilter) {
    case "fil-ug-dec": {
      filteredTodos = urgencyFilter(todos, decUrgency);
      break;
    }
    case "fil-ug-inc": {
      filteredTodos = urgencyFilter(todos, incUrgency);
      break;
    }
    case "fil-cg-per": {
      filteredTodos = categoryFilter(todos, onlyPersonal);
      break;
    }
    case "fil-cg-aca": {
      filteredTodos = categoryFilter(todos, onlyAcademic);
      break;
    }
    case "fil-cg-soc": {
      filteredTodos = categoryFilter(todos, onlySocial);
      break;
    }
    default: return todos;
  }
  return filteredTodos;
}