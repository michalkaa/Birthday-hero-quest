const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const messageBox = document.getElementById("messageBox");

let player = {
    x: 50,
    y: 50,
    width: 40,
    height: 40,
    color: "#ffd700",
    speed: 4,
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawScene() {
    clearCanvas();
    drawPlayer();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.y -= player.speed;
    if (e.key === "ArrowDown") player.y += player.speed;
    if (e.key === "ArrowLeft") player.x -= player.speed;
    if (e.key === "ArrowRight") player.x += player.speed;
});

function gameLoop() {
    drawScene();
    requestAnimationFrame(gameLoop);
}

messageBox.innerText = "Hjalmar says: 'Wo bin ich?! Wo ist Michalka?!'";

gameLoop();
