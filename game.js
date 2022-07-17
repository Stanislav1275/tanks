'use strict'
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
    bullets = []
}, 20000)