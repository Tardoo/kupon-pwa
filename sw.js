<script>
const canvas = document.getElementById("crashCanvas");
const ctx = canvas.getContext("2d");

let coin = Number(localStorage.getItem("coin")) || 1000;
document.getElementById("coin").innerText = coin;

let multiplier = 1;
let crashPoint = 0;
let betAmount = 0;
let playing = false;
let interval = null;

let x = 20;
let y = canvas.height - 20;

// Sesler
const startSound = document.getElementById("startSound");
const cashSound = document.getElementById("cashSound");
const crashSound = document.getElementById("crashSound");

function updateCoin() {
  document.getElementById("coin").innerText = coin;
  localStorage.setItem("coin", coin);
}

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // çizgi
  ctx.strokeStyle = "#2ecc71";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(20, canvas.height - 20);
  ctx.lineTo(x, y);
  ctx.stroke();

  // zeplin
  ctx.font = "20px Arial";
  ctx.fillText("🎈", x - 10, y - 10);
}

function startGame() {
  if (playing) return;

  betAmount = Number(document.getElementById("bet").value);
  if (betAmount > coin) {
    alert("Yetersiz COIN");
    return;
  }

  startSound.play();

  coin -= betAmount;
  updateCoin();

  multiplier = 1;
  crashPoint = Math.random() * 4 + 1.5;
  playing = true;

  x = 20;
  y = canvas.height - 20;

  document.getElementById("status").innerText = "Zeplin yükseliyor 🎈";

  interval = setInterval(() => {
    multiplier += 0.02;
    x += 2;
    y -= 1.5;

    document.getElementById("multiplier").innerText =
      multiplier.toFixed(2) + "x";

    drawGraph();

    if (multiplier >= crashPoint || y <= 20) {
      crash();
    }
  }, 100);
}

function cashOut() {
  if (!playing) return;

  clearInterval(interval);
  cashSound.play();

  const win = Math.floor(betAmount * multiplier);
  coin += win;
  updateCoin();

  document.getElementById("status").innerText =
    "🎉 Kazandın +" + win + " COIN";

  playing = false;
}

function crash() {
  clearInterval(interval);
  crashSound.play();

  ctx.font = "30px Arial";
  ctx.fillText("💥", x - 15, y - 10);

  document.getElementById("status").innerText =
    "💥 Zeplin patladı!";

  playing = false;
}
</script>
