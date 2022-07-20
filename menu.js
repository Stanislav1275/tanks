
let gameHolst = document.querySelector("#canvas");
let gameContainer = document.querySelector(".game")
let btn  = document.querySelector("#play");
let btns = document.querySelector("#btns")
let res = document.querySelector("#scoreBlock");
let back = document.querySelector("#back");
let pause = document.querySelector("#pause");
function toggle(){

    game.pause = false
    btns.classList.toggle("none")
    gameHolst.classList.toggle("none");
    res.classList.toggle("none");
    back.classList.toggle("none");
    pause.classList.toggle("none");

}
btn.onclick = toggle;
back.onclick = toggle;
pause.onclick = () => {
    game.pause = !game.pause

}
