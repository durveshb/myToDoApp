import { createElementHelper } from "./../DOMhelpers.js";
import {filters} from "./../appConstants.js";

function initFilterTab() {
  const filtericonsTab = createElementHelper("div", "filtericons");
  filtericonsTab.dataset.containertype = "filtericonsTab";
  const filtericons = filters.map((fil) => {
    const icon = createElementHelper("img", "filtericons__icon");
    icon.dataset.filId = fil.filId;
    icon.src = fil.src;
    return icon;
  });
  const label = createElementHelper(
    "h3",
    "filter__label",
    "Filter Todos"
  );
  filtericonsTab.append(...filtericons);
  document.querySelector('[data-containertype="filterTab"]').append(filtericonsTab, label);
}

function updateFilterTab(filter) {
  const filterIcons = Array.from(
    document.querySelector('[data-containertype="filtericonsTab"]').children
  );
  filterIcons.forEach((icon) => {
    icon.classList.remove("filtericons__icon--selected");
    if (icon.dataset.filId === filter) {
      icon.classList.add("filtericons__icon--selected");
    }
  });
}

function filterTodoHelper(e, callback) {
  if (e.target.nodeName === "IMG") {
    callback(e.target.dataset.filId);
  }
}

function bindFilterTodo(callback) {
  document
    .querySelector('[data-containertype="filterTab"]')
    .addEventListener("click", (e) => filterTodoHelper(e, callback));
}

export default {
  initFilterTab,
  updateFilterTab,
  bindFilterTodo,
};
