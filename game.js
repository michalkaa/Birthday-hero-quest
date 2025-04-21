const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const messageBox = document.getElementById("messageBox");

canvas.width = 800;
canvas.height = 500;

let player = { x: 50, y: 220, width: 40, height: 40, color: "gold" };
let goal = { x: 700, y: 220, width: 40, height: 40, color: "pink" };
let monsters = [
  { x: 200, y: 200, width: 40, height: 40, color: "red" },
  { x: 400, y: 200, width: 40, height: 40, color: "purple" },
  { x: 600, y: 200, width: 40, height: 40, color: "black" }
];

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRect(player);
  drawRect(goal);
  monsters.forEach(drawRect);
}

function checkCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function endGame(text) {
  messageBox.innerText = text;
  window.removeEventListener("keydown", movePlayer);
}

function movePlayer(e) {
  const speed = 10;
  if (e.key === "ArrowRight") player.x += speed;
  if (e.key === "ArrowLeft") player.x -= speed;
  if (e.key === "ArrowUp") player.y -= speed;
  if (e.key === "ArrowDown") player.y += speed;

  drawGame();

  for (let m of monsters) {
    if (checkCollision(player, m)) {
      endGame("You were defeated by a monster! 🐉");
      return;
    }
  }

  if (checkCollision(player, goal)) {
    endGame("Hjalmar kneels before the princess.
'I'm saved now forever?' 💖
Happy Birthday!");
  }
}

window.addEventListener("keydown", movePlayer);
drawGame();
