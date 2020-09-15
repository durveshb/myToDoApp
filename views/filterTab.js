import { createElementHelper } from "./../DOMhelpers.js";

function initFilterTab() {
  const filters = [
    { id: "fil-ug-dec", src: "./images/urgency/3.svg" },
    { id: "fil-ug-inc", src: "./images/urgency/1.svg" },
    { id: "fil-cg-per", src: "./images/category/1.svg" },
    { id: "fil-cg-aca", src: "./images/category/2.svg" },
    { id: "fil-cg-soc", src: "./images/category/3.svg" },
  ];

  const filterTab = createElementHelper("div", "filtericons");
  const filtericons = filters.map((fil) => {
    const icon = createElementHelper("img", "filtericons__icon");
    icon.id = fil.id;
    icon.src = fil.src;
    return icon;
  });
  const label = createElementHelper(
    "h3",
    "filter__label",
    null,
    "Filter Todos"
  );
  filterTab.append(...filtericons);
  document.querySelector(".filter").append(filterTab, label);
}

function updateFilterTab(filter) {
  const filterIcons = Array.from(
    document.querySelector(".filtericons").children
  );
  filterIcons.forEach((icon) => {
    icon.classList.remove("filtericons__icon--selected");
    if (icon.id === filter) {
      icon.classList.add("filtericons__icon--selected");
    }
  });
}

function filterTodoHelper(e, callback) {
  if (e.target.nodeName === "IMG") {
    callback(e.target.id);
  }
}

function bindFilterTodo(callback) {
  document
    .querySelector(".filtericons")
    .addEventListener("click", (e) => filterTodoHelper(e, callback));
}

export default {
  initFilterTab,
  updateFilterTab,
  bindFilterTodo,
};
