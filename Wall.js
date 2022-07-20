class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }

    draw() {
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
