'use strict'
let requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

let canvas = document.querySelector("#canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth;
canvas.height = 600;
let green_tank_img = new Image()
let yellow_tank_img = new Image()
let red_tank_img = new Image()
let bullet = new Image()
green_tank_img.src = "./sprites/tank_standart.png";
yellow_tank_img.src = "./sprites/tank_yellow.png";
red_tank_img.src = "./sprites/tank_red.png"
bullet.src = "./sprites/bullet.png"
const oneRad = Math.PI / 180
const sources = {
    sprites: {
        tanks: [green_tank_img, yellow_tank_img, red_tank_img],
        bullet: bullet
    }
}

class TANK_CONSTRUCTOR {
    constructor(keys, SPRITE) {
        this.keys = keys;
        this.sprite = SPRITE;
    }

}

let TANKS_CONTRUCTORS = [];
let tanks = [];
let bullets = [];
let walls = [];
let currentSeconds = () => new Date() / 1000;

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
            dot = aPolygonVertex.x * perpendicularLine.x + aPolygonVertex.y * perpendicularLine.y;
            if (aMax == null || dot > aMax) {
                aMax = dot;
            }
            if (aMin == null || dot < aMin) {
                aMin = dot;
            }
        }
        for (let bPolygonVertex of polygonB.vertices) {
            dot = bPolygonVertex.x * perpendicularLine.x + bPolygonVertex.y * perpendicularLine.y;
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

function willCollide(box1, box2) {
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
    let bx1 = (Bx1 - Bp1) * Math.cos(0) - (By1 - Bq1) * Math.sin(0) + Bp1;
    let by1 = (Bx1 - Bp1) * Math.sin(0) + (By1 - Bq1) * Math.cos(0) + Bq1;
    //
    let bx2 = (Bx2 - Bp1) * Math.cos(0) - (By2 - Bq1) * Math.sin(0) + Bp1;
    let by2 = (Bx2 - Bp1) * Math.sin(0) + (By2 - Bq1) * Math.cos(0) + Bq1;
    //
    let bx3 = (Bx3 - Bp1) * Math.cos(0) - (By3 - Bq1) * Math.sin(0) + Bp1;
    ;
    let by3 = (Bx3 - Bp1) * Math.sin(0) + (By3 - Bq1) * Math.cos(0) + Bq1;
    //
    let bx4 = (Bx4 - Bp1) * Math.cos(0) - (By4 - Bq1) * Math.sin(0) + Bp1;
    let by4 = (Bx4 - Bp1) * Math.sin(0) + (By4 - Bq1) * Math.cos(0) + Bq1;
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
    let p1y1 = (x1 - p1) * Math.sin(theta) + (y1 - q1) * Math.cos(theta) + q1;
    //
    let p1x2 = (x2 - p1) * Math.cos(theta) - (y2 - q1) * Math.sin(theta) + p1;
    let p1y2 = (x2 - p1) * Math.sin(theta) + (y2 - q1) * Math.cos(theta) + q1;
    //
    let p1x3 = (x3 - p1) * Math.cos(theta) - (y3 - q1) * Math.sin(theta) + p1;

    let p1y3 = (x3 - p1) * Math.sin(theta) + (y3 - q1) * Math.cos(theta) + q1;
    //
    let p1x4 = (x4 - p1) * Math.cos(theta) - (y4 - q1) * Math.sin(theta) + p1;
    let p1y4 = (x4 - p1) * Math.sin(theta) + (y4 - q1) * Math.cos(theta) + q1;
    //+

    // ctx.strokeStyle = "black"
    //
    // ctx.beginPath()
    // ctx.moveTo(p1x1, p1y1)
    // ctx.lineTo(p1x2, p1y2)
    // ctx.lineTo(p1x4, p1y4)
    // ctx.lineTo(p1x3, p1y3)
    // ctx.lineTo(p1x1, p1y1)
    // ctx.stroke()
    // ctx.closePath()

    let polygonAVertices = [
        new XY(p1x1, p1y1),
        new XY(p1x2, p1y2),
        new XY(p1x4, p1y4),
        new XY(p1x3, p1y3)
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
        new XY(bx4, by4),
        new XY(bx3, by3)
    ]
    let polygonBEdges = [
        new XY(bx2 - bx1, by2 - by1),
        new XY(bx4 - bx2, by4 - by2),
        new XY(bx3 - bx4, by3 - by4),
        new XY(bx1 - bx3, by1 - by3)
    ]
    let polygonA = new Polygon(polygonAVertices, polygonAEdges);
    let polygonB = new Polygon(polygonBVertices, polygonBEdges);
    // console.log(polygonA,polygonB)
    if (SAT(polygonA, polygonB)) {
        return true
    }

    return false;
}

class XY {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Polygon {
    constructor(vertices, edges) {//вершины танка и вершины стены
        this.vertices = vertices;
        this.edges = edges;

    }

}

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

    VerticalMovement(bool) {
        if (bool) {
            this.x += +(Math.cos((this.deg) * oneRad))
            this.y += +(Math.sin((this.deg) * oneRad))
        } else {
            this.x -= +(Math.cos((this.deg) * oneRad))
            this.y -= +(Math.sin((this.deg) * oneRad))
        }

    }


    Move() {
        let actualDeg = this.deg
        if (this.attackPressed && this.canFire && !this.done) {
            this.done = true;
            let xDirection = +(this.x + this.w / 2 + Math.cos(actualDeg * oneRad))
            let yDirection = +(this.y + this.h / 2 + Math.sin(actualDeg * oneRad))
            bullets.push(new Bullet(xDirection, yDirection, this.bulletSpeed, actualDeg, this))
        }
        if (this.leftPressed) {
            this.deg -= 1;
        }
        if (this.rightPressed) {
            this.deg += 1;
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
                    console.log(1)

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


class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Bullet {
    constructor(x, y, speed, deg, owner) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.deg = deg;
        this.timeOfBirth = currentSeconds();
        this.w = 7;
        this.h = 7;
        this.speed = 2;
        this.owner = owner
    }

    draw() {
        ctx.drawImage(bullet, this.x, this.y, this.w, this.h)
        // ctx.fillRect(this.x,this.y,this.w,this.h)
        this.x += (this.speed * Math.cos(this.deg * oneRad));
        this.y += (this.speed * Math.sin(this.deg * oneRad));


    }
}

walls = [
    new Wall(300, 300, 100, 40),
    new Wall(0, 0, 40, canvas.height),
    new Wall(0, canvas.height - 40, canvas.width, 40),
    new Wall(canvas.width - 40, 0, 40, canvas.width),
]

function StartGame(tanks) {
    function move() {
        for (let tank of tanks)
            tank.Move()
    }
    function drawWalls() {
        for (let wall of walls)
            wall.draw();
    }
    function drawBullets() {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].draw()
            if (currentSeconds() - bullets[i].timeOfBirth > 7) {
                bullets.splice(i, 1)
            }

        }
    }
    function wallsBulletsCollision() {
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
    function drawTanks() {
        for (let tank of tanks)
            tank.draw()
    }
    function bulletsTanksCollision(){
        for(let tank of tanks){
            for (let i = 0; i < bullets.length; i++) {
                if (willCollide(tank, bullets[i]) && !tank.hasBeenHit && bullets[i].owner!=tank) {

                    bullets[i].owner.score++;
                    tank.hasBeenHit = true
                    bullets.splice(i, 1)

                }
            }
        }
    }
    move();
    drawTanks()
    drawWalls()
    drawBullets()
    wallsBulletsCollision()
    bulletsTanksCollision()
}


(function init() {
    TANKS_CONTRUCTORS =
        [
            new TANK_CONSTRUCTOR({
                up: "KeyW",
                left: "KeyA",
                down: "KeyS",
                right: "KeyD",
                attack: "KeyQ",
            }, green_tank_img),
            new TANK_CONSTRUCTOR({
                up: "KeyI",
                left: "KeyJ",
                down: "KeyK",
                right: "KeyL",
                attack: "KeyY",

            }, yellow_tank_img),
            new TANK_CONSTRUCTOR({
                    up: "ArrowUp",
                    left: "ArrowLeft",
                    down: "ArrowDown",
                    right: "ArrowRight",
                    attack: "ControlRight",
                }, red_tank_img
            ),
        ]
    let max = 100;
    let min = 10;
    let randomX = 100, randomY = 10;
    let tankConstructor = null;
    for (let i = 0; i < 3; i++) {

        randomX = Math.random() * (max - min) + min;
        randomY = Math.random() * (max - min) + min;
        tankConstructor = TANKS_CONTRUCTORS[i];
        tanks.push(new Tank(tankConstructor, randomX, randomY, 0))
        max += 50;
        min += 90;
    }

})()



window.addEventListener("keyup", (e) => {
    let code = e.code;
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                tank[key + 'Pressed'] = false;
                setTimeout( () => {
                    tank.done = false;

                },300)
            }
        }
    }
}, false)
window.addEventListener('keydown', (e) => {
    let code = e.code;
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                if ((key != 'attack') || (key === 'attack' && tank.canFire && !tank.hasBeenHit)) {
                    tank[key + 'Pressed'] = true;
                }
            }
        }
    }
}, false)

setInterval(() => {
        ctx.clearRect(0, 0, canvas.clientWidth, 600)
        StartGame(tanks)
    }
    , 10)
