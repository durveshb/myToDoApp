import {createElementHelper} from "./../DOMhelpers.js";

let confirmDeleteHandler = null;

function showDeleteWarning(todo) {
  const warningWrapper = createElementHelper("div", "warningWrapper");
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
    document.body.removeChild(warningWrapper);
    cancelbtn = null;
    deletebtn = null;
  });
  deletebtn.addEventListener("click", () => {
    document.body.removeChild(warningWrapper);
    cancelbtn = null;
    deletebtn = null;
    confirmDeleteHandler(todo.id);
  });

  warning.append(warningNote, cancelbtn, deletebtn);
  warningWrapper.append(warning);
  document.body.append(warningWrapper);
}

function bindConfirmDelete(callback){
    confirmDeleteHandler = callback;
}

export default {
    showDeleteWarning,
    bindConfirmDelete,
}
