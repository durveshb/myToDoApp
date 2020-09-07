export default function getMarkCompleteBtn(iscomplete){
    const markComplete = document.createElement("div");
    markComplete.classList.add("todo__markComplete");
    markComplete.innerHTML = "Mark Complete";
  
    if (iscomplete) {
      markComplete.innerHTML = "Completed. Undo?";
    }

    return markComplete;
}