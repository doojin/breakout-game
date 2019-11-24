class Ball {
    constructor(settings, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = (settings.position && settings.position.x) || canvas.width / 2;
        this.y = (settings.position && settings.position.y) || canvas.height - 30;
        this.radius = settings.radius || 10;
        this.dx = (settings.movement && settings.movement.dx) || 1;
        this.dy = (settings.movement && settings.movement.dx) || -1;
        this.line = {
            length: (settings.line && settings.line.length) || 200,
            transparency: {
                min: (settings.line && settings.line.transparency && settings.line.transparency.min) || 0,
                max: (settings.line && settings.line.transparency && settings.line.transparency.max) || 100
            }
        };
        this.ballLine = [];
    }

    get leftBorder() {
        return this.x - this.radius;
    }

    get rightBorder() {
        return this.x + this.radius;
    }

    get topBorder() {
        return this.y - this.radius;
    }

    get bottomBorder() {
        return this.y + this.radius;
    }

    draw() {
        this._updateMovementDirections();
        this._drawBall();
        this._drawLine();

        this.x += this.dx;
        this.y += this.dy;
    }

    _updateMovementDirections() {
        if (this.rightBorder + this.dx > canvas.width || this.leftBorder + this.dx < 0) {
            this.dx = -this.dx;
        }
    
        if (this.topBorder + this.dy < 0 || this.bottomBorder + this.dy > canvas.height) {
            this.dy = -this.dy;
        }
    }

    _drawBall() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'steelblue';
        this.ctx.fill();
        this.ctx.closePath();
    }

    _drawLine() {
        const { x, y } = this;
        this.ballLine.unshift({ x, y });
        
        if (this.ballLine.length > this.line.length) {
            this.ballLine.pop();
        }
    
        for (let i = 0; i < this.ballLine.length; i++) {
            const { x, y } = this.ballLine[i];
    
            const transparencyCoeff = 1 - i / this.ballLine.length;
    
            const transparencyDelta = (this.line.transparency.max - this.line.transparency.min) / 100;
            const transparency = transparencyCoeff * transparencyDelta + this.line.transparency.min / 100;
    
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(50, 50, 50, ${transparency})`;
            this.ctx.fill();
            this.ctx.closePath();
        }
    }
}