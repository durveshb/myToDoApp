async function loadData(){
    let data = await fetch("./data/todos.json");
    data = await data.json()  
    data = Object.values(data);
    return data;
}

function displayData(todos){
    let todoDisplay = document.querySelector(".todoDisplay");
    todos.forEach(todo => {
        todoDisplay.append(todo);
    });
    updateAnalytics(todos);
}

function makeTodo(data){
    let todo = document.createElement("div");
    todo.id = data.id;
    todo.classList.add("todo");

    let todoBody = document.createElement("div");
    todoBody.classList.add("todoBody");
    
    let features = document.createElement("div");
    features.classList.add("features");
    let urgency = document.createElement("img");
    urgency.src = "./images/urgency/" + data.urgency + ".svg";
    let category = document.createElement("img");
    category.src = "./images/category/" + data.category + ".svg";
    features.append(urgency,category);

    let markComplete = document.createElement("div");
    markComplete.classList.add("markComplete");
    markComplete.onclick = markTodoComplete;
    
    todoBody.innerHTML = data["body"];
    markComplete.innerHTML = "Mark Complete"


    if(data.completed){
        todo.classList.add("completed");
        markComplete.innerHTML = "Completed. Undo?"
    } 

    todo.append(todoBody,features,markComplete);
    
    return todo;
}

function updateAnalytics(todos){
    let percentage = document.getElementById("percentageComplete");
    let ratio = document.getElementById("completeRatio");

    let completed = todos.filter(todo => todo.classList.contains("completed")).length;
    let total = todos.length;

    let per = Math.floor(completed*100/total)

    let progressL = document.querySelector('.leftProgress');
    let progressR = document.querySelector('.rightProgress');

    let left = (Math.floor(per/50))?180:per*180/50;
    let right = (per > 50)?(per-50)*180/50:0 ;

    progressL.style.transform = "rotate(" + left +"deg)";
    progressR.style.transform = "rotate(" + right +"deg)";

    percentage.innerHTML = per + "%";
    ratio.innerHTML = completed + " / " + total;
}

function addTodo(event){
    event.preventDefault();
    let todoBody = document.querySelector("input");
    let urgency = document.getElementById("urgency");
    let category = document.getElementById("category");

    if(todoBody.value !== ""){
        let newTodo = {
            "id" : ++counter,
            "body" : todoBody.value,
            "urgency" : urgency.value,
            "category" : category.value,
        };

        todoData.push(newTodo);
        nodeList.push(makeTodo(newTodo))
        console.log(nodeList,todoData);
        displayData(nodeList);

        todoBody.value = "";
        urgency.value = 1;
        category.value = 1;
    }
}

function getIndex(id,arr){
    return arr.findIndex(elem => elem.id == id) 
}

function markTodoComplete(event){
    let todo = event.target.closest(".todo");
    if(todo){
        todo.classList.toggle("completed");
        event.target.innerHTML = (event.target.innerHTML === "Completed. Undo?")?"Mark Complete":"Completed. Undo?";
        let index = getIndex(todo.id,todoData)
        todoData[index].completed = !todoData[index].completed;

        updateAnalytics(nodeList);
    }
}

let nodeList;
let todoData;
let counter;

loadData().then(data => {
    todoData = data;
    nodeList = data.map(makeTodo);
    counter = nodeList.length;
    // console.log(todoData);
    displayData(nodeList);
});


document.querySelector("form").addEventListener("submit", addTodo);
