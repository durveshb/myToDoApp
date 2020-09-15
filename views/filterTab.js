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
  updateFilterTab,
  bindFilterTodo,
};
