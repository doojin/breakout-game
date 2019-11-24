const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const ballLine = [];

const ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    radius: 10,

    get leftBorder() {
        return this.x - this.radius;
    },

    get rightBorder() {
        return this.x + this.radius;
    },

    get topBorder() {
        return this.y - this.radius;
    },

    get bottomBorder() {
        return this.y + this.radius;
    }
};

let dx = 1;
let dy = -1;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (ball.rightBorder + dx > canvas.width || ball.leftBorder + dx < 0) {
        dx = -dx;
    }

    if (ball.topBorder + dy < 0 || ball.bottomBorder + dy > canvas.height) {
        dy = -dy;
    }
    
    drawBall();
    drawBallLine(250);

    ball.x += dx;
    ball.y += dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'steelblue';
    ctx.fill();
    ctx.closePath();
}

function drawBallLine(length) {
    const { x, y } = ball;
    ballLine.unshift({ x, y });
    
    if (ballLine.length > length) {
        ballLine.pop();
    }

    for (let i = 0; i < ballLine.length; i++) {
        const { x, y } = ballLine[i];

        const minTransparency = 0;
        const maxTransparency = 30;
        const transparencyCoeff = 1 - i / ballLine.length;

        const transparencyDelta = (maxTransparency - minTransparency) / 100;
        const transparency = transparencyCoeff * transparencyDelta + minTransparency / 100;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(50, 50, 50, ${transparency})`;
        ctx.fill();
        ctx.closePath();
    }
}

setInterval(draw, 10);