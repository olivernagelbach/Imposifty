// 🔥 Firebase config (paste yours here)
const firebaseConfig = {
  apiKey: "AIzaSyAyMVYqX0-efA9uvjNZNS6GdSp6HgzvKi0",
  authDomain: "Yimposter-multiplayer-58828.firebaseapp.com",
  databaseURL: "https://imposter-multiplayer-58828-default-rtdb.firebaseio.com",
  projectId: "imposter-multiplayer-58828"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let playerName = "";
let roomCode = "";
let playerId = Math.random().toString(36).substring(2);
let selectedVote = "";

// Create room
function createRoom() {
  playerName = document.getElementById("name").value;
  roomCode = Math.random().toString(36).substring(2,6).toUpperCase();

  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);
  window.location = "game.html?room=" + roomCode + "&name=" + playerName;
}

// Join room
function joinRoom() {
  playerName = document.getElementById("name").value;
  roomCode = document.getElementById("roomCode").value.toUpperCase();

  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);
  window.location = "game.html?room=" + roomCode + "&name=" + playerName;
}

// Get URL params
const params = new URLSearchParams(window.location.search);
roomCode = params.get("room");
playerName = params.get("name");

if(roomCode){
  document.getElementById("roomTitle").innerText = "Room: " + roomCode;

  db.ref("rooms/" + roomCode + "/players").on("value", snapshot => {
    let playersDiv = document.getElementById("players");
    playersDiv.innerHTML = "";
    snapshot.forEach(child => {
      let name = child.val();
      let btn = document.createElement("button");
      btn.innerText = name;
      btn.onclick = () => selectedVote = child.key;
      playersDiv.appendChild(btn);
    });
  });

  db.ref("rooms/" + roomCode + "/roles/" + playerId).on("value", snap => {
    if(snap.exists()){
      document.getElementById("role").innerText = snap.val();
    }
  });

  db.ref("rooms/" + roomCode + "/result").on("value", snap => {
    if(snap.exists()){
      document.getElementById("result").innerText = snap.val();
    }
  });
}

// Start game
function startGame(){
  const category = document.getElementById("category").value;
  const word = document.getElementById("word").value;

  db.ref("rooms/" + roomCode + "/category").set(category);
  db.ref("rooms/" + roomCode + "/word").set(word);

  db.ref("rooms/" + roomCode + "/players").once("value").then(snapshot=>{
    let keys = [];
    snapshot.forEach(child=>keys.push(child.key));
    let imposter = keys[Math.floor(Math.random()*keys.length)];

    keys.forEach(id=>{
      if(id === imposter){
        db.ref("rooms/" + roomCode + "/roles/" + id).set("You are the IMPOSTER");
      } else {
        db.ref("rooms/" + roomCode + "/roles/" + id).set("Word: " + word);
      }
    });
  });
}

// Vote
function submitVote(){
  db.ref("rooms/" + roomCode + "/votes/" + playerId).set(selectedVote);

  db.ref("rooms/" + roomCode + "/votes").once("value").then(snapshot=>{
    let counts = {};
    snapshot.forEach(child=>{
      let vote = child.val();
      counts[vote] = (counts[vote] || 0) + 1;
    });

    let winner = Object.keys(counts).reduce((a,b)=>counts[a]>counts[b]?a:b);
    db.ref("rooms/" + roomCode + "/result").set("Voted out: " + winner);
  });
}