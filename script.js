// 🔥 Firebase config
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

// ================== CATEGORIES ==================
const categories = {
  "Animals": [
    { word: "Lion", hint: "King of the jungle" },
    { word: "Elephant", hint: "Has a trunk" },
    { word: "Giraffe", hint: "Very long neck" },
    { word: "Tiger", hint: "Striped big cat" },
    { word: "Penguin", hint: "Flightless bird in tuxedo" },
    { word: "Dolphin", hint: "Intelligent marine mammal" },
    { word: "Kangaroo", hint: "Australian hopper with pouch" },
    { word: "Panda", hint: "Black and white bamboo eater" },
    { word: "Koala", hint: "Eucalyptus-loving marsupial" },
    { word: "Cheetah", hint: "Fastest land animal" },
    { word: "Zebra", hint: "Striped horse relative" },
    { word: "Gorilla", hint: "Largest primate" },
    { word: "Rhino", hint: "Horned thick-skinned giant" },
    { word: "Hippo", hint: "River horse of Africa" },
    { word: "Crocodile", hint: "Ancient reptilian predator" },
    { word: "Shark", hint: "Ocean's apex predator" },
    { word: "Eagle", hint: "Soaring bird of prey" },
    { word: "Wolf", hint: "Pack hunting canine" },
    { word: "Bear", hint: "Hibernating forest dweller" },
    { word: "Octopus", hint: "Eight-armed sea creature" },
    { word: "Flamingo", hint: "Pink wading bird" },
    { word: "Peacock", hint: "Colorful fan-tailed bird" },
    { word: "Chameleon", hint: "Color-changing reptile" },
    { word: "Sloth", hint: "Extremely slow tree dweller" },
    { word: "Otter", hint: "Playful river mammal" },
    { word: "Chimpanzee", hint: "Our closest genetic relative" },
    { word: "Leopard", hint: "Spotted big cat climber" },
    { word: "Walrus", hint: "Tusked Arctic mammal" },
    { word: "Moose", hint: "Largest deer species" },
    { word: "Raccoon", hint: "Masked garbage bandit" },
    { word: "Platypus", hint: "Duck-billed egg-laying mammal" },
    { word: "Jellyfish", hint: "Stinging transparent drifter" },
    { word: "Parrot", hint: "Colorful talking bird" },
    { word: "Cobra", hint: "Hooded venomous snake" },
    { word: "Hedgehog", hint: "Spiky nocturnal mammal" },
    { word: "Meerkat", hint: "Standing desert lookout" },
    { word: "Tarantula", hint: "Large hairy spider" },
    { word: "Seal", hint: "Clapping marine mammal" },
    { word: "Toucan", hint: "Large-beaked tropical bird" },
    { word: "Anaconda", hint: "Massive constricting snake" },
    { word: "Bison", hint: "Shaggy North American bovine" },
    { word: "Lemur", hint: "Madagascar primate" },
    { word: "Armadillo", hint: "Armored burrowing mammal" },
    { word: "Pelican", hint: "Fish-scooping pouch bird" },
    { word: "Lynx", hint: "Tufted-ear wild cat" },
    { word: "Mongoose", hint: "Snake-fighting mammal" },
    { word: "Hyena", hint: "Laughing scavenger" },
    { word: "Stingray", hint: "Flat ocean glider with tail" },
    { word: "Pigeon", hint: "Common city bird" },
    { word: "Squirrel", hint: "Nut-gathering tree rodent" }
  ],

  "Places": [
    { word: "Beach", hint: "Sand and ocean" },
    { word: "Hospital", hint: "Doctors and medicine" },
    { word: "Airport", hint: "Planes taking off" }
  ],

  "Food": [
    { word: "Pizza", hint: "Cheesy and round" },
    { word: "Sushi", hint: "Raw fish and rice" },
    { word: "Burger", hint: "Patty between buns" },
    { word: "Taco", hint: "Mexican folded shell" },
    { word: "Pasta", hint: "Italian noodle dish" },
    { word: "Ramen", hint: "Japanese noodle soup" },
    { word: "Burrito", hint: "Wrapped Mexican meal" },
    { word: "Steak", hint: "Grilled beef cut" },
    { word: "Salad", hint: "Mixed greens and veggies" },
    { word: "Sandwich", hint: "Filling between bread" },
    { word: "Nachos", hint: "Chips with toppings" },
    { word: "Lasagna", hint: "Layered pasta bake" },
    { word: "Waffle", hint: "Grid-patterned breakfast" },
    { word: "Pancake", hint: "Fluffy breakfast stack" },
    { word: "Omelet", hint: "Folded egg dish" },
    { word: "Curry", hint: "Spiced Indian dish" },
    { word: "Dumplings", hint: "Wrapped dough pockets" },
    { word: "Falafel", hint: "Fried chickpea balls" },
    { word: "Kebab", hint: "Skewered grilled meat" },
    { word: "Popcorn", hint: "Popped kernel snack" },
    { word: "Hotdog", hint: "Sausage in a bun" },
    { word: "Brownie", hint: "Chocolate baked square" },
    { word: "Donut", hint: "Fried dough ring" },
    { word: "Muffin", hint: "Individual baked cake" },
    { word: "Croissant", hint: "Flaky French pastry" },
    { word: "Pretzel", hint: "Twisted salty bread" },
    { word: "Bagel", hint: "Dense boiled bread ring" },
    { word: "Quesadilla", hint: "Grilled cheese tortilla" },
    { word: "Risotto", hint: "Creamy Italian rice" },
    { word: "Paella", hint: "Spanish rice seafood dish" },
    { word: "Pho", hint: "Vietnamese noodle soup" },
    { word: "Smoothie", hint: "Blended fruit drink" },
    { word: "Milkshake", hint: "Thick ice cream drink" },
    { word: "Cheesecake", hint: "Creamy dessert with crust" },
    { word: "Tiramisu", hint: "Coffee-soaked Italian dessert" },
    { word: "Fondue", hint: "Melted cheese for dipping" },
    { word: "Souvlaki", hint: "Greek meat skewers" },
    { word: "Couscous", hint: "North African grain dish" },
    { word: "Hummus", hint: "Chickpea spread dip" },
    { word: "Guacamole", hint: "Mashed avocado dip" },
    { word: "Chowder", hint: "Thick creamy soup" },
    { word: "Goulash", hint: "Hungarian meat stew" },
    { word: "Schnitzel", hint: "Breaded fried cutlet" },
    { word: "Tempura", hint: "Japanese battered fry" },
    { word: "Biryani", hint: "Spiced rice and meat" },
    { word: "Jambalaya", hint: "Creole rice mix" },
    { word: "Casserole", hint: "Baked mixed dish" },
    { word: "Chili", hint: "Spicy bean stew" },
    { word: "Pie", hint: "Filled pastry crust" },
    { word: "Cobbler", hint: "Fruit with topping" }
  ],

  "Objects": [
    { word: "Pencil", hint: "Writing tool with eraser" },
    { word: "Backpack", hint: "Carry bag for school" },
    { word: "Laptop", hint: "Portable computer" },
    { word: "Headphones", hint: "Audio ear device" },
    { word: "Microwave", hint: "Kitchen heating appliance" },
    { word: "Toothbrush", hint: "Dental hygiene tool" },
    { word: "Umbrella", hint: "Rain protection device" },
    { word: "Scissors", hint: "Cutting tool with blades" },
    { word: "Stapler", hint: "Paper fastening device" },
    { word: "Calculator", hint: "Math computing device" },
    { word: "Compass", hint: "Direction finding tool" },
    { word: "Flashlight", hint: "Portable light source" },
    { word: "Hammer", hint: "Nail driving tool" },
    { word: "Screwdriver", hint: "Turning tool for fasteners" },
    { word: "Wrench", hint: "Bolt tightening tool" },
    { word: "Thermometer", hint: "Temperature measuring device" },
    { word: "Mirror", hint: "Reflective surface" },
    { word: "Pillow", hint: "Head rest cushion" },
    { word: "Blanket", hint: "Warm covering fabric" },
    { word: "Towel", hint: "Drying cloth" },
    { word: "Suitcase", hint: "Travel luggage container" },
    { word: "Wallet", hint: "Money holding pouch" },
    { word: "Watch", hint: "Wrist time device" },
    { word: "Sunglasses", hint: "Eye protection eyewear" },
    { word: "Belt", hint: "Waist holding strap" },
    { word: "Gloves", hint: "Hand warming covers" },
    { word: "Helmet", hint: "Head protection gear" },
    { word: "Camera", hint: "Photo capturing device" },
    { word: "Speaker", hint: "Sound output device" },
    { word: "Charger", hint: "Battery power cable" },
    { word: "Remote", hint: "TV control device" },
    { word: "Keyboard", hint: "Typing input device" },
    { word: "Mouse", hint: "Computer pointing tool" },
    { word: "Printer", hint: "Paper output machine" },
    { word: "Ruler", hint: "Measuring straight edge" },
    { word: "Globe", hint: "Miniature Earth model" },
    { word: "Telescope", hint: "Star viewing instrument" },
    { word: "Microscope", hint: "Tiny object viewer" },
    { word: "Binoculars", hint: "Distance viewing pair" },
    { word: "Clock", hint: "Wall time display" },
    { word: "Calendar", hint: "Date tracking grid" },
    { word: "Notebook", hint: "Paper writing book" },
    { word: "Binder", hint: "Ring paper organizer" },
    { word: "Eraser", hint: "Pencil mark remover" },
    { word: "Sharpener", hint: "Pencil point maker" },
    { word: "Highlighter", hint: "Bright marking pen" },
    { word: "Tape", hint: "Adhesive strip" },
    { word: "Glue", hint: "Sticky bonding substance" },
    { word: "Marker", hint: "Permanent writing pen" },
    { word: "Crayon", hint: "Waxy coloring stick" },
    { word: "Paintbrush", hint: "Art application tool" },
    { word: "Canvas", hint: "Painting surface cloth" },
    { word: "Easel", hint: "Artist's holding stand" },
    { word: "Trophy", hint: "Victory award item" },
    { word: "Medal", hint: "Achievement badge" },
    { word: "Flag", hint: "Symbol waving cloth" },
    { word: "Rope", hint: "Thick twisted cord" },
    { word: "Ladder", hint: "Climbing step tool" },
    { word: "Bucket", hint: "Carrying container" },
    { word: "Broom", hint: "Floor sweeping tool" }
  ],

  "Sports": [
    { word: "Basketball", hint: "Hoop shooting game" },
    { word: "Soccer", hint: "Goal kicking sport" },
    { word: "Football", hint: "Touchdown tackling game" },
    { word: "Baseball", hint: "Bat and diamond sport" },
    { word: "Tennis", hint: "Racket and net game" },
    { word: "Volleyball", hint: "Bumping over net" },
    { word: "Hockey", hint: "Puck and stick sport" },
    { word: "Golf", hint: "Hole aiming game" },
    { word: "Swimming", hint: "Pool lap racing" },
    { word: "Boxing", hint: "Ring punching sport" },
    { word: "Wrestling", hint: "Grappling mat sport" },
    { word: "Gymnastics", hint: "Flipping and beam sport" },
    { word: "Skiing", hint: "Snowy slope gliding" },
    { word: "Skateboarding", hint: "Board trick riding" },
    { word: "Surfing", hint: "Wave riding sport" },
    { word: "Cricket", hint: "Wicket batting game" },
    { word: "Rugby", hint: "Oval ball tackling" },
    { word: "Badminton", hint: "Shuttlecock racket game" },
    { word: "Archery", hint: "Bow and target sport" },
    { word: "Fencing", hint: "Sword dueling sport" },
    { word: "Rowing", hint: "Oar water racing" },
    { word: "Cycling", hint: "Pedal racing sport" },
    { word: "Marathon", hint: "Long distance running" },
    { word: "Bowling", hint: "Pin knocking game" },
    { word: "Lacrosse", hint: "Netted stick sport" }
  ],

  "Brands": [
    { word: "Nike", hint: "Swoosh athletic brand" },
    { word: "Adidas", hint: "Three stripes sportswear" },
    { word: "Apple", hint: "Bitten fruit tech company" },
    { word: "Samsung", hint: "Korean electronics giant" },
    { word: "Sony", hint: "PlayStation maker" },
    { word: "Microsoft", hint: "Windows creator" },
    { word: "Google", hint: "Search engine company" },
    { word: "Amazon", hint: "Online retail giant" },
    { word: "Netflix", hint: "Streaming red N" },
    { word: "Spotify", hint: "Green music streamer" },
    { word: "Tesla", hint: "Electric car innovator" },
    { word: "Ferrari", hint: "Italian racing horse" },
    { word: "Gucci", hint: "Double G luxury" },
    { word: "Prada", hint: "Italian fashion house" },
    { word: "Rolex", hint: "Crown watch maker" },
    { word: "Supreme", hint: "Red box streetwear" },
    { word: "Vans", hint: "Skate shoe brand" },
    { word: "Converse", hint: "Star sneaker company" },
    { word: "Puma", hint: "Leaping cat athletic" },
    { word: "Reebok", hint: "CrossFit shoe brand" },
    { word: "Walmart", hint: "Blue retail superstore" },
    { word: "Target", hint: "Bullseye department store" },
    { word: "Starbucks", hint: "Green mermaid coffee" },
    { word: "McDonalds", hint: "Golden arches fast food" },
    { word: "Subway", hint: "Sandwich footlong chain" },
    { word: "Disney", hint: "Mouse ear empire" },
    { word: "Canon", hint: "Camera and printer brand" },
    { word: "Honda", hint: "Japanese car reliability" },
    { word: "Toyota", hint: "World's largest automaker" },
    { word: "Lego", hint: "Building brick toy" }
  ],

  "Pokémon": [
    { word: "Pikachu", hint: "Electric yellow mouse" },
    { word: "Charizard", hint: "Fire-flying dragon" },
    { word: "Mewtwo", hint: "Psychic legendary clone" },
    { word: "Blastoise", hint: "Water turtle with cannons" },
    { word: "Gengar", hint: "Ghost poison shadow" },
    { word: "Snorlax", hint: "Sleeping road blocker" },
    { word: "Gyarados", hint: "Raging serpent" },
    { word: "Dragonite", hint: "Friendly dragon" },
    { word: "Lucario", hint: "Aura fighter" },
    { word: "Eevee", hint: "Evolution fox" },
    { word: "Greninja", hint: "Water ninja frog" },
    { word: "Rayquaza", hint: "Sky legendary" }
  ],

  "Brain Rot": [
    { word: "Skibidi", hint: "Toilet head meme" },
    { word: "Rizz", hint: "Charisma slang" },
    { word: "Sigma", hint: "Lone wolf grindset" },
    { word: "Fanum Tax", hint: "Stealing food" },
    { word: "Ohio", hint: "Weird state" },
    { word: "NPC", hint: "Background character" },
    { word: "W", hint: "Win" },
    { word: "L", hint: "Loss" },
    { word: "Mid", hint: "Average" },
    { word: "Cringe", hint: "Embarrassing" }
  ],
  

  "Snacks": [
    { word: "Cheetos", hint: "Cheese finger stainer" },
    { word: "Doritos", hint: "Triangle chips" },
    { word: "Pringles", hint: "Tube chips" },
    { word: "Oreos", hint: "Twist lick dunk" },
    { word: "Skittles", hint: "Taste rainbow" },
    { word: "M&Ms", hint: "Candy shells" },
    { word: "Snickers", hint: "Hungry bar" },
    { word: "KitKat", hint: "Break me" },
    { word: "Takis", hint: "Spicy rolled chips" },
    { word: "Popcorn", hint: "Movie snack" }
  ]
};

