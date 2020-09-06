async function runAuthentication(name,pass){
    let data = await fetch("./data/users.json");
    data = await data.json();

    if(data[name] === pass) return new Promise(res => setTimeout(()=> res(),2000));

    return  new Promise((res,rej) => setTimeout(()=> rej(),2000));
}

function displayNote(){
    const note = document.querySelector(".loginForm__note");
    note.style.display = "block";
    setTimeout(() => {
        note.style.display = "none";
    },2000);
}

function tryLogin(event){
    event.target.innerHTML = "Verifying Credential...";
    const nameInput = document.querySelector(".loginForm__name");
    const passInput = document.querySelector(".loginForm__password");

    const username = nameInput.value;
    const password = passInput.value;

    if(username === "" || password === "") {
        event.target.innerHTML = "Login";
        return displayNote();
    }

    runAuthentication(username,password)
    .then(()=>{
        window.location = `todoList.html?name=${username}`;
    }).catch((err) => {
        displayNote();
        nameInput.value = "";
        passInput.value = "";
        event.target.innerHTML = "Login";
    })
}


document.querySelector(".loginForm__submit").addEventListener("click",tryLogin);