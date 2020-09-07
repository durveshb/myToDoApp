import makeTodo from "./componants/todo.js";
import filterTodos from "./filterModule.js";

export function displayData(todos, selectedFilter) {
  const todoDisplay = document.querySelector(".todoDisplay");
  const todoNodes = filterTodos(todos, selectedFilter).map(makeTodo);

  while (todoDisplay.firstChild)
    todoDisplay.removeChild(todoDisplay.firstChild);
  todoDisplay.append(...todoNodes);

  updateAnalytics(todos, selectedFilter);
}

export function updateAnalytics(todos, selectedFilter) {
  const percentage = document.querySelector(".analytics__percentage");
  const ratio = document.querySelector(".analytics__ratio");

  const filteredTodos = filterTodos(todos, selectedFilter);
  const completed = filteredTodos.filter((todo) => todo.completed).length;
  const total = filteredTodos.length;

  if (total === 0) {
    percentage.innerHTML = "0%";
    ratio.innerHTML = "0 / 0";
    return;
  }
  const per = Math.floor((completed * 100) / total);
  const progressL = document.querySelector(".graphic__leftProgress");
  const progressR = document.querySelector(".graphic__rightProgress");
  progressL.style.transform =
    "rotate(" + (Math.floor(per / 50) ? 180 : (per * 180) / 50) + "deg)";
  progressR.style.transform =
    "rotate(" + (per > 50 ? ((per - 50) * 180) / 50 : 0) + "deg)";
  percentage.innerHTML = per + "%";
  ratio.innerHTML = completed + " / " + total;
}
