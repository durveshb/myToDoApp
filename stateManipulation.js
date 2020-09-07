function getIndex(id, arr) {
  return arr.findIndex((elem) => elem.id == id);
}

const getNewId = (() => {
  let id = 100;
  return () => id++;
})();

export function addTodo(todoData) {
  const todoBody = document.querySelector(".addForm__message");
  const urgency = document.querySelector(".addForm__urgency");
  const category = document.querySelector(".addForm__category");

  if (todoBody.value !== "") {
    todoData.push({
      id: getNewId(),
      body: todoBody.value,
      urgency: urgency.value,
      category: category.value,
      completed: false,
      pinned: false,
      timestamp: new Date().toLocaleString(),
    });
  }
  todoBody.value = "";
  urgency.value = 1;
  category.value = 1;

  return todoData;
}

export function markCompleteTodo(target, todoData) {
  const todo = target.closest(".todo");
  if (todo) {
    todo.classList.toggle("todo--completed");
    target.innerHTML =
      target.innerHTML === "Completed. Undo?"
        ? "Mark Complete"
        : "Completed. Undo?";
    const index = getIndex(todo.id, todoData);
    todoData[index].completed = !todoData[index].completed;
  }
  return todoData;
}

export function updateFilter(target, currFilter) {
  if (currFilter === target.id) {
    target.classList.remove("filtericons__icon--selected");
    return "NONE";
  } else {
    if (currFilter != "NONE")
      document
        .querySelector(`#${currFilter}`)
        .classList.remove("filtericons__icon--selected");
    target.classList.add("filtericons__icon--selected");
    return target.id;
  }
}

export function deleteTodo(target, todoData) {
  const todo = target.closest(".todo");
  if (todo) {
    // todoData.splice(getIndex(todo.id, todoData), 1);
    todoData = todoData.filter(elem => elem.id != todo.id); //jerry's implementation
  }
  return todoData;
}

export default {
  addTodo,
  deleteTodo,
  updateFilter,
  markCompleteTodo,
};
