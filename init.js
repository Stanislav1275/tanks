let canvas = document.querySelector("#canvas")
var ctx = canvas.getContext("2d")
let result = document.querySelector("#scoreBlock")

canvas.width = 1200;
canvas.height = 800;
result.style.width  = `${canvas.width}px`
gameContainer.style.width = `${canvas.width}px`
gameContainer.style.height  = `${canvas.height}px`

let green_tank_img = new Image()
let yellow_tank_img = new Image()
let red_tank_img = new Image()
let blue_tank_img = new Image()
let bullet = new Image()
green_tank_img.src = "./sprites/tank_green.png";
yellow_tank_img.src = "./sprites/tank_yellow.png";
red_tank_img.src = "./sprites/tank_red.png"
blue_tank_img.src = "./sprites/tank_blue.png"
bullet.src = "./sprites/bullet.png"
let oneRad = Math.PI / 180
let expSprites = [

]
for(let i = 0; i< 16; i++){
    expSprites.push(new Image())
    expSprites[i].src = `./sprites/tile${i}.png`
}
let sources = {
    sprites: {
        tanks: [green_tank_img, yellow_tank_img, red_tank_img],
        bullet: bullet
    }
}
let animations = []
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
    new Wall(300,300, 100, 20),
    new Wall(0,0, canvas.width, 20),
    new Wall(0, 0, 20, canvas.height),
    new Wall(0, canvas.height-20, canvas.width, 20),
    new Wall(canvas.width-20, 0, 20, canvas.width),
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

        randomX = Math.abs(Math.floor((Math.random()*720)-40-48))
        randomY = Math.abs(Math.floor((Math.random()*520)-40-48))
        tankConstructor = TANKS_CONTRUCTORS[i];
        tanks.push(new Tank(tankConstructor, randomX, randomY, Math.floor(Math.random())*360))
    }
    let fon = ""//фоновая музыка
    // (function playSound(fon){
    //     let sound = new Audio()
    //     sound.src = fon
    //     sound.play()
    // }())

}
function playSound(source,volume){
    let sound = new Audio()
    sound.src = source
    sound.volume = volume//0.1-10%

    sound.play()
}
init()

