import {createElementHelper} from "./../DOMhelpers.js";

let confirmDeleteHandler = null;

function showDeleteWarning(todo) {
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
    confirmDeleteHandler(todo.id);
  });

  warning.append(warningNote, cancelbtn, deletebtn);
  document.body.append(warning);
}

function bindConfirmDelete(callback){
    confirmDeleteHandler = callback;
}

export default {
    showDeleteWarning,
    bindConfirmDelete,
}
