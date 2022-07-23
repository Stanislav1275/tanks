let canvas = document.querySelector("#canvas")
var ctx = canvas.getContext("2d")
let result = document.querySelector("#scoreBlock")

let width = mapWidth * WALL_CONST;
let height = mapHeight * WALL_CONST;

canvas.width = width;
canvas.height = height;
result.style.width  = `${canvas.width}px`
gameContainer.style.width = `${canvas.width}px`
gameContainer.style.height  = `${canvas.height}px`
let gold_wall = new Image()
let green_tank_img = new Image()
let yellow_tank_img = new Image()
let red_tank_img = new Image()
let blue_tank_img = new Image()
let keys_green = new Image()
let keys_yellow = new Image()
let keys_red = new Image()
let keys_blue = new Image()
let bullet = new Image()
gold_wall.src= "./sprites/gold_wall.png"
keys_green.src = "./sprites/keys_green.png" ;
keys_yellow.src = "./sprites/keys_yellow.png" ;
keys_red.src = "./sprites/keys_red.png" ;
keys_blue.src = "./sprites/blue_keys.png";
green_tank_img.src = "./sprites/tank_green.png";
yellow_tank_img.src = "./sprites/tank_yellow.png";
red_tank_img.src = "./sprites/tank_red.png";
blue_tank_img.src = "./sprites/tank_blue.png";
bullet.src = "./sprites/bullet.png";
let oneRad = Math.PI / 180;
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
walls = getMap();
/*[
    new Wall(300,300, 100, 20),
    new Wall(0,0, canvas.width, 20),
    new Wall(0, 0, 20, canvas.height),
    new Wall(0, canvas.height-20, canvas.width, 20),
    new Wall(canvas.width-20, 0, 20, canvas.width),
]*/
class TANK_CONSTRUCTOR {
    constructor(keys, SPRITE, keysImg) {
        this.keys = keys;
        this.sprite = SPRITE;
        this.keysImg = keysImg
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
            }, green_tank_img,keys_green),
            new TANK_CONSTRUCTOR({
                up: "KeyI",
                left: "KeyJ",
                down: "KeyK",
                right: "KeyL",
                attack: "KeyY",

            }, yellow_tank_img,keys_yellow),
            new TANK_CONSTRUCTOR({
                    up: "ArrowUp",
                    left: "ArrowLeft",
                    down: "ArrowDown",
                    right: "ArrowRight",
                    attack: "ControlRight",
                }, red_tank_img,keys_red
            ),
            new TANK_CONSTRUCTOR({
                    up: "Numpad8",
                    left: "Numpad4",
                    down: "Numpad5",
                    right: "Numpad6",
                    attack: "Numpad0",
                }, blue_tank_img,keys_blue
            ),
        ]
    //let randomX = 100, randomY = 10;
    let tankConstructor = null;
    // let spawn;
    if(tanksCount!=null)
    // spawn = getSpawnPosition(tanksCount)

    if(tanksCount!=null)
    for (let i = 0; i < tanksCount; i++) {
        tankConstructor = TANKS_CONTRUCTORS[i];
        tanks.push(new Tank(tankConstructor, spawn[i][0], spawn[i][1], Math.floor(Math.random())*360))
    }
}
function playSound(source,volume){
    let sound = new Audio()
    sound.src = source
    sound.volume = volume//0.1-10%

    sound.play()
}
init()

