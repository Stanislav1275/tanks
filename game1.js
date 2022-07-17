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
    }

    drawWithRot() {
        let rad = oneRad * this.deg
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate(rad)
        ctx.drawImage(this.sprite, -this.w / 2, -this.h / 2, this.w, this.h)
        ctx.rotate(-rad)
        ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));
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
            let xDirection = +(this.x + this.w / 2+Math.cos(actualDeg * oneRad))
            let yDirection = +(this.y + this.h / 2+Math.sin(actualDeg * oneRad))
            bullets.push(new Bullet(xDirection, yDirection, this.bulletSpeed, actualDeg))
        }
        if (this.leftPressed) {
            this.deg -= 1;
            actualDeg = this.deg
        }
        if (this.rightPressed) {
            this.deg += 1;
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

class Gun {

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
    constructor(x, y, speed, deg) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.deg = deg;
        this.timeOfBirth = currentSeconds();
        this.w = 7;
        this.h = 7;
    }

    draw() {
        ctx.drawImage(bullet, this.x, this.y, 7, 7)
        this.x += (this.speed * Math.cos(this.deg * oneRad));
        this.y += (this.speed * Math.sin(this.deg * oneRad));
    }

    get isDead() {
        return (new Date() / 1000 - this.timeOfBirth) >= 4
    }
}

Bullet.prototype.speed = 2;
walls = [
    new Wall(10, 0, 10, canvas.clientHeight),
    new Wall(10, 0, canvas.width, 20),
    new Wall(window.innerWidth - 20, 0, 20, canvas.height),
    new Wall(10, canvas.clientHeight - 20, canvas.width, 20),
    new Wall(10, canvas.clientHeight / 2 - 20, canvas.width / 3, 20),
    new Wall(canvas.clientWidth / 2, canvas.clientHeight / 3, 20, canvas.height / 2 - 20),
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
        for (let bullet of bullets) {
            bullet.draw()

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
                        console.log(depthX,depthY)
                        if (Math.abs(depthX) < Math.abs(depthY)) {
                            bullet.deg = bullet.deg * (-1)+ 180;
                        } else {
                            bullet.deg = bullet.deg * (-1) + 360;

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

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    move();
    drawBullets()
    drawWalls()
    wallsBulletsCollision()
    drawTanks()

    // bullets.forEach((bullet, index) => {
    //     if (bullet.isDead()) {
    //         bullets.splice(index, 1)
    //     }
    // })

}

function init() {
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

}

Tank.prototype.w = 48;
Tank.prototype.velocity = 1.2;
Tank.prototype.speed = 1.2;
Tank.prototype.h = 32;
init()

window.addEventListener("keyup", (e) => {
    let code = e.code;
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                tank[key + 'Pressed'] = false;
                tank.done = false;
            }
        }
    }
}, false)
window.addEventListener('keydown', (e) => {
    let code = e.code;
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                if ((key != 'attack') || (key === 'attack' && tank.canFire)) {
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
setInterval(() => {
    bullets = []
}, 20000)