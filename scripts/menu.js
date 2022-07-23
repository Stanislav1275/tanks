let canvas = document.querySelector("#canvas")
var ctx = canvas.getContext("2d")
let result = document.querySelector("#scoreBlock")

let width = mapWidth * WALL_CONST;
let height = mapHeight * WALL_CONST;

canvas.width = width;
canvas.height = height;
result.style.width  = `${canvas.width}px`

let gold_wall = new Image()
let grand_wall = new Image()
let stone_wall = new Image()
let guard_wall = new Image()
let puton_wall = new Image()
let green_tank_img = new Image()
let yellow_tank_img = new Image()
let red_tank_img = new Image()
let blue_tank_img = new Image()
let keys_green = new Image()
let keys_yellow = new Image()
let keys_red = new Image()
let keys_blue = new Image()
let bullet = new Image()
let red_bull = new Image()
let green_bull = new Image()
let yellow_bull = new Image()
let blue_bull = new Image()
red_bull.src = "./sprites/red_bull.png"
blue_bull.src = "./sprites/blue_bull.png"
yellow_bull.src = "./sprites/yellow_bull.png"
green_bull.src = "./sprites/green_bull.png"
puton_wall.src = "./sprites/puton_wall.png"
guard_wall.src = "./sprites/guard_wall.png"
stone_wall.src = "./sprites/stone_wall.png"
grand_wall.src = "./sprites/grand_wall.png"
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
    constructor(keys, SPRITE, keysImg,bullSprite) {
        this.keys = keys;
        this.sprite = SPRITE;
        this.keysImg = keysImg;
        this.bullSprite = bullSprite;
    }
}




let btn  =document.querySelector(".playBtn");
let btns_cllections  =document.querySelectorAll(".playBtn");
console.log(btn)
let tanksCount = null;
let gameHolst = document.querySelector("#canvas");
let gameContainer = document.querySelector(".game")
let btns = document.querySelector("#btns")
let res = document.querySelector("#scoreBlock");
let back = document.querySelector("#back");
let pause = document.querySelector("#pause");
gameContainer.style.width = `${canvas.width}px`
gameContainer.style.height  = `${canvas.height}px`
function toggle(){
    btn.classList.toggle("none")
    game.pause = false
    btns.classList.toggle("none")
    gameHolst.classList.toggle("none");
    res.classList.toggle("none");
    back.classList.toggle("none");
    pause.classList.toggle("none");
    init()


}

let spawn

    for(let btn of btns_cllections){
        btn.onclick = (e) => {
            toggle()
            tanksCount = +e.currentTarget.id[1]
            console.log(tanksCount)
            spawn = getSpawnPosition(tanksCount)
            tanks = []
            bullets = []
            init()

        }
    }


back.onclick = toggle;
pause.onclick = () => {
    game.pause = !game.pause
    changeBtnPause(game.pause)

}
function changeBtnPause(isPause){
    let img = pause.querySelector("img")
    if(isPause){
        img.src = "./sprites/upaused1.png"
    }else img.src = "./sprites/pause1.png"
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
            }, green_tank_img,keys_green,green_bull),
            new TANK_CONSTRUCTOR({
                    up: "ArrowUp",
                    left: "ArrowLeft",
                    down: "ArrowDown",
                    right: "ArrowRight",
                    attack: "Space",
                }, red_tank_img,keys_red,red_bull
            ),
            new TANK_CONSTRUCTOR({
                up: "KeyI",
                left: "KeyJ",
                down: "KeyK",
                right: "KeyL",
                attack: "KeyY",

            }, yellow_tank_img,keys_yellow,yellow_bull),

            new TANK_CONSTRUCTOR({
                    up: "Numpad8",
                    left: "Numpad4",
                    down: "Numpad5",
                    right: "Numpad6",
                    attack: "Numpad0",
                }, blue_tank_img,keys_blue,blue_bull
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
                tanks[i] = new Tank(tankConstructor, spawn[i][0], spawn[i][1], Math.floor(Math.random())*360)
            }
}
function playSound(source,volume){
    let sound = new Audio()
    sound.src = source
    sound.volume = volume//0.1-10%

    sound.play()
}

