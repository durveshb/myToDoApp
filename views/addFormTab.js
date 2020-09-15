import {
  createElementHelper,
  createClassedInput,
  createSelectInput,
} from "./../DOMhelpers.js";

function initformTab() {
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
  const urgencyLabel = createElementHelper(
    "label",
    "addForm__label",
    "Urgency"
  );
  const urgency = createSelectInput(
    ["Chose your level of urgency", "Low", "Medium", "High"],
    ["", "1", "2", "3"]
  );
  urgency.classList = "addForm__urgency";
  const categoryLabel = createElementHelper(
    "label",
    "addForm__label",
    "Category"
  );
  const category = createSelectInput(
    ["Chose your task Category", "Personal", "Academic", "Social"],
    ["", "1", "2", "3"]
  );
  category.className = "addForm__category";

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

  document.querySelector(".addForm").append(banner, form);
}

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
  initformTab,
  bindAddTodo,
};
