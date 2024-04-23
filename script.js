let loggedIn = false;
let usersData = undefined;

checkLoginState();

async function checkLoginState() {
    usersData = await getUsersData();
    if (loggedIn) {
        showApplication();
    } else {
        showLoginForm();
    }
}

function showApplication() {
    const app = document.querySelector("#app");
    const loginForm = document.querySelector("#form-login-div");
    
    app.classList.remove("d-none");
    app.classList.add("container");
    
    loginForm.classList.remove("container");
    loginForm.classList.add("d-none");
    
}

function showLoginForm() {
    const app = document.querySelector("#app");
    const loginForm = document.querySelector("#form-login-div");
    
    app.classList.remove("container");
    app.classList.add("d-none");
    
    loginForm.classList.remove("d-none");
    loginForm.classList.add("container");

    console.log(usersData);
    
    login();
}

function login() {
    let login = document.querySelector("#input-login");
    let password = document.querySelector("#input-password");
    
}

async function getUsersData() {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    return data;
}