let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
// const orientationArr = ['S','W','N','E']
let interval
let soundArr = []
frames = 0

const audios = {
    empty: 'audioSource/empty.mp3',
    auch: 'audioSource/auch.mp3',
    phone: 'audioSource/phone.mp3',
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
    bg: 'Images/bg.png',
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
        this.height = 60
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
                ctx.drawImage(this.imgRight, this.sx, this.sy, 196, 203, this.x, this.y, this.width, this.height)
                break
            case 'W':
                ctx.drawImage(this.imgLeft, this.sx, this.sy, 196, 203, this.x, this.y, this.width, this.height)
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

    goForward(){
        this.orientation = 'N'
        this.y -= 20
        this.move()
        this.checkSound()
    }

    goBack(){
        this.orientation = 'S'
        this.y += 20
        this.move()
        this.checkSound()
    }

    goRight(){
        this.orientation = 'E'
        this.x += 20
        this.move()
        this.checkSound()
    }

    goLeft(){
        this.orientation = 'W'
        this.x -= 20
        this.move()
        this.checkSound()
    }

    checkSound(){ //Checa que section esta el jugador
        if(this.x > 80 && this.x <= 180){
            this.sectionOne()
        } else if(this.x > 180 && this.x < 300){
            this.sectionTwo()
        } else if (this.x > 300 && this.x < 490){
            this.sectionThree()
        } else if (this.x >= 490 && this.x < 600){
            this.sectionFour()
        } else if(this.x >= 600 && this.x < 690){
            this.sectionFive()
        }
    }

    playSound(audio, direction){
        // let timeOut = setTimeout(panning, 100, [audio, direction])
        // clearTimeout(timeOut)
        panning(audio, direction)
    }

    sectionOne(){ //x de 80 a 180, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 85){
                    this.playSound(audios.sink, -1) //left
                } else if(this.y >= 85 && this.y < 185){
                    this.playSound(audios.stove, -1) //left
                } else if(this.y >= 185 && this.y < 240){
                    this.playSound(audios.microwave, -1) //left
                } else if(this.y >= 260 && this.y < 330){
                    this.playSound(audios.books, -1) //left
                }
                break
            case 'S':
              soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 85){
                    this.playSound(audios.sink, 1)//right
                } else if(this.y >= 85 && this.y < 185){
                    this.playSound(audios.stove, 1) //right
                } else if(this.y >= 185 && this.y < 240){
                    this.playSound(audios.microwave, 1) //right
                } else if(this.y >= 260 && this.y < 330){
                    this.playSound(audios.books, 0) //Both
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                if(this.y >= 240 && this.y < 330){
                    this.playSound(audios.books, 1) //Right
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 85){
                    this.playSound(audios.sink, 0)//Both
                } else if(this.y >= 85 && this.y < 185){
                    this.playSound(audios.stove, 0) //Both
                } else if(this.y >= 185 && this.y < 240){
                    this.playSound(audios.microwave, 0) //Both
                } else if(this.y >= 260 && this.y < 320){
                    this.playSound(audios.books, 0) //Both
                }
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

    sectionTwo(){ //x de 180 a 300, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 90){
                    this.playSound(audios.table, 1) //right
                }  else if(this.y >= 167 && this.y < 240){
                    this.playSound(audios.couch, 1) //right
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            case 'S':
                soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 90){
                    this.playSound(audios.table, -1)//left
                } else if(this.y >= 167 && this.y < 240){
                    this.playSound(audios.couch, -1) //left
                } else if(this.y >= 270 && this.y < 330){
                    this.playSound(audios.books, 0) //Both
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                if (this.y > 0 && this.y < 90){
                    this.playSound(audios.table, 0)//Both
                } else if(this.y >= 167 && this.y < 240){
                    this.playSound(audios.couch, 0) //Both
                } else if(this.y >= 270 && this.y < 330){
                    this.playSound(audios.books, 1) //Right
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if(this.y >= 270 && this.y < 330){
                    this.playSound(audios.books, -1) //Left
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

    sectionThree(){ //x de 300 a 490, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 70 && this.y < 150){
                    this.playSound(audios.table, 0) //Both
                }  else if(this.y >= 239 && this.y < 330){
                    this.playSound(audios.couch, 0) //Both
                }
                break
            case 'S':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 80 && this.y < 169){
                    this.playSound(audios.couch, 0)//Both
                } else if(this.y >= 220 && this.y < 330){
                    this.playSound(audios.tv, 0) //Both
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 80 && this.y < 150){
                    this.playSound(audios.table, -1)//Left
                    this.playSound(audios.couch, 1)//Right
                } else if(this.y >= 239 && this.y < 330){
                    this.playSound(audios.couch, -1) //Left
                    this.playSound(audios.tv, 1) //Right
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 80 && this.y < 150){
                    this.playSound(audios.table, 1)//Right
                    this.playSound(audios.couch, -1)//Left
                } else if(this.y >= 240 && this.y < 330){
                    this.playSound(audios.couch, 1) //Right
                    this.playSound(audios.tv, -1) //Left
                }
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

    sectionFour(){ //x de 490 a 600, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 90){
                    this.playSound(audios.table, -1) //Left
                }  else if(this.y >= 167 && this.y < 210){
                    this.playSound(audios.couch, -1) //Left
                }
                break
            case 'S':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 90){
                    this.playSound(audios.table, 1)//Right
                } else if(this.y >= 167 && this.y < 210){
                    this.playSound(audios.couch, 1) //Right
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                this.playSound(audios.empty, 0)
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 90){
                    this.playSound(audios.table, 0)//Right
                } else if(this.y >= 167 && this.y < 240){
                    this.playSound(audios.couch, 0) //Right
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            default: console.error('orientation is undifined, perhaps')
        }
    }

    sectionFive(){ //x de 600 a 690, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 60){
                    this.playSound(audios.window, 0) //Both
                } else if (this.y >= 210 && this.y < 250){
                    this.playSound(audios.computer, 1) //Right
                } else {
                    this.playSound(audios.empty, 0)//Both
                }
                break
            case 'S':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 250 && this.y < 330){
                    this.playSound(audios.phone, 0)//Both
                } else if (this.y >= 210 && this.y < 250){
                    this.playSound(audios.computer, -1) //Left
                } else {
                    this.playSound(audios.empty, 0)//Both
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 50){
                    this.playSound(audios.window, -1)//Left
                } else if (this.y >= 210 && this.y < 250){
                    this.playSound(audios.computer, 0) //Both
                } else if(this.y >= 250 && this.y < 330){
                    this.playSound(audios.phone, 1) //Right
                } else {
                    this.playSound(audios.empty, 0)//Both
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 0 && this.y < 50){
                    this.playSound(audios.window, 1)//Right
                } else if(this.y >= 250 && this.y < 330){
                    this.playSound(audios.phone, -1) //Left
                } else {
                    this.playSound(audios.empty, 0)//Both
                }
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
    htmlAudio.play()
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
        document.addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                case 40:
                    siego.goBack()
                    break
                case 38:
                    siego.goForward()
                    break
                case 39:
                    siego.goRight()
                break
                case 37:
                    siego.goLeft()
                default: console.warn('Key not valid')
            }
          })
    }
}
