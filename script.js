let fullData = undefined;
class Song {
  id = undefined;
  #title = undefined;
  #artist = undefined;
  #genre = undefined;
  constructor(title, artist, genre) {
    this.title = title;
    this.artist = artist;
    this.genre = genre;
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
  const regForm = document.querySelector("#form-reg-div");
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

  regForm.classList.remove("container");
  regForm.classList.add("d-none");

  let songs = userData.songs;
  if (songs.length === 0) {
    let noSongNotification = document.createElement("p");
    noSongNotification.textContent =
      "There are no songs here yet, try adding some!";
    listSongs.appendChild(noSongNotification);
  } else {
    for (let song of songs) {
      let songCard = document.createElement("div");
      songCard.innerHTML = getSongCard(song, userData);
      songCard.classList.add("bg-orange");
      listSongs.appendChild(songCard);
    }
  }
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.removeEventListener("click", (event) => {
      const songId = button.dataset.songId;
      deleteSong(songId, userData);
    });
    button.addEventListener("click", (event) => {
      const songId = button.dataset.songId;
      deleteSong(songId, userData);
    });
  });
}

function showLoginForm() {
  const app = document.querySelector("#app");
  let loginForm = document.querySelector("#form-login-div");
  const regForm = document.querySelector("#form-reg-div");

  app.classList.remove("container");
  app.classList.add("d-none");

  loginForm.classList.remove("d-none");
  loginForm.classList.add("container");

  regForm.classList.remove("container");
  regForm.classList.add("d-none");

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
        return;
      } else {
        inputPassword.value = "";
        alert("Incorrect password");
        return;
      }
    }
  }

  inputLogin.value = "";
  inputPassword.value = "";
  alert("Incorrect username");
}

async function getFullData() {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
}

function getSongCard(song, userData) {
  return `
      <div class="card mb-3" id="song-${song.id}">
          <div class="card-body">
              <h5 class="card-title">${song.title}</h5>
              <p class="card-text">
                  <strong>Artist:</strong> ${song.artist}<br>
                  <strong>Genre:</strong> ${song.genre}
              </p>
              <div id="edit-form-${song.id}" class="d-none">
                  <div class="form-group">
                      <input type="text" class="form-control" id="edit-title-${
                        song.id
                      }" value="${song.title}" placeholder="Title">
                  </div>
                  <div class="form-group">
                      <input type="text" class="form-control" id="edit-artist-${
                        song.id
                      }" value="${song.artist}" placeholder="Artist">
                  </div>
                  <div class="form-group">
                      <select class="form-control" id="edit-genre-${song.id}">
                          <option value="Rock" ${
                            song.genre === "Rock" ? "selected" : ""
                          }>Rock</option>
                          <option value="Pop" ${
                            song.genre === "Pop" ? "selected" : ""
                          }>Pop</option>
                          <option value="Hip-hop" ${
                            song.genre === "Hip-hop" ? "selected" : ""
                          }>Hip-hop</option>
                          <option value="Jazz" ${
                            song.genre === "Jazz" ? "selected" : ""
                          }>Jazz</option>
                          <option value="Electronic" ${
                            song.genre === "Electronic" ? "selected" : ""
                          }>Electronic</option>
                      </select>
                  </div>
                  <button type="button" class="btn btn-success btn-sm" onclick="saveSong('${
                    song.id
                  }', userData)">Save</button>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="cancelEdit('${
                    song.id
                  }')">Cancel</button>
              </div>
              <button type="button" class="btn btn-primary btn-sm" data-song-id="${
                song.id
              }">Edit</button>

              <button type="button" class="btn btn-danger btn-sm delete-btn" data-song-id="${
                song.id
              }">Delete</button>

          </div>
      </div>
  `;
}

