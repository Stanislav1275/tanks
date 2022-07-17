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
        this.w = 48;
        this.speed = 3;
        this.h = 32;
        this.rotSpeed = 3;
    }

    drawWithRot() {
        let rad = oneRad * this.deg
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(rad)
        ctx.drawImage(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h)
        ctx.rotate(-rad)
        ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
    }

    resetDeg() {
        if (this.deg > 360) {
            this.deg = 0
        } else if (this.deg < -360) {
            this.deg = -0
        }
    }

    draw() {
        if (!this.hasBeenHit)
            this.drawWithRot()
    }

    VerticalMovement(bool) {
        if (bool) {
            this.x += +(Math.cos((this.deg) * oneRad))*this.speed
            this.y += +(Math.sin((this.deg) * oneRad))*this.speed
        } else {
            this.x -= +(Math.cos((this.deg) * oneRad))*this.speed
            this.y -= +(Math.sin((this.deg) * oneRad))*this.speed
        }

    }


    Move() {
        let actualDeg = this.deg
        if (this.attackPressed && this.canFire && !this.done) {//attack
            this.done = true;
            let xDirection = +(this.x + this.w / 2 + Math.cos(actualDeg * oneRad))
            let yDirection = +(this.y + this.h / 2 + Math.sin(actualDeg * oneRad))
            bullets.push(new Bullet(xDirection, yDirection, this.bulletSpeed, actualDeg))
        }
        if (this.leftPressed) {
            this.resetDeg()
            this.deg -= this.rotSpeed;
            actualDeg = this.deg
        }
        if (this.rightPressed) {
            this.resetDeg()
            this.deg += this.rotSpeed;
            actualDeg = this.deg
        }
        if (this.upPressed) {
            this.VerticalMovement(true)
        }
        if (this.downPressed) {
            this.VerticalMovement(false)
        }
    }
}