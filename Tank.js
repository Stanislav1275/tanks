
class Tank {
    constructor(tank_constructor, x, y, deg) {
        this.x = x;
        this.y = y;
        this.sprite = tank_constructor.sprite;
        this.deg = deg;
        this.score = 0;
        this.hasBeenHit = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.downPressed = false;
        this.rightPressed = false;
        this.attackPressed = false;
        this.keys = tank_constructor.keys
        this.canFire = true;
        this.bulletsCount = 0;
        this.done = false;//для избежания повторного нажатия атаки
        this.bulletSpeed = 2;
        this.hasBeenHit = false;
        this.speed = 2;
        this.w = 48
        this.rotSpeed = 2;
        this.h = 32;
    }

    drawWithRot() {
        let rad = oneRad * this.deg
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(rad)
        ctx.drawImage(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h)
        ctx.rotate(-rad)
        ctx.translate((this.x + this.w / 2) * (-1), (this.y + this.h / 2) * (-1));
    }

    draw() {
        if (!this.hasBeenHit)
            this.drawWithRot()
    }

    VerticalMovement(isUp) {
        if (isUp) {
            this.x += +(Math.cos((this.deg) * oneRad)*this.speed)
            this.y += +(Math.sin((this.deg) * oneRad)*this.speed)
        } else {
            this.x -= +(Math.cos((this.deg) * oneRad)*this.speed)
            this.y -= +(Math.sin((this.deg) * oneRad)*this.speed)
        }

    }

    isWallsCollision(isUp){
        let isCollision = false
        let t
        if(isUp){

            t = new Tank({
                    keys: this.keys,
                    sprite: this.sprite
                }, this.x + Math.cos(this.deg * oneRad), this.y + Math.sin(this.deg * oneRad), this.deg
            )

        }
        else{
            t = new Tank({
                    keys: this.keys,
                    sprite: this.sprite
                }, this.x - Math.cos(this.deg * oneRad), this.y - Math.sin(this.deg * oneRad), this.deg
            )

        }
        for (let wall of walls) {
            if (willCollide(t, wall)) isCollision = true
        }
        if(!isCollision){
            this.VerticalMovement(isUp)
        }
    }
    Move() {
        let actualDeg = this.deg
        if (this.attackPressed && this.canFire && !this.done /*&& this.bulletsCount < 5*/) {
            playSound("./sounds/fire.flac",0.5)

            this.done = true;
            let xDirection = +(this.x + this.w / 2 + Math.cos(actualDeg * oneRad))
            let yDirection = +(this.y + this.h / 2 + Math.sin(actualDeg * oneRad))
            bullets.push(new Bullet(xDirection, yDirection, this.bulletSpeed, actualDeg, this))
        }
        if (this.leftPressed) {
            this.deg -= this.rotSpeed;
        }
        if (this.rightPressed) {
            this.deg += this.rotSpeed;
        }
        if (this.upPressed) {
            let isCollision = false

            let t = new Tank({
                    keys: this.keys,
                    sprite: this.sprite
                }, this.x + Math.cos(this.deg * oneRad), this.y + Math.sin(this.deg * oneRad), this.deg
            )
            for (let wall of walls) {
                if (willCollide(t, wall)) {
                    isCollision = true
                    // if(this.bulletsCount>0)
                    // this.bulletsCount--

                }

            }

            if (!isCollision)
                this.VerticalMovement(true)
        }
        if (this.downPressed) {
            let isCollision = false
            let t = new Tank({
                    keys: this.keys,
                    sprite: this.sprite
                }, this.x - Math.cos(this.deg * oneRad), this.y - Math.sin(this.deg * oneRad), this.deg
            )
            for (let wall of walls) {
                if (willCollide(t, wall)) isCollision = true
            }

            if (!isCollision)
                this.VerticalMovement(false)
        }


    }
}
