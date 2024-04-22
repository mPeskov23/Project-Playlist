document.addEventListener("DOMContentLoaded", function() {
    let loggedIn = false;
    const loginForm = document.querySelector("#form-login-div");
    const app = document.querySelector("#app");

    if(!loggedIn){
        loginForm.classList.remove("d-none");
        loginForm.classList.add("container");
        app.classList.add("d-none");
    } else{
        loginForm.classList.add("d-none");
        app.classList.remove("d-none");
        app.classList.add("container");
    }
});