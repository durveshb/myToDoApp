import {
  createElementHelper,
  createClassedInput,
  createSelectInput,
} from "./../DOMhelpers.js";

import {urgencyLevels, categories} from "./../appConstants.js";

function initFormTab() {
  const banner = createElementHelper("div", "addForm__banner");
  const bannerInner = createElementHelper("h1", null, "Create ToDO");
  banner.append(bannerInner);
  const form = createElementHelper("form", "addForm__form");
  form.action = "submit";
  const inputLabel = createElementHelper("label", "addForm__label", "Message");
  const input = createClassedInput(
    "text",
    "Add your todo..",
    "addForm__message"
  );
  input.dataset.addform = "message";
  const urgencyLabel = createElementHelper(
    "label",
    "addForm__label",
    "Urgency"
  );
  const urgency = createSelectInput(
    urgencyLevels.map((item)=>item.level),
    urgencyLevels.map((item)=>item.value)
  );
  urgency.classList = "addForm__urgency";
  urgency.dataset.addform = "urgency";
  const categoryLabel = createElementHelper(
    "label",
    "addForm__label",
    "Category"
  );
  const category = createSelectInput(
    categories.map((item)=>item.name),
    categories.map((item)=>item.value)
  );
  category.className = "addForm__category";
  category.dataset.addform = "category";
  const submit = createElementHelper("button", "addForm__submit", "Add");

  form.append(
    inputLabel,
    input,
    urgencyLabel,
    urgency,
    categoryLabel,
    category,
    submit
  );

  document
    .querySelector('[data-containertype="addFormTab"]')
    .append(banner, form);
}

function addTodoHelper(e, callback) {
  e.preventDefault();
  const todoBody = document.querySelector('[data-addform="message"]');
  const urgency = document.querySelector('[data-addform="urgency"]');
  const category = document.querySelector('[data-addform="category"]');

  if (todoBody.value !== "")
    callback(todoBody.value, urgency.value, category.value);

  todoBody.value = "";
  urgency.value = 1;
  category.value = 1;
}

function bindAddTodo(callback) {
  document
    .querySelector('[data-containertype="addFormTab"]')
    .addEventListener("submit", (e) => addTodoHelper(e, callback));
}

export default {
  initFormTab,
  bindAddTodo,
};
