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
    wallsTankCollision(){

    }
    wallsBulletsCollision() {
        for (let wall of walls) {
            for (let bullet of bullets) {
                if ((bullet.x >= wall.x) && (bullet.x + bullet.w <= wall.x + wall.w) && (bullet.y >= wall.y) && (bullet.y + bullet.h <= wall.y + wall.h)) {
                    let bulletHalfW = bullet.w / 2;
                    let bulletHalfH = bullet.h / 2;
                    let wallHalfW = wall.w / 2;
                    let wallHalfH = wall.h / 2;
                    let bulletCenterX = bullet.x + bulletHalfW;
                    let bulletCenterY = bullet.y + bulletHalfH;
                    let wallCenterX = wall.x + wall.w / 2;
                    let wallCenterY = wall.y + wall.h / 2;
                    let diffX = bulletCenterX - wallCenterX;
                    let diffY = bulletCenterY - wallCenterY;
                    let minXDist = bulletHalfW + wallHalfW;
                    let minYDist = bulletHalfH + wallHalfH;
                    let depthX = (diffX > 0) ? minXDist - diffX : -minXDist - diffX;
                    let depthY = (diffY > 0) ? minYDist - diffY : -minYDist - diffY;
                    if (depthX != 0 && depthY != 0) {
                        if (Math.abs(depthX) < Math.abs(depthY)) {
                            bullet.deg = -bullet.deg  + 180;
                        } else {
                            bullet.deg = -bullet.deg + 360;
                        }
                    }
                }
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
        this.move();
        this.drawWalls()
        this.drawBullets()
        this.wallsBulletsCollision()
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