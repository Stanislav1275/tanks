class Wall {
    constructor(x, y, w, h, health, isConstant = false) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;

        this.health = health;

        this.axisOnBulletCollision = this.axisChoose()
        this.collisionStepW = this.w / this.health
        this.collisionStepH = this.h / this.health

        this.isCollideable = true;
        this.isConstant = isConstant;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    axisChoose(){
        if (this.h > this.w) return "w"
        if (this.w > this.h) return "h"
        return "meh"
    }

    onCollide(){
        if (!this.isConstant) {
            this.health -= 1;
            console.log(`health changed to ${this.health}`)
            switch(this.axisOnBulletCollision)
            {
                case "h": this.h -= this.collisionStepH;
                    //console.log(`Wall & bullet collision detected! Height changed to ${this.h} at offset: ${this.x}, ${this.y}`);
                    break;
                case "w": this.w -= this.collisionStepW;
                    //console.log(`Wall & bullet collision detected! Width changed to ${this.w} at offset: ${this.x}, ${this.y}`);
                    break;
                default: this.w -= this.collisionStepW;
                    this.h -= this.collisionStepH;
                    console.log(`Wall & bullet collision detected! Yoo, rare case! Square! Height and Width changed to ${this.h} and ${this.w} at offset: ${this.x}, ${this.y}`);
                    break;
            }
            if (!this.health) {
                this.isCollideable = !this.isCollideable;
                console.log(`Wall at offset ${this.x}, ${this.y} is no longer exist`)
            }
        }
    }
}