// ================== GAME LOGIC ==================

function createRoom() {
  playerName = document.getElementById("name").value;
  roomCode = Math.random().toString(36).substring(2,6).toUpperCase();
  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);
  window.location = "game.html?room=" + roomCode + "&name=" + playerName;
}

function joinRoom() {
  playerName = document.getElementById("name").value;
  roomCode = document.getElementById("roomCode").value.toUpperCase();
  db.ref("rooms/" + roomCode + "/players/" + playerId).set(playerName);
  window.location = "game.html?room=" + roomCode + "&name=" + playerName;
}

const params = new URLSearchParams(window.location.search);
roomCode = params.get("room");
playerName = params.get("name");

if (roomCode) {
  document.getElementById("roomTitle").innerText = "Room: " + roomCode;

  const select = document.getElementById("categorySelect");
  Object.keys(categories).forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  // Listen for players joining
  db.ref("rooms/" + roomCode + "/players").on("value", snapshot => {
    const list = document.getElementById("playerList");
    const playersDiv = document.getElementById("players");

    list.innerHTML = "";
    playersDiv.innerHTML = "";

    let isFirst = true;

    snapshot.forEach(child => {
      const name = child.val();
      const id = child.key;

      // Lobby list
      const li = document.createElement("li");
      li.textContent = name;
      list.appendChild(li);

      // Voting buttons
      const btn = document.createElement("button");
      btn.innerText = name;
      btn.className = "playerBtn";

      btn.onclick = () => {
        selectedVote = id;
        document.querySelectorAll(".playerBtn").forEach(b => b.style.background = "#ff3b3b");
        btn.style.background = "#4caf50";
      };

      playersDiv.appendChild(btn);

      // First player = host
      if (isFirst && id === playerId) {
        document.getElementById("setupBox").style.display = "block";
      }

      isFirst = false;
    });
  });

  // Role listener (show role + voting only after game starts)
  db.ref("rooms/" + roomCode + "/roles/" + playerId).on("value", snap => {
    if (snap.exists()) {
      document.getElementById("role").innerText = snap.val();
      document.getElementById("roleBox").style.display = "block";
      document.getElementById("voteBox").style.display = "block";
    }
  });

  // Result listener
  db.ref("rooms/" + roomCode + "/result").on("value", snap => {
    if (snap.exists()) {
      document.getElementById("result").innerText = snap.val();
    }
  });
}

