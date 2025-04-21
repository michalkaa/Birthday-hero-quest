// Set up the canvas
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 500;
canvas.style.border = '4px solid hotpink';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Load images and audio
const hjalmarImg = new Image();
hjalmarImg.src = 'assets/sprites/hjalmar.png';

const bgImg = new Image();
bgImg.src = 'assets/backgrounds/forest.png';

const epicMusic = new Audio('assets/audio/epic_theme.mp3');
epicMusic.loop = true;

// Hjalmar's state
let hjalmar = {
  x: 100,
  y: 350,
  speed: 4,
  width: 48,
  height: 48
};

// Movement state
let keys = {};

// Show intro dialogue
const dialogue = document.createElement('div');
dialogue.innerText = "Hjalmar says: 'Wo bin ich?! Wo ist Michalka?!'";
dialogue.style.textAlign = 'center';
dialogue.style.color = 'white';
dialogue.style.fontSize = '20px';
dialogue.style.marginTop = '10px';
document.body.appendChild(dialogue);

// Play music when user interacts
document.body.addEventListener('click', () => {
  if (epicMusic.paused) epicMusic.play();
});

// Handle key events
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Update game logic
function update() {
  if (keys['ArrowLeft']) hjalmar.x -= hjalmar.speed;
  if (keys['ArrowRight']) hjalmar.x += hjalmar.speed;
  if (keys['ArrowUp']) hjalmar.y -= hjalmar.speed;
  if (keys['ArrowDown']) hjalmar.y += hjalmar.speed;
}

// Render everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  if (bgImg.complete) ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Hjalmar
  if (hjalmarImg.complete) {
    ctx.drawImage(hjalmarImg, hjalmar.x, hjalmar.y, hjalmar.width, hjalmar.height);
  } else {
    // fallback yellow square if sprite not loaded
    ctx.fillStyle = 'yellow';
    ctx.fillRect(hjalmar.x, hjalmar.y, hjalmar.width, hjalmar.height);
  }
}

// Game loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
