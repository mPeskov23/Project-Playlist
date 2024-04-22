document.addEventListener("DOMContentLoaded", function() {
    let loggedIn = false;
    const regForm = document.querySelector("#form-register-div");
    const app = document.querySelector("#app");

    if(!loggedIn){
        regForm.classList.remove("d-none");
        regForm.classList.add("container");
        app.classList.add("d-none");
    } else{
        regForm.classList.add("d-none");
        app.classList.remove("d-none");
        app.classList.add("container");
    }
});