
function initResult() {
    let res = ""
    for (let tank of tanks) {
            res += `         <div class="tank">
            <div class="score">
                <h1>${tank.score}</h1>
            </div>
            <div class="img">
                <img src=${tank.sprite.src} alt="#">
            </div>
        </div>`
        // }


    }
    result.innerHTML = res
}
