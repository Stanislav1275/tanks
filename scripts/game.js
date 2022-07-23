'use strict'
window.addEventListener("keyup", (e) => {
    let code = e.code;
    // e.stopPropagation()
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                if(key === 'attack' /*&& tank.bulletsCount<=6*/) {
                    // if(tank.bulletsCount<5)
                    // tank.bulletsCount++
                }
                tank[key + 'Pressed'] = false;
                tank.done = false;
            }
        }
    }
}, false)
window.addEventListener('keydown', (e) => {
    // e.stopPropagation()
    let code = e.code;
    for (let tank of tanks) {
        for (let [key, value] of Object.entries(tank.keys)) {
            if (e.code === value) {
                if ((key != 'attack') || (key === 'attack' && tank.canFire) && !tank.hasBeenHit) {
                    tank[key + 'Pressed'] = true;
                }
            }
        }
    }
}, false)
