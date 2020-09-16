import todoDisplayTab from "./views/todoDisplayTab.js";
import filterTab from "./views/filterTab.js";
import analyticsTab from "./views/analyticsTab.js";
import addFormTab from "./views/addFormTab.js";
import confirmDeleteTab from "./views/confirmDeleteTab.js";
import headerTab from "./views/headerTab.js";

function initStaticDOM() {
  headerTab.initHeaderTab();
  filterTab.initFilterTab();
  analyticsTab.initAnalyticsTab();
  addFormTab.initFormTab();
}

function bindUndo(callback) {
  window.addEventListener("keydown", (e) => {
    if (!e.shiftKey && e.metaKey && e.keyCode === 90) callback();
  });
}
function bindRedo(callback) {
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.metaKey && e.keyCode === 90) callback();
  });
}

export default {
  initStaticDOM,
  bindUndo,
  bindRedo,
  showDeleteWarning: confirmDeleteTab.showDeleteWarning,
  bindConfirmDelete: confirmDeleteTab.bindConfirmDelete,
  updateFilterTab: filterTab.updateFilterTab,
  bindFilterTodo: filterTab.bindFilterTodo,
  updateAnalytics: analyticsTab.updateAnalytics,
  displayTodos: todoDisplayTab.displayTodos,
  bindDeleteTodo: todoDisplayTab.bindDeleteTodo,
  bindCompleteTodo: todoDisplayTab.bindCompleteTodo,
  bindAddTodo: addFormTab.bindAddTodo,
};
