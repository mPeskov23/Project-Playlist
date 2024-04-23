let fullData = await getFullData();

showLoginForm();

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
    
    login();
}

function login() {
    let login = document.querySelector("#input-login").textContent;
    let password = document.querySelector("#input-password").textContent;
    let userData = undefined;
    for
}

async function getFullData() {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();
    return data;
}