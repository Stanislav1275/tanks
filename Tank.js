function SAT(polygonA, polygonB) {
    let perpendicularLine = null;
    let dot = 0;
    let perpendicularStack = [];
    let aMin = null;
    let aMax = null;
    let bMin = null;
    let bMax = null;
    for (let aPolygonVertex of polygonA.edges) {
        perpendicularLine = new XY(-aPolygonVertex.y, aPolygonVertex.x);
        perpendicularStack.push(perpendicularLine);
    }
    for (let bPolygonVertex of polygonB.edges) {

        perpendicularLine = new XY(-bPolygonVertex.y, bPolygonVertex.x);
        perpendicularStack.push(perpendicularLine);
    }
    for (perpendicularLine of perpendicularStack) {
        aMin = null;
        aMax = null;
        bMin = null;
        bMax = null;
        for (let aPolygonVertex of polygonA.vertices) {
            dot = aPolygonVertex.x * perpendicularLine.x + aPolygonVertex.y * perpendicularLine;
            if (aMax == null || dot > aMax) {
                aMax = dot;
            }
            if (aMin == null || dot < aMin) {
                aMin = dot;
            }
        }
        for (let bPolygonVertex of polygonB.vertices) {
            dot = bPolygonVertex.x * perpendicularLine.x + bPolygonVertex.y * perpendicularLine;
            if (bMax == null || dot > bMax) {
                bMax = dot;
            }
            if (bMin == null || dot < bMin) {
                bMin = dot;
            }
        }
        if ((aMin < bMax && aMin > bMin) || (bMin < aMax && bMin > aMin)) {
            continue;
        } else return false;
    }
    return true;

}

function vertices(object) {
    return {
        ver1: {//вершины 1

            x: object.x,
            y: object.y
        },
        ver2: {//вершины 2
            x: (object.x + object.w),
            y: (object.y)
        },
        ver3: {//вершины 3
            x: (object.x),
            y: (object.y + object.h)
        },
        ver4: {//вершины 4
            x: (object.x + object.w),
            y: (object.y + object.h)
        },
        centerCord: {//координаты центра
            x: (object.x + object.x / 2),
            y: ((object.y) + object.y / 2)
        }
    }
}


class Tank {
    constructor(tank_constructor, x, y, deg) {
        this.x = x;
        this.y = y;
        this.sprite = tank_constructor?.sprite;
        this.deg = 45;
        this.score = 0;
        this.hasBeenHit = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.downPressed = false;
        this.rightPressed = false;
        this.attackPressed = false;
        this.keys = tank_constructor?.keys
        this.canFire = true;
        this.bulletsCount = 0;
        this.done = false;//для избежания повторного нажатия атаки
        this.bulletSpeed = 2;
        this.w = 48;
        this.speed = 2;
        this.h = 32;
        this.rotSpeed = 3;
        this.isCollision = false;
    }

    resetDeg() {
        if (this.deg > 360 || this.deg < -360)
            this.deg = 0;
    }


    draw() {
        if (!this.hasBeenHit) {
            ctx.save()
            let rad = oneRad * this.deg
            ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
            ctx.rotate(rad)
            ctx.drawImage(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h)
            ctx.restore()
        }
    }


    VerticalMovement(isUp) {
        if (isUp) {
                this.x += +(Math.cos((this.deg) * oneRad)) * this.speed
                this.y += +(Math.sin((this.deg) * oneRad)) * this.speed
        } else {
                this.x -= (Math.cos((this.deg) * oneRad)) * this.speed;
                this.y -= (Math.sin((this.deg) * oneRad)) * this.speed;
        }
    }

    Move() {
        if (this.attackPressed && this.canFire && !this.done) {//attack
            this.done = true;
            let xDirection = +(this.x + this.w / 2 + Math.cos(this.deg * oneRad))
            let yDirection = +(this.y + this.h / 2 + Math.sin(this.deg * oneRad))
            bullets.push(new Bullet(xDirection, yDirection, this.bulletSpeed, this.deg))
        }
        if (this.leftPressed) {
            this.resetDeg();
            this.deg -= this.rotSpeed;

        }
        if (this.rightPressed) {
            this.resetDeg();
            this.deg += this.rotSpeed;

        }
        if (this.upPressed) {
            let t1 = tanks[0]
            let t = new Tank(undefined,t1.x + Math.cos(this.deg*oneRad),t1.y + Math.sin(t1.deg*oneRad),t1.deg)
            let isC = false;
            for(let wall of walls){
                if(game.rebound(t, wall))isC = true
            }
            console.log(isC)

            this.x += +(Math.cos((this.deg) * oneRad)) * this.speed
            this.y += +(Math.sin((this.deg) * oneRad)) * this.speed


        }
        if (this.downPressed) {
            let t1 = tanks[0]
            let t = new Tank(undefined,t1.x - Math.cos(this.deg*oneRad),t1.y - Math.sin(t1.deg*oneRad),t1.deg)
            let isC = false;
            for(let wall of walls){
                if(game.rebound(t, wall))isC = true
            }
            console.log(isC)
            this.x -= (Math.cos((this.deg) * oneRad)) * this.speed;
            this.y -= (Math.sin((this.deg) * oneRad)) * this.speed;

        }
    }
}