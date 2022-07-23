function initResult() {
    let res = ""
    let i = 0
    for (let tank of tanks) {

        res += `       
         <div class="tank" id = c${i++}>
         <div class = "wrap_sc">
         <div class="score">
                <h1>${tank.score}</h1>
            </div>
            <div class="img">
                <img src=${tank.sprite.src} alt="#">
            </div>
</div>
            
            <div class="keys">
                                <img src=${tank.keysImg.src} alt="#">

            </div>
        </div>`
    }
    result.innerHTML = res
}
