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
  const listSongs = document.querySelector("#list-songs");
  const submitSongForm = document.querySelector("#form-submit");
  submitSongForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const song = getSongData();
    submitSong(event, userData, song);
  });

  app.classList.remove("d-none");
  app.classList.add("container");

  loginForm.classList.remove("container");
  loginForm.classList.add("d-none");

  let songs = userData.songs;
  if(songs.length === 0){
    let noSongNotification = document.createElement('p');
    noSongNotification.textContent = "There are no songs here yet, try adding some!";
    listSongs.appendChild(noSongNotification);
  } else{
    for(let song of songs){
        let songCard = document.createElement('div');
        songCard.innerHTML = getSongCard(song);
        songCard.classList.add("bg-orange");
        listSongs.appendChild(songCard);
    }
  }

}

function showLoginForm() {
  const app = document.querySelector("#app");
  let loginForm = document.querySelector("#form-login-div");

  app.classList.remove("container");
  app.classList.add("d-none");

  loginForm.classList.remove("d-none");
  loginForm.classList.add("container");

  loginForm = document.querySelector("#form-login");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    login(event);
  });
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
        inputPassword.value = "";
        alert("Incorrect password");
      }
    } else {
      inputLogin.value = "";
      inputPassword.value = "";
      alert("Incorrect username");
    }
  }
}

async function getFullData() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}

function getSongCard(song){
  return `
      <div class="card mb-3">
          <div class="card-body">
              <h5 class="card-title">${song.title}</h5>
              <p class="card-text">
                  <strong>Artist:</strong> ${song.artist}<br>
                  <strong>Genre:</strong> ${song.genre}
                  <button type="button" class="btn btn-primary btn-sm" onclick="editSong()">Edit</button>
                  <button type="button" class="btn btn-danger btn-sm" onclick="deleteSong()">Delete</button>
              </p>
          </div>
      </div>
  `;
}

function getSongData(){
    const titleElement = document.querySelector("#input-title");
    const artistElement = document.querySelector("#input-artist");
    const genreElement = document.querySelector("#input-genre");
    const title = titleElement.value;
    const artist = artistElement.value;
    const genre = genreElement.value;
    let song = new Song(title, artist, genre);
    titleElement.value = "";
    artistElement.value = "";
    genreElement.value = "";
    return song;
}

async function submitSong(event, userData, song){
    event.preventDefault();
    userData.songs.push(song);
    const updateResponse = await fetch(`http://localhost:3000/users/${userData.id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    const listSongs = document.querySelector("#list-songs");
    const songCard = document.createElement('div');
    songCard.innerHTML = getSongCard(song);
    songCard.classList.add("bg-orange");
    listSongs.appendChild(songCard);
}