
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
const orientation = ['S','W','N','E']
let interval

const audios = {
    fridge: 'audioSource/fridge.mp3',
    keys: 'audioSource/keys.mp3',
    hit: 'audioSource/auch.mp3',
    window: 'audioSource/windowWind.mp3',
    tv: 'audioSource/tvChannel.mp3',
    table: 'audioSource/tableForkSound.mp3',
    sink: 'audioSource/sink.mp3',
    microwave: 'audioSource/microwave.mp3',
    door: 'audioSource/door.mp3',
    desition: 'audioSource/desitionMaking.mp3',
    couch: 'audioSource/couchChips.mp3',
    computer: 'audioSource/computerKeyboard.mp3',
    books: 'audioSource/booksFlippingPages.mp3',
    drawer: 'audioSource/drawerCutlery.mp3',
    kitchen: 'audioSource/kitchen.mp3'
}

const images = {
    bg: 'Images/bg-siego.png',
    romLeft: 'Images/rommie-sprite/rommie-leftW.png',
    romRight: 'Images/rommie-sprite/rommie-rightE.png',
    romBack: 'Images/rommie-sprite/rommie-backS.png',
    romFront: 'Images/rommie-sprite/rommie-frontN.png',
    siegoBack: 'Images/siego-sprites/siego-backS.png',
    siegoLeft: 'Images/siego-sprites/siego-leftW.png',
    siegoRight: 'Images/siego-sprites/siego-rightE.png',
    siegoFront: 'Images/siego-sprites/siego_frontN.png'
}

class Background{
    constructor() {
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.img = new Image()
        this.img.src = images.bg
        this.img.onload = () => {this.draw()}
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Siego{
    constructor(){
        this.x = 100
        this.y = 50
        this.sx = 0
        this.sy = 0
        this.width = 60
        this.height = 50
        this.orientation = 'S'
        this.imgFront = new Image()
        this.imgFront.src = images.siegoFront
        this.imgBack = new Image()
        this.imgBack.src = images.siegoBack
        this.imgRight = new Image()
        this.imgRight.src = images.siegoRight
        this.imgLeft = new Image()
        this.imgLeft.src = images.siegoLeft
        this.imgBack.onload = () => {this.draw()}
    }

    draw(){
        if(this.sx >= 642) this.sx = 0
        switch(this.orientation){
            case 'N':
                ctx.drawImage(this.imgFront, this.sx, this.sy, 214, 120, this.x, this.y, this.width, this.height)
                break
            case 'E':
                ctx.drawImage(this.imgRight, this.sx, this.sy, this.width, this.height)
                break
            case 'W':
                ctx.drawImage(this.imgLeft, this.sx, this.sy, this.width, this.height)
                break
            case 'S':
                ctx.drawImage(this.imgBack, this.sx, this.sy, 214, 120, this.x, this.y, this.width, this.height)
                break
           }
    }

    move(){
        this.sx += 214
    }

    goForward(orientation){
        switch(this.orientation){
            case 'N':
                this.y -= 10
                this.move()
                break
            case 'E':
                this.x += 10
                this.move()
                break
            case 'W':
                this.x -= 10
                this.move()
                break
            case 'S':
                this.y += 10
                this.move()
                break
            default: console.error('orientation is undified, perhapss')
        }
    }

    goBack(){
        switch (this.orientation){
            case 'N':
                this.orientation = 'S'
                break
            case 'S':
                this.orientation = 'N'
                break
            case 'E':
                this.draw(this.imgLeft)
                break
            case 'W':
                this.draw(this.imgRight)
                break
            default: console.error('orientation is undifined, perhaps')
        }

    }

    checkSound(orientation){
        //section1
        switch (this.orientation){
            case 'N':
                if(x>0 && x<80){

                }
                this.orientation = 'S'
                break
            case 'S':
                this.orientation = 'N'
                break
            case 'E':
                this.draw(this.imgLeft)
                break
            case 'W':
                this.draw(this.imgRight)
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

}

const bg = new Background()
const siego = new Siego()

function update(){
    bg.draw()
    siego.draw()
}


//Funcion para separar audio
function panning(audio, panSide){ //panSide needs number
    let audioCtx = new AudioContext()
    let htmlAudio = document.createElement('audio')
    htmlAudio.src = `${audio}`
    let source = audioCtx.createMediaElementSource(htmlAudio)
    let panNode = audioCtx.createStereoPanner()
    audioCtx.destination
    source.connect(panNode)
    panNode.connect(audioCtx.destination)
    panNode.pan.value = panSide
    console.log(panNode.pan)
    htmlAudio.play()
}

function startGame(){
    if(interval) return
    interval = setInterval(update, 1000/40)
}

//Para el sonido puedes borrar esto
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame()
    }
}

document.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 40:
            siego.goBack()
            break
        case 38:
            siego.goForward(siego.orientation)
            break
        default: console.error('Key not valid')
    }
  })