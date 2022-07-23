class Bullet {
    constructor(x, y, deg, owner) {
        this.x = x;
        this.y = y;
        this.deg = deg;
        this.timeOfBirth = currentSeconds();
        this.w = 7;
        this.h = 7;
        this.speed = 5;
        this.owner = owner
    }

    draw() {
        ctx.drawImage(this.owner.bullSprite, this.x, this.y, this.w, this.h)
        // ctx.fillRect(this.x,this.y,this.w,this.h)
        this.x += (this.speed * Math.cos(this.deg * oneRad));
        this.y += (this.speed * Math.sin(this.deg * oneRad));


    }
}
Bullet.speed = 5;