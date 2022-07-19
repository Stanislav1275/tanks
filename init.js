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
let oneRad = Math.PI / 180
let sources = {
    sprites: {
        tanks: [green_tank_img, yellow_tank_img, red_tank_img],
        bullet: bullet
    }
}
let requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

let TANKS_CONTRUCTORS = [];
let tanks = [];
let bullets = [];
let walls = [];
let currentSeconds = () => new Date() / 1000;
walls = [
    new Wall(300,300, 100, 40),
    new Wall(0, 0, 40, canvas.height),
    new Wall(0, canvas.height-40, canvas.width, 40),
    new Wall(canvas.width-40, 0, 40, canvas.width),
]
class TANK_CONSTRUCTOR {
    constructor(keys, SPRITE) {
        this.keys = keys;
        this.sprite = SPRITE;
    }
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
        tanks.push(new Tank(tankConstructor, max, min, 0))
        max += 50;
        min += 90;
    }

}

init()