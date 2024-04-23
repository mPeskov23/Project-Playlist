let fullData = undefined;
class Song{
    #title = undefined;
    #artist = undefined;
    #genre = undefined;
    constructor(title, artist, genre){
        this.title = title;
        this.artist = artist;
        this.genre = genre;
    }
    getTitle(){
        return this.title;
    }
    getArtist(){
        return this.artist;
    }
    getGenre(){
        return this.genre;
    }
}

async function initialize() {
  fullData = await getFullData();
  showLoginForm();
}

initialize();

function showApplication(userData) {
  const app = document.querySelector("#app");
  const loginForm = document.querySelector("#form-login-div");

  app.classList.remove("d-none");
  app.classList.add("container");

  loginForm.classList.remove("container");
  loginForm.classList.add("d-none");

}

function showLoginForm() {
  const app = document.querySelector("#app");
  let loginForm = document.querySelector("#form-login-div");

  app.classList.remove("container");
  app.classList.add("d-none");

  loginForm.classList.remove("d-none");
  loginForm.classList.add("container");

  loginForm = document.querySelector("#form-login");
  loginForm.addEventListener("submit", (event) => login(event));
}

function login(event) {
  event.preventDefault();
  const inputLogin = document.querySelector("#input-login");
  const inputPassword = document.querySelector("#input-password");
  const login = inputLogin.value;
  const password = inputPassword.value;
  let userData = undefined;

  for (let i = 0; i < fullData.length; i++) {
    if (fullData[i].username === login) {
      if (fullData[i].password === password) {
        userData = fullData[i];
        showApplication(userData);
        break;
      } else {
        inputPassword.value = ""; // Use value instead of textContent
        alert("Incorrect password");
      }
    } else {
      inputLogin.value = ""; // Use value instead of textContent
      inputPassword.value = ""; // Use value instead of textContent
      alert("Incorrect username");
    }
  }
}

async function getFullData() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}