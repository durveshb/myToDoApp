import { createElementHelper } from "./../DOMhelpers.js";
import { urgencyLevels, categories } from "./../appConstants.js";

let confirmChangeHandler = null;

function handleOptionToggle(e) {
  if (e.target.nodeName === "IMG") {
    const optionContainer = e.target.closest("[data-detailtype]");
    const options = Array.from(optionContainer.children);
    options.forEach((option) => {
      option.classList.remove("detail--selectedOption");
      option.dataset.isSelectedOption = false;
    });
    e.target.classList.add("detail--selectedOption");
    e.target.dataset.isSelectedOption = true;
  }
}

function createOptionList(name, optionList, activeOptionValue) {
  const container = createElementHelper("div", "detail__optionContainer");
  container.dataset.detailtype = name;
  const options = optionList.map((option) => {
    const node = createElementHelper("img", "detail__options");
    node.src = option.src;
    node.dataset.value = option.value;
    node.dataset.isSelectedOption = false;
    if (option.value === activeOptionValue){
      node.classList.add("detail--selectedOption");
      node.dataset.isSelectedOption = true;  
    }
    return node;
  });
  container.append(...options);
  return container;
}

function showTodoDetail(todo) {
  const detailWrapper = createElementHelper("div", "detailWrapper");
  const detail = createElementHelper("div", "detail");
  const todoBody = createElementHelper("div", "detail__body", todo.body);
  todoBody.contentEditable = "true";
  todoBody.dataset.detailtype = "todoBody";
  const urgency = createOptionList("urgency", urgencyLevels, todo.urgency);
  const category = createOptionList("category", categories, todo.category);

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
    changeDetailsHelper(todo.id);
    document.body.removeChild(detailWrapper);
  });
  controls.append(cancelbtn, saveBtn);
  detail.append(todoBody, urgency, category, controls);
  detailWrapper.append(detail);
  document.body.append(detailWrapper);
}

function changeDetailsHelper(id) {
  const message = document.querySelector('[data-detailtype="todoBody"]');
  const [urgency, category] = document.querySelectorAll(
    '[data-is-selected-option="true"]'
  );
  confirmChangeHandler(
    id,
    message.innerHTML,
    urgency.dataset.value,
    category.dataset.value
  );
}

function bindDetailChange(callback) {
  confirmChangeHandler = callback;
}

export default {
  showTodoDetail,
  bindDetailChange,
};