function startGame() {
  const selectedCategory = document.getElementById("categorySelect").value;
  const list = categories[selectedCategory];
  const randomItem = list[Math.floor(Math.random() * list.length)];

  const word = randomItem.word;
  const hint = randomItem.hint;

  db.ref("rooms/" + roomCode + "/word").set(word);
  db.ref("rooms/" + roomCode + "/hint").set(hint);

  db.ref("rooms/" + roomCode + "/players").once("value").then(snapshot => {
    let keys = [];
    snapshot.forEach(child => keys.push(child.key));
    let imposter = keys[Math.floor(Math.random() * keys.length)];

    keys.forEach(id => {
      if (id === imposter) {
        db.ref("rooms/" + roomCode + "/roles/" + id).set("You are the IMPOSTER");
      } else {
        db.ref("rooms/" + roomCode + "/roles/" + id).set("Word: " + word + " | Hint: " + hint);
      }
    });
  });
}

function submitVote() {
  if (!selectedVote) {
    alert("Select a player!");
    return;
  }

  db.ref("rooms/" + roomCode + "/votes/" + playerId).set(selectedVote);

  db.ref("rooms/" + roomCode + "/votes").once("value").then(snapshot => {
    let counts = {};
    snapshot.forEach(child => {
      let vote = child.val();
      counts[vote] = (counts[vote] || 0) + 1;
    });

    let winner = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    db.ref("rooms/" + roomCode + "/result").set("Voted out: " + winner);
  });
}