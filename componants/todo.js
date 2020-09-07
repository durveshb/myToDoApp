import getMarkCompleteBtn from "./markCompleteBtn.js";
import getTodoFeatures from "./todoFeatures.js";
import getDeleteTodoBtn from "./deleteTodoBtn.js";

export default function makeTodo(data){
    const todo = document.createElement("div");
    todo.id = data.id;
    todo.classList.add("todo");
  
    const todoBody = document.createElement("div");
    todoBody.classList.add("todo__body");
    todoBody.innerHTML = data["body"];
  
    const timestamp = document.createElement("div");
    timestamp.classList.add("todo__timestamp");
    timestamp.innerHTML = data.timestamp;
  
    const features = getTodoFeatures(data.urgency,data.category);
  
    const markComplete = getMarkCompleteBtn(data.completed);
    if(data.completed) todo.classList.add("todo--completed");
  
    const deleteButton = getDeleteTodoBtn();
  
    todo.append(todoBody, timestamp, features, markComplete, deleteButton);
    return todo;
}