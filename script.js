let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
const orientation = ['S','W','N','E']
let interval
let soundArr = []
frames = 0

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
    stove: 'audioSource/kitchen.mp3'
}

const images = {
    gameOver: 'Images/gameOver.jpeg',
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

    drawGameOver(){
        ctx.drawImage(images.gameOver, canvas.width, canvas.height)
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Siego{
    constructor(){
        this.lives = 3
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

    takeDamage(){
        this.lives > 0 ? this.lives-- : gameOver()
    }

    goForward(orientation){
        if(this.x <= 80 || this.y >= 290) {
            this.x += 5
            this.y -= 5
            //takeDamage()
        } else {
             switch(this.orientation){
                case 'N':
                    this.y -= 10
                    this.move()
                    this.checkSound()
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
                    this.checkSound()
                    break
                default: console.error('orientation is undified, perhapss')
            }
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

    checkSound(){ //Checa que section esta el jugador
        if(this.x > 80 && this.x <= 180){
            this.sectionOne()
        }
    }

    playSound(audio, direction){
        soundArr.forEach(sound => sound.pause())
        panning(audio, direction)
    }

    sectionOne(){ //x de 80 a 180, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                if (this.y > 0 && this.y < 85){
                    this.playSound(audios.sink, -1) //left
                } else if(this.y >= 85 && this.y < 185){
                    this.playSound(audios.stove, -1) //left
                } else if(this.y >= 185 && this.y < 240){
                    this.playSound(audios.microwave, -1) //left
                } else if(this.y >= 240 && this.y < 330){
                    this.playSound(audios.fridge, -1) //left
                }
                break
            case 'S':
                if (this.y > 0 && this.y < 85){
                    this.playSound(audios.sink, 1)//right
                } else if(this.y >= 85 && this.y < 185){
                    this.playSound(audios.stove, 1) //right
                } else if(this.y >= 185 && this.y < 240){
                    this.playSound(audios.microwave, 1) //right
                } else if(this.y >= 240 && this.y < 330){
                    this.playSound(audios.fridge, 1) //right
                    if(frames%80) this.playSound(audios.books, 0) //Both
                }
                break
            case 'E':
                break
            case 'W':
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

}

const bg = new Background()
const siego = new Siego()

function update(){
    frames++
    bg.draw()
    siego.draw()
}


//Funcion para separar audio
function panning(audio, panSide){ //panSide needs number
    let audioCtx = new AudioContext()
    let htmlAudio = document.createElement('audio')
    htmlAudio.src = `${audio}`
    htmlAudio.loop = false //para que no repita
     if (soundArr.includes(htmlAudio.src)) return
    soundArr.push(htmlAudio)
    let source = audioCtx.createMediaElementSource(htmlAudio)
    let panNode = audioCtx.createStereoPanner()
    audioCtx.destination
    source.connect(panNode)
    panNode.connect(audioCtx.destination)
    panNode.pan.value = panSide
    // htmlAudio.play()
    return htmlAudio
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