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
    rebound(box1, box2) {//cтолкнулся ли танк с конкретным объектом
        let bTheta = 0*Math.PI/180;
        let Bp1 = box2.x + box2.w / 2;
        let Bq1 = box2.y + box2.h / 2;

        let Bx1 = box2.x;
        let By1 = box2.y;
        //
        let Bx2 = box2.x + box2.w;
        let By2 = box2.y;
        //
        let Bx3 = box2.x;
        let By3 = box2.y + box2.h;
        //
        let Bx4 = box2.x + box2.w;
        let By4 = box2.y + box2.h;
        //
        let bx1 = ((Bx1 - Bp1) * 1 - (By1 - Bq1) * 0 )+ Bp1;
        let by1 = ((Bx1 - Bp1) * 1 + (By1 - Bq1) * 0 )+ Bq1;
        //
        let bx2 = ((Bx2 - Bp1) * 1 - (By2 - Bq1) * 0 )+ Bp1;
        let by2 = ((Bx2 - Bp1) * 1 + (By2 - Bq1) * 0 )+ Bq1;
        //
        let bx3 = ((Bx3 - Bp1) * 1 - (By3 - Bq1) * 0 )+ Bp1;
        let by3 = ((Bx3 - Bp1) * 1 + (By3 - Bq1) * 0 )+ Bq1;
        //
        let bx4 = ((Bx4 - Bp1) * 1 - (By4 - Bq1) * 0 )+ Bp1;
        let by4 = ((Bx4 - Bp1) * 1 + (By4 - Bq1) * 0 )+ Bq1;
        ///
        let theta = (this.deg)* oneRad
        let p1 = this.x + this.w / 2;
        let q1 = this.y + this.h / 2;

        let x1 = this.x;
        let y1 = this.y;
        //
        let x3 = this.x + this.w;
        let y3 = this.y;
        //
        let x2 = this.x;
        let y2 = this.y + this.h;
        //
        let x4 = this.x + this.w;
        let y4 = this.y + this.h;
        //
        let p1x1 = (x1 - p1) * Math.cos(theta) + (y1 - q1) * Math.sin(theta) + p1;
        let p1y1 = (x1 - p1) * Math.cos(theta) - (y1 - q1) * Math.sin(theta) + q1;
        //
        let p1x2 = (x2 - p1) * Math.cos(theta) + (y2 - q1) * Math.sin(theta) + p1;
        let p1y2 = (x2 - p1) * Math.cos(theta) - (y2- q1) * Math.sin(theta) + q1;
        //
        let p1x3 = (x3 - p1) * Math.cos(theta) + (y3 - q1) * Math.sin(theta) + p1;
        let p1y3 = (x3 -p1) * Math.cos(theta) - (y3 - q1) * Math.sin(theta) + q1;
        //
        let p1x4 = (x4 - p1) * Math.cos(theta) + (y4 - q1) * Math.sin(theta) + p1;
        let p1y4 = (x4 - p1) * Math.cos(theta) - (y4 - q1) * Math.sin(theta) + q1;
        //+
        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.moveTo(p1x1,p1y1);
        ctx.lineTo(p1x2,p1y2);
        ctx.lineTo(p1x4,p1y4);
        ctx.lineTo(p1x3,p1y3);
        ctx.lineTo(p1x1,p1y1);
        ctx.stroke()
        ctx.closePath()
        // let polygonAVertices = [
        //     new XY(p1x1, p1y1),
        //     new XY(p1x2, p1y2),
        //     new XY(p1x3, p1y3),
        //     new XY(p1x4, p1y4)
        // ]
        // let polygonAEdges = [
        //     new XY(p1x2 - p1x1, p1y2 - p1y1),
        //     new XY(p1x4 - p1x2, p1y4 - p1y2),
        //     new XY(p1x3 - p1x4, p1y3 - p1y4),
        //     new XY(p1x1 - p1x3, p1y1 - p1y3)
        // ]
        //
        // let polygonBVertices = [
        //     new XY(bx1, by1),
        //     new XY(bx2, by2),
        //     new XY(bx3, by3),
        //     new XY(bx4, by4)
        // ]
        // let polygonBEdges = [
        //     new XY(bx2 - bx1, by2 - by1),
        //     new XY(bx4 - bx2, by4 - by2),
        //     new XY(bx3 - bx4, by3 - by4),
        //     new XY(bx1 - bx3, by1 - by3)
        // ]
        // let polygonA = new Polygon(polygonAVertices, polygonAEdges);
        // let polygonB = new Polygon(polygonBVertices, polygonBEdges);
        // if (this.SAT(polygonA, polygonB)) {
        //     console.log(1)
        //     return true
        // }
        //
        // return false;
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
            let t = new Tank(undefined,this.x + Math.cos(this.deg*oneRad),this.y + Math.sin(this.deg*oneRad),this.deg)
            let isC = false;
            // for(let wall of walls){
            //     if(game.rebound(t, ))
            // }
            this.x += +(Math.cos((this.deg) * oneRad)) * this.speed
            this.y += +(Math.sin((this.deg) * oneRad)) * this.speed


        }
        if (this.downPressed) {

            this.x -= (Math.cos((this.deg) * oneRad)) * this.speed;
            this.y -= (Math.sin((this.deg) * oneRad)) * this.speed;

        }
    }
}