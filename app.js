const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

const dx = 1;
const dy = -1;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();

    x += dx;
    y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'steelblue';
    ctx.fill();
    ctx.closePath();
}

setInterval(draw, 10);