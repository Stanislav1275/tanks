class Game {
    constructor(context) {
        this.ctx = context;
    }

    wallsBulletsCollision() {
        for (let wall of walls) {
            for (let bullet of bullets) {
                if ((bullet.x >= wall.x) && (bullet.x + bullet.w <= wall.x + wall.w) && (bullet.y >= wall.y) && (bullet.y + bullet.h <= wall.y + wall.h)) {
                    let bulletHalfW = bullet.w / 2;
                    let bulletHalfH = bullet.h / 2;
                    let wallHalfW = wall.w / 2;
                    let wallHalfH = wall.h / 2;
                    let bulletCenterX = bullet.x + bulletHalfW;
                    let bulletCenterY = bullet.y + bulletHalfH;
                    let wallCenterX = wall.x + wall.w / 2;
                    let wallCenterY = wall.y + wall.h / 2;
                    let diffX = bulletCenterX - wallCenterX;
                    let diffY = bulletCenterY - wallCenterY;
                    let minXDist = bulletHalfW + wallHalfW;
                    let minYDist = bulletHalfH + wallHalfH;
                    let depthX = (diffX > 0) ? minXDist - diffX : -minXDist - diffX;
                    let depthY = (diffY > 0) ? minYDist - diffY : -minYDist - diffY;
                    if (depthX != 0 && depthY != 0) {
                        if (Math.abs(depthX) < Math.abs(depthY)) {
                            bullet.deg = -bullet.deg + 180;
                        } else {
                            bullet.deg = -bullet.deg + 360;
                        }
                    }
                }
            }
        }
    }


    rebound(box1, box2) {//cтолкнулся ли танк с конкретным объектом
        let bTheta = 0 * Math.PI / 180;

        function SAT(polygonA, polygonB) {
            let perpendicularLine = null;
            let dot = 0;
            let perpendicularStack = [];
            let aMin = null;
            let aMax = null;
            let bMin = null;
            let bMax = null;
            // for (let aPolygonVertex of polygonA.edges) {
            //     perpendicularLine = new XY(-aPolygonVertex.y, aPolygonVertex.x);
            //     perpendicularStack.push(perpendicularLine);
            // }
            for (let i = 0; i < polygonA.edges.length; i++) {
                perpendicularLine = new XY(-polygonA.edges[i].y, polygonA.edges[i].x);
                perpendicularStack.push(perpendicularLine);
            }
            // for (let bPolygonVertex of polygonB.edges) {
            //
            //     perpendicularLine = new XY(-bPolygonVertex.y, bPolygonVertex.x);
            //     perpendicularStack.push(perpendicularLine);
            // }
            for (let i = 0; i < polygonB.edges.length; i++) {
                perpendicularLine = new XY(-polygonB.edges[i].y, polygonB.edges[i].x);
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
            console.log(1)
            return true;

        }

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
        let bx1 = (Bx1 - Bp1) + Bp1;
        let by1 = (Bx1 - Bp1) + Bq1;
        //
        let bx2 = (Bx2 - Bp1) + Bp1;
        let by2 = (Bx2 - Bp1) + Bq1;
        //
        let bx3 = (Bx3 - Bp1) + Bp1;
        let by3 = (Bx3 - Bp1) + Bq1;
        //
        let bx4 = (Bx4 - Bp1) + Bp1;
        let by4 = (Bx4 - Bp1) + Bq1;
        ///
        let theta = (box1.deg) * oneRad
        let p1 = box1.x + box1.w / 2;
        let q1 = box1.y + box1.h / 2;

        let x1 = box1.x;
        let y1 = box1.y;
        //
        let x2 = box1.x + box1.w;
        let y2 = box1.y;
        //
        let x3 = box1.x;
        let y3 = box1.y + box1.h;
        //
        let x4 = box1.x + box1.w;
        let y4 = box1.y + box1.h;
        //
        let p1x1 = (x1 - p1) * Math.cos(theta) - (y1 - q1) * Math.sin(theta) + p1;
        let p1y1 = (x1 - p1) * Math.cos(theta) + (y1 - q1) * Math.sin(theta) + q1;

        //
        let p1x2 = (x2 - p1) * Math.cos(theta) - (y2 - q1) * Math.sin(theta) + p1;

        let p1y2 = (x2 - p1) * Math.cos(theta) + (y2 - q1) * Math.sin(theta) + q1;
        //

        let p1x3 = (x3 - p1) * Math.cos(theta) - (y3 - q1) * Math.sin(theta) + p1;
        let p1y3 = (x3 - p1) * Math.cos(theta) + (y3 - q1) * Math.sin(theta) + q1;
        //

        let p1x4 = (x4 - p1) * Math.cos(theta) - (y4 - q1) * Math.sin(theta) + p1;
        let p1y4 = (x4 - p1) * Math.cos(theta) + (y4 - q1) * Math.sin(theta) + q1;
        //+
        console.log(x4, p1x4)
        console.log(y4, p1y4)

        this.ctx.strokeStyle = "black"

        this.ctx.beginPath()
        this.ctx.moveTo(p1x1, p1y1)
        this.ctx.lineTo(p1x2, p1y2)
        this.ctx.lineTo(p1x4, p1y4)
        this.ctx.lineTo(p1x3, p1y3)
        this.ctx.lineTo(p1x1, p1y1)
        this.ctx.stroke()
        this.ctx.closePath()

        let polygonAVertices = [
            new XY(p1x1, p1y1),
            new XY(p1x2, p1y2),
            new XY(p1x3, p1y3),
            new XY(p1x4, p1y4)
        ]
        let polygonAEdges = [
            new XY(p1x2 - p1x1, p1y2 - p1y1),
            new XY(p1x4 - p1x2, p1y4 - p1y2),
            new XY(p1x3 - p1x4, p1y3 - p1y4),
            new XY(p1x1 - p1x3, p1y1 - p1y3)
        ]

        let polygonBVertices = [
            new XY(bx1, by1),
            new XY(bx2, by2),
            new XY(bx3, by3),
            new XY(bx4, by4)
        ]
        let polygonBEdges = [
            new XY(bx2 - bx1, by2 - by1),
            new XY(bx4 - bx2, by4 - by2),
            new XY(bx3 - bx4, by3 - by4),
            new XY(bx1 - bx3, by1 - by3)
        ]
        let polygonA = new Polygon(polygonAVertices, polygonAEdges);
        let polygonB = new Polygon(polygonBVertices, polygonBEdges);
        console.log(polygonA,polygonB)
        if (SAT(polygonA, polygonB)) {
            return true
        }

        return false;
    }

    move() {
        for (let tank of tanks)
            tank.Move()
    }

    drawWalls() {
        for (let wall of walls)
            wall.draw();
    }

    drawBullets() {
        for (let bullet of bullets) {
            bullet.draw()
        }
    }

    drawTanks() {
        for (let tank of tanks) {
            tank.draw()
        }
    }

    StartGame() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.move();//сдвиг,поворот,стрельба
        this.drawBullets();
        this.drawWalls()

        this.wallsBulletsCollision();
        this.drawTanks();

        // this.rebound(walls[0],tanks[0])
        // for(let wall of walls){
        //     if(this.rebound(tanks[0], wall)) console.log(1)
        //
        // }
        requestAnimationFrame(() => {
            this.StartGame()
        })


    }


}

let game = new Game(ctx)
game.StartGame()