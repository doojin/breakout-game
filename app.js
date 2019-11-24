const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const ball = new Ball({
    radius: 7,
    line: {
        transparency: {
            min: 0,
            max: 30
        },
        length: 100
    }
}, canvas);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw({}, canvas);
}

setInterval(draw, 10);