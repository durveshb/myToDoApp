const incUrgency = 1;
const decUrgency = -1;
const onlyPersonal = "1";
const onlyAcademic = "2";
const onlySocial = "3";

export const filters = [
  { filId: "fil-ug-dec", src: "./images/urgency/3.svg" },
  { filId: "fil-ug-inc", src: "./images/urgency/1.svg" },
  { filId: "fil-cg-per", src: "./images/category/1.svg" },
  { filId: "fil-cg-aca", src: "./images/category/2.svg" },
  { filId: "fil-cg-soc", src: "./images/category/3.svg" },
]

function makeObjCopy(obj) {
  const copy = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Array) copy[key] = makeArrCopy(obj[key]);
    else if (obj[key] instanceof Object) copy[key] = makeObjCopy(obj[key]);
    else copy[key] = obj[key];
  });
  return copy;
}

function makeArrCopy(todos) {
  const newTodos = [];
  todos.forEach((todo) => {
    if (todo instanceof Array) newTodos.push(makeArrCopy(todo));
    else if (todo instanceof Object) newTodos.push(makeObjCopy(todo));
    else newTodos.push(todo);
  });

  return newTodos;
}

function categoryFilter(todos, index) {
  return todos.filter((todo) => todo.category === index);
}

function urgencyFilter(todos, index) {
  return todos.sort((todo1, todo2) => index * (todo1.urgency - todo2.urgency));
}

export default function filterTodos(todos, selectedFilter) {
  let filteredTodos = makeArrCopy(todos);
  switch (selectedFilter) {
    case "fil-ug-dec": {
      filteredTodos = urgencyFilter(filteredTodos, decUrgency);
      break;
    }
    case "fil-ug-inc": {
      filteredTodos = urgencyFilter(filteredTodos, incUrgency);
      break;
    }
    case "fil-cg-per": {
      filteredTodos = categoryFilter(filteredTodos, onlyPersonal);
      break;
    }
    case "fil-cg-aca": {
      filteredTodos = categoryFilter(filteredTodos, onlyAcademic);
      break;
    }
    case "fil-cg-soc": {
      filteredTodos = categoryFilter(filteredTodos, onlySocial);
      break;
    }
    default:
      return todos;
  }
  return filteredTodos;
}
