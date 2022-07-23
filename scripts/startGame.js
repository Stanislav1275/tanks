class Game {
    constructor(context) {
        this.ctx = context;
        this.CountHasBeenHit = 0
        this.pause = true
    }
    drawExp(){//отрисовать взрыв
        let i = -1;
        for(let animation of animations){
            i++
            if(animation.type === 1){
                if(expSprites[animation.startIt]!=undefined)
                    this.ctx.drawImage(expSprites[animation.startIt],animation.x,animation.y)
            }
            animation.animationDelay++
            if(animation.animationDelay == 8){
                if(animation.startIt<16)
                    animation.startIt++
                animation.animationDelay=0

            }
            if(animation.startIt >= 16){
                animations.splice(i,1)
            }
        }
    }//animation exploses
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
                            bullet.deg = -bullet.deg + 180;
                        } else {
                            bullet.deg = -bullet.deg + 360;
                        }
                    }
                    wall.onCollide();
                }
            }
        }
    }
    bulletsTanksCollision(){
        let tankIndex
        for(let tank of tanks){
            tankIndex= 0
            for (let i = 0; i < bullets.length; i++) {
                if (willCollide(tank, bullets[i]) && !tank.hasBeenHit && bullets[i]?.owner!=tank) {
                    animations.push(new Animation(1,bullets[i].x-tank.w,bullets[i].y-tank.h))
                    playSound("./sounds/explosion.mp3",0.1)
                    // bullets[i].owner.bulletsCount--;
                    bullets[i].owner.score++;
                    tank.hasBeenHit = true;
                    bullets[i].owner.bulletsCount--;
                    bullets.splice(i, 1);
                    // bullets[i].owner.bulletsCount--
                    // drawScore(tanks)
                    // if(tankIndex == tanks.length-1){
                    //     this.playerHitTime = currentSeconds()
                    // }
                }
            }
            tankIndex++
        }
    }

    move() {
        for (let tank of tanks)
            tank.Move()
    }//управление танками и направлением пуль

    willCollideWithBoxes(box, boxes){
        let hasCollided =false;
        for(let i =0; i < boxes.length;i++){
            if(willCollide(box, boxes[i]))return true
        }
        return false
    }
    drawWalls() {
        for (let wall of walls) if (wall.isCollideable) wall.draw();
    }
    FindHasBeenHitCount(){
        let hasBeenHitCount = 0
        for(let tank of tanks){
            if(tank.hasBeenHit)hasBeenHitCount++
        }
        this.CountHasBeenHit = hasBeenHitCount
    }
    resetGame(){
        this.FindHasBeenHitCount()
        if(this.CountHasBeenHit == tanks.length-1){
            this.pause = true
            setTimeout( () => {
                // location.reload()
                bullets = []
                init()
                let spawn = getSpawnPosition(tanks.length);
                let ctr = 0;
                for(let tank of tanks){
                    tank.x = spawn[ctr][0]
                    tank.y = spawn[ctr++][1]
                    tank.deg = 0
                    walls = getMap(getRandomInt(150) + 180);
                    tank.hasBeenHit = false
                    animations = []
                    this.pause = false
                }
            },1000)


            // }
        }

    }
    drawBullets() {
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].draw()
            if(!this.pause)
                if (currentSeconds() - bullets[i].timeOfBirth > 8) {
                    //console.log(currentSeconds() + " sec")
                    bullets.splice(i, 1)
                    // bullets[i].owner.bulletsCount--;

                }


        }
    }
    drawTanks() {
        for (let tank of tanks) {
            tank.draw()
        }
    }

    StartGame() {
        if(tanksCount !=null){
            if(!this.pause){
                this.ctx.clearRect(0, 0, canvas.width, canvas.height)
                this.resetGame()
                this.move();
                this.drawBullets()
                this.drawExp()
                this.drawTanks()
                this.drawWalls()
                initResult()
                this.wallsBulletsCollision()
                this.bulletsTanksCollision()
            }
            else {
            }
        }


        requestAnimationFrame(() => {
            this.StartGame()
        })


    }


}

let game = new Game(ctx)
// setInterval( () => {
    game.StartGame()

// },10)
