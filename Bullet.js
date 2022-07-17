class Bullet {
    constructor(x, y, speed, deg) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.deg = deg;
        this.timeOfBirth = currentSeconds();
        this.w = 7;
        this.h = 7;
        this.speed = 6;
    }

    draw() {
        ctx.drawImage(bullet, this.x, this.y, 9, 9);
        this.x += (this.speed * Math.cos(this.deg * oneRad));
        this.y += (this.speed * Math.sin(this.deg * oneRad));
    }


    get isDead() {
        return (new Date() / 1000 - this.timeOfBirth) >= 4
    }
}