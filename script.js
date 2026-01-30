// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAyMVYqX0-efA9uvjNZNS6GdSp6HgzvKi0",
  authDomain: "Yimposter-multiplayer-58828.firebaseapp.com",
  databaseURL: "https://imposter-multiplayer-58828-default-rtdb.firebaseio.com",
  projectId: "imposter-multiplayer-58828"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let playerId = Math.random().toString(36).substring(2);
let playerName = "";
let roomCode = "";

// ================== CATEGORIES ==================
const categories = [
  "Animals",
  "Places",
  "Food",
  "Objects",
  "Sports",
  "Brands",
  "Pokémon",
  "Brain Rot",
  "Snacks"
];

// ================== CREATE / JOIN ==================

function createRoom() {
  playerName = document.getElementById("name").value;
  roomCode = Math.random().toString(36).substring(2,6).toUpperCase();

  // Save host
  db.ref("rooms/" + roomCode + "/host").set(playerId);

  // Save player
  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);

  window.location = "game.html?room=" + roomCode;
}

function joinRoom() {
  playerName = document.getElementById("name").value;
  roomCode = document.getElementById("roomCode").value.toUpperCase();

  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);

  window.location = "game.html?room=" + roomCode;
}

// ================== GAME PAGE ==================

const params = new URLSearchParams(window.location.search);
roomCode = params.get("room");

if (roomCode) {
  document.getElementById("roomTitle").innerText = "Room: " + roomCode;

  const categorySelect = document.getElementById("categorySelect");

  // Fill dropdown
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  // Check if this player is host
  db.ref("rooms/" + roomCode + "/host").on("value", snap => {
    if (snap.exists() && snap.val() === playerId) {
      document.getElementById("hostBox").style.display = "block";
    } else {
      document.getElementById("hostBox").style.display = "none";
    }
  });

  // Listen for category changes
  db.ref("rooms/" + roomCode + "/category").on("value", snap => {
    if (snap.exists()) {
      document.getElementById("chosenCategory").innerText =
        "Chosen Category: " + snap.val();
    }
  });
}

// ================== HOST ACTION ==================

function setCategory() {
  const selected = document.getElementById("categorySelect").value;
  db.ref("rooms/" + roomCode + "/category").set(selected);
}