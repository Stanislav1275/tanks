let fon = document.querySelector("#holst")
let cxt = fon.getContext('2d')
console.log(1)

class Sprite{

    constructor(position, size = {width:50, height: 150}, velocity,color = 'red') {
        this.position = position
        this.size = size;
        this.velocity = velocity;
        this.color = color
    }
    Draw(){
        cxt.fillStyle = this.color
        cxt.fillRect(this.position.x, this.position.y, this.size.width,this.size.height)
    }
    Update(){
        this.Draw()

    }
    Move(keydown){
        let offset = null;
        switch (keydown){
            case 'w':{
                this.position.y -= this.velocity.y
                break
            }
            case 'a':{
                this.position.x -= this.velocity.x
                break

            }
            case 's':{
                this.position.y += this.velocity.y
                break

            }
            case 'd':{
                this.position.x += this.velocity.x
                break

            }
        }
    }
}
const Person = new Sprite({
    x:0,y:0
}, {
    width:25,height:50
}, {
    x:5,y:2
},'red')
window.addEventListener('keydown', (e) => {
    if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'){
        console.log(e.key)
        Person.Move(e.key)
    }

    console.log(e.key)
})
function animate(){
    window.requestAnimationFrame(animate)
    // c.fillStyle = 'black'
    Person.Update()

    c.clearRect(0,0,fon.width, fon.height)
    Player.Update()
}
animate()
console.log(Person)