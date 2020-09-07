export default function getDeleteTodoBtn(){
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("todo__deleteBtn");
    deleteButton.innerHTML = "X";

    return deleteButton;
}