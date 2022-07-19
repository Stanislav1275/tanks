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
    rebound(wall){//cтолкнулась ли пуля с конкретной стеной
        if ((this.x >= wall.x) && (this.x + this.w <= wall.x + wall.w) && (this.y >= wall.y) && (this.y + this.h <= wall.y + wall.h)) {
            let bulletHalfW = this.w / 2;
            let bulletHalfH = this.h / 2;
            let wallHalfW = wall.w / 2;
            let wallHalfH = wall.h / 2;
            let bulletCenterX = this.x + bulletHalfW;
            let bulletCenterY = this.y + bulletHalfH;
            let wallCenterX = wall.x + wall.w / 2;
            let wallCenterY = wall.y + wall.h / 2;
            let diffX = bulletCenterX - wallCenterX;
            let diffY = bulletCenterY - wallCenterY;
            let minXDist = bulletHalfW + wallHalfW;
            let minYDist = bulletHalfH + wallHalfH;
            let depthX = (diffX > 0) ? minXDist - diffX : -minXDist - diffX;
            let depthY = (diffY > 0) ? minYDist - diffY : -minYDist - diffY;
            if (depthX != 0 && depthY != 0) {
                // bullet.deg = -bullet.deg + (Math.abs(depthX) < Math.abs(depthY))?180:360
                if (Math.abs(depthX) < Math.abs(depthY)) {
                    this.deg = -this.deg  + 180;
                } else {
                    this.deg = -this.deg + 360;
                }
            }
        }
    }

    get isDead() {
        return (new Date() / 1000 - this.timeOfBirth) >= 4
    }
}