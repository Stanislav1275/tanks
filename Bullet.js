class Bullet {
    constructor(x, y, speed, deg, owner) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.deg = deg;
        this.timeOfBirth = currentSeconds();
        this.w = 7;
        this.h = 7;
        this.speed = 3;
        this.owner = owner
    }

    draw() {
        ctx.drawImage(bullet, this.x, this.y, this.w, this.h)
        // ctx.fillRect(this.x,this.y,this.w,this.h)
        this.x += (this.speed * Math.cos(this.deg * oneRad));
        this.y += (this.speed * Math.sin(this.deg * oneRad));


    }
}
