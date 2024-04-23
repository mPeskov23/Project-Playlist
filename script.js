let loggedIn = false;
let userData = undefined;

while(true){
    const loginForm = document.querySelector("#form-login-div");
    const app = document.querySelector("#app");
    if(loggedIn){
        app.classList.remove("d-none")
        app.classList.add("container");
        loginForm.classList.remove("container");
        loginForm.classList.add("d-none");
        application();
    } else{
        loginForm.classList.remove("d-none")
        loginForm.classList.add("container");
        app.classList.remove("container");
        app.classList.add("d-none");
        loginForm()
    }
}