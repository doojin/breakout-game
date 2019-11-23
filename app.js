const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = '#CC0000';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
ctx.fillStyle = '#008800';
ctx.fill();
ctx.strokeStyle = 'rgba(0, 40, 0, 0.5)';
ctx.lineWidth = 4;
ctx.stroke();
ctx.closePath();