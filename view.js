import { days, months } from "./dates.js";
import todoDisplayTab from "./views/todoDisplayTab.js";
import filterTab from "./views/filterTab.js";
import analyticsTab from "./views/analyticsTab.js";
import addFormTab from "./views/addFormTab.js";
import {createElementHelper} from "./../DOMhelpers.js";

function loadHeader() {
  const currDate = new Date();
  document.querySelector(".header__calender").innerHTML = `${
    days[currDate.getDay()]
  }, ${months[currDate.getMonth()]} ${currDate.getDate()}`;
}

function showDeleteWarning(todo, deleteHandler) {
  const warning = createElementHelper("div", "deleteWarning");
  const warningNote = createElementHelper(
    "div",
    "deleteNote",
    "You haven't finished this todo yet!"
  );
  let cancelbtn = createElementHelper(
    "button",
    "cancelWarning warningBtn",
    "Cancel"
  );
  let deletebtn = createElementHelper(
    "button",
    "deleteAnyway warningBtn",
    "Delete Anyway"
  );
  cancelbtn.addEventListener("click", () => {
    document.body.removeChild(warning);
    cancelbtn = null;
    deletebtn = null;
  });
  deletebtn.addEventListener("click", () => {
    document.body.removeChild(warning);
    cancelbtn = null;
    deletebtn = null;
    deleteHandler(todo.id);
  });

  warning.append(warningNote, cancelbtn, deletebtn);
  document.body.append(warning);
}

export default {
  loadHeader,
  showDeleteWarning,
  updateFilterTab : filterTab.updateFilterTab,
  bindFilterTodo : filterTab.bindFilterTodo,
  updateAnalytics : analyticsTab.updateAnalytics,
  displayTodos : todoDisplayTab.displayTodos,
  bindDeleteTodo : todoDisplayTab.bindDeleteTodo,
  bindCompleteTodo : todoDisplayTab.bindCompleteTodo,
  bindAddTodo : addFormTab.bindAddTodo,
};