function getSongData() {
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

async function submitSong(event, userData, song) {
  event.preventDefault();
  console.log(userData.songs.length);
  if (userData.songs.length > 0) {
    console.log(userData.songs.length > 0);
    const lastID = userData.songs[userData.songs.length - 1].id;
    song.id = String(Number(lastID) + 1);
  } else {
    console.log(userData.songs.length > 0);
    song.id = "1";
  }
  userData.songs.push(song);
  await fetch(`http://localhost:3000/users/${userData.id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });
  const listSongs = document.querySelector("#list-songs");
  const songCard = document.createElement("div");
  songCard.innerHTML = getSongCard(song);
  listSongs.appendChild(songCard);
  console.log(song.id)
  let button = document.querySelector(`song-${song.id}`);
  button.addEventListener("click", (event) => {
    const songId = button.dataset.songId;
    deleteSong(songId, userData);
  });
}

function showRegisterForm() {
  const app = document.querySelector("#app");
  const loginForm = document.querySelector("#form-login-div");
  const regFormDiv = document.querySelector("#form-reg-div");

  app.classList.remove("container");
  app.classList.add("d-none");

  loginForm.classList.remove("container");
  loginForm.classList.add("d-none");

  regFormDiv.classList.remove("d-none");
  regFormDiv.classList.add("container");

  const regForm = document.querySelector("#form-reg");
  regForm.addEventListener("submit", (event) => {
    event.preventDefault();
    checkRegData();
  });
}

function checkRegData() {
  const loginElement = document.querySelector("#input-login-reg");
  const passwordElement = document.querySelector("#input-password-reg");
  const confirmationElement = document.querySelector(
    "#input-password-confirmation"
  );
  const login = loginElement.value;
  const password = passwordElement.value;
  const confirmation = confirmationElement.value;
  if (checkLoginAvailability(login)) {
    if (password === confirmation) {
      registerUser(login, password);
    } else {
      alert("Passwords don't match");
    }
  } else {
    alert("The username is already taken");
    loginElement.value = "";
  }
}

async function registerUser(login, password) {
  const lastId = fullData[fullData.length - 1].id;
  const newId = String(Number(lastId) + 1);
  const user = { id: newId, username: login, password: password, songs: [] };
  await addToDatabase(user);
  initialize();
}

async function addToDatabase(user) {
  await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

function checkLoginAvailability(login) {
  for (let user of fullData) {
    if (user.username === login) {
      return false;
    }
  }
  return true;
}

async function deleteSong(songId, userData) {
  console.log(userData);

  userData.songs = userData.songs.filter((song) => song.id !== songId);

  await fetch(`http://localhost:3000/users/${userData.id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });

  const songCard = document.querySelector(`#song-${songId}`);
  songCard.remove();

  if (userData.songs.length === 0) {
    let noSongNotification = document.createElement("p");
    noSongNotification.textContent =
      "There are no songs here yet, try adding some!";
    const listSongs = document.querySelector("#list-songs");
    listSongs.appendChild(noSongNotification);
  }
}

function toggleEditForm(songId) {
  const editForm = document.querySelector(`#edit-form-${songId}`);
  editForm.classList.toggle("d-none");
}

function saveSong(songId, userData) {
  console.log("Parsed userData:", userData);

  const title = document.querySelector(`#edit-title-${songId}`).value;
  const artist = document.querySelector(`#edit-artist-${songId}`).value;
  const genre = document.querySelector(`#edit-genre-${songId}`).value;

  const songIndex = userData.songs.findIndex((song) => song.id === songId);

  if (songIndex !== -1) {
    userData.songs[songIndex].title = title;
    userData.songs[songIndex].artist = artist;
    userData.songs[songIndex].genre = genre;

    const card = document.querySelector(`#song-${songId}`);
    card.querySelector(".card-title").textContent = title;
    card.querySelector(".card-text").innerHTML = `
        <strong>Artist:</strong> ${artist}<br>
        <strong>Genre:</strong> ${genre}
      `;
    toggleEditForm(songId);

    console.log("Updated userData:", userData);
    updateUserData(userData);
  }
}

function cancelEdit(songId) {
  toggleEditForm(songId);
}

async function updateUserData(userData) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userData.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    console.log("Updated in database");
  } catch (error) {
    console.error("Error in updateUserData:", error);
  }
}
