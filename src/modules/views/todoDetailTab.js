import { createElementHelper } from "./../DOMhelpers.js";
import { urgencyLevels, categories } from "./../appConstants.js";

let confirmChangeHandler = null;

function handleOptionToggle(e) {
  if (e.target.nodeName === "IMG") {
    const optionContainer = e.target.closest("[data-detailtype]");
    const options = Array.from(optionContainer.children);
    options.forEach((option) => {
      option.classList.remove("detail--selectedOption");
    });
    e.target.classList.add("detail--selectedOption");
  }
}

function showTodoDetail(todo) {
  const detailWrapper = createElementHelper("div", "detailWrapper");
  const detail = createElementHelper("div", "detail");
  const todoBody = createElementHelper("div", "detail__body", todo.body);
  todoBody.contentEditable = "true";
  const urgency = createElementHelper("div", "detail__optionContainer");
  urgency.dataset.detailtype = "urgency";
  const urgencyOptions = urgencyLevels.map((item) => {
    const level = createElementHelper("img", "detail__options");
    level.src = item.src;
    level.dataset.value = item.value;
    if (item.value === todo.urgency)
      level.classList.add("detail--selectedOption");

    return level;
  });
  urgency.append(...urgencyOptions);

  const category = createElementHelper("div", "detail__optionContainer");
  category.dataset.detailtype = "category";
  const categoryOptions = categories.map((item) => {
    const category = createElementHelper("img", "detail__options");
    category.src = item.src;
    category.dataset.value = item.value;
    if (item.value === todo.category)
      category.classList.add("detail--selectedOption");

    return category;
  });
  category.append(...categoryOptions);

  urgency.addEventListener("click", handleOptionToggle);
  category.addEventListener("click", handleOptionToggle);

  const controls = createElementHelper("div", "detail__controls");
  let cancelbtn = createElementHelper(
    "button",
    "detail__btn detailSaveBtn",
    "Cancel"
  );
  let saveBtn = createElementHelper(
    "button",
    "detail__btn detailCancelBtn",
    "Save"
  );
  cancelbtn.addEventListener("click", () => {
    document.body.removeChild(detailWrapper);
  });
  saveBtn.addEventListener("click", () => {
    changeHelper(todo.id);
    document.body.removeChild(detailWrapper);
  });
  controls.append(cancelbtn, saveBtn);
  detail.append(todoBody, urgency, category, controls);
  detailWrapper.append(detail);
  document.body.append(detailWrapper);
}

function changeHelper(id) {
  const message = document.querySelector(".detail__body");
  const [urgency, category] = document.querySelectorAll(
    ".detail--selectedOption"
  );
  confirmChangeHandler(id, message.innerHTML, urgency.dataset.value, category.dataset.value);
}

function bindDetailChange(callback) {
  confirmChangeHandler = callback;
}

export default {
  showTodoDetail,
  bindDetailChange,
};
