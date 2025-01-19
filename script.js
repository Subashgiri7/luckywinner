const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
let names = [];
let secretWinner = null;

function drawWheel() {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFC733", "#A833FF"];
  const numSegments = names.length;
  const arcSize = (2 * Math.PI) / numSegments;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  names.forEach((name, index) => {
    const angle = index * arcSize;
    ctx.beginPath();
    ctx.arc(250, 250, 200, angle, angle + arcSize);
    ctx.lineTo(250, 250);
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle + arcSize / 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(name, 0, -180);
    ctx.restore();
  });
}

function addName() {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value.trim();
  if (name) {
    names.push(name);
    nameInput.value = "";
    drawWheel();
    document.getElementById("secret-btn").style.display = "block"; // Show secret button
  }
}

function spinWheel() {
  if (names.length === 0) {
    alert("Please add some names first!");
    return;
  }

  let rotation = 0;
  const totalSpins = Math.random() * 1000 + 3000; // Random spin duration
  const spinInterval = setInterval(() => {
    rotation += 10;
    const angle = (rotation * Math.PI) / 180;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (rotation >= totalSpins) {
      clearInterval(spinInterval);
      const winningIndex = Math.floor(
        ((360 - (rotation % 360)) / 360) * names.length
      );
      const winner = names[(winningIndex + 1) % names.length];
      document.getElementById("winner-display").innerText = `Winner: ${winner}`;
    }
  }, 10);
}

function selectWinner() {
  if (names.length === 0) {
    alert("Please add some names first!");
    return;
  }
  secretWinner = prompt("Enter the name of the winner:");
  if (names.includes(secretWinner)) {
    document.getElementById("winner-display").innerText = `Winner: ${secretWinner}`;
  } else {
    alert("Name not found in the list.");
  }
}

drawWheel();
