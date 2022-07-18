class Game {
    constructor(context) {
        this.ctx = context;
    }

    move() {
        for (let tank of tanks)
            tank.Move()
    }

    drawWalls() {
        for (let wall of walls)
            wall.draw();
    }

    drawBullets() {
        for (let bullet of bullets) {
            bullet.draw()
        }
    }
    wallsTankCollision(box1, box2){//box1 - tank, box2 - wall

    }
    wallsBulletsCollision() {
        for (let wall of walls) {
            for (let bullet of bullets) {
                bullet.rebound(wall)//отскок от стены
            }
        }
    }

    drawTanks() {
        for (let tank of tanks) {
            tank.draw()
        }
    }

    StartGame() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.move();//сдвиг,поворот,стрельба
        this.drawWalls()//
        this.drawBullets()
        this.wallsBulletsCollision()//отскок пуль от стен
        this.drawTanks()
        // bullets.forEach((bullet, index) => {
        //     if (bullet.isDead()) {
        //         bullets.splice(index, 1)
        //     }
        // })
        requestAnimationFrame(() => {
            this.StartGame()
        })


    }


}

let game = new Game(ctx)
game.StartGame()