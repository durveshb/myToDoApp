function addTodoHelper(e, callback) {
  e.preventDefault();
  const todoBody = document.querySelector(".addForm__message");
  const urgency = document.querySelector(".addForm__urgency");
  const category = document.querySelector(".addForm__category");

  if (todoBody.value !== "")
    callback(todoBody.value, urgency.value, category.value);

  todoBody.value = "";
  urgency.value = 1;
  category.value = 1;
}

function bindAddTodo(callback) {
  document
    .querySelector(".addForm__form")
    .addEventListener("submit", (e) => addTodoHelper(e, callback));
}

export default {
    bindAddTodo
}