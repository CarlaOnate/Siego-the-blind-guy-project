let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let timeP = document.querySelector('#time-text')
// const orientationArr = ['S','W','N','E']
let interval
let soundArr = []
frames = 0
let player1
let player2
let keys = false

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
    keys: 'Images/keys.png',
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

    resetValues(){
        this.draw()
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}

class Siego{
    constructor(){
        // this.lives = 3
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

    resetValues(){
        this.x = 100
        this.y = 50
        this.orientation = 'S'
        // this.lives = 3
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

    grab(){
        // if(this.y >= 280 && this.y < 320){
        //     if(this.x >= 230 && this.x < 290){ // 270x, 350y
        if(this.y >= 280){
            if(this.x < 290 || this.x >= 240){
                keys = true
                gameOver()
            }

        }
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
        if(this.x > 0 && this.x <= 180){
            this.sectionOne()
        } else if(this.x > 180 && this.x < 300){
            this.sectionTwo()
        } else if (this.x > 300 && this.x < 490){
            this.sectionThree()
        } else if (this.x >= 490 && this.x < 600){
            this.sectionFour()
        } else if(this.x >= 600 && this.x < 700){
            this.sectionFive()
        } else if(this.x >= 700 && this.x < 800){
            this.sectionSix()
        }
    }

    playSound(audio, direction){
        panning(audio, direction)
    }

    checkBoundaries(){
        console.log('boundaries', this.x, canvas.width)
        if(this.x < 50) this.x += 5
        if(this.y < 10) this.y += 5
        if(this.x > canvas.width - 50) this.x -= 5
        if(this.y > canvas.height - 100) this.y -= 5
    }

    // checkBoundaries(){ //Vamos por secciones de y, y despues vemos lo de x.
    //     if(this.y >= 0 && this.y < 168){
    //         if(this.x <= 80 || this.y <= 0){ //Margen arriba, izq
    //             this.takeDamage() //Left thingthis.y
    //             this.x += 10
    //         } else if(this.x >= 300 && this.x < 510 && this.y <= 100){
    //             this.takeDamage() //Table
    //             this.x += 10
    //             this.y += 10
    //         } else if(this.x >= 600 && this.x < 700 && this.y <= 5){
    //             this.takeDamage() //Window
    //             this.x += 10
    //             this.y += 10
    //         } else if(this.x <= 795 && this.y >= 50 && this.y <120){
    //             this.takeDamage() //Door
    //             this.x += 10
    //             this.y -= 10
    //         }
    //     } else if(this.y >= 168){
    //         if(this.x <= 80 || this.y >= 330){ //Margen abajo, izq
    //             this.takeDamage() //Left thingthis.y
    //             this.x += 10
    //         } else if(this.x >= 300 && this.x < 510 && this.y < 239){
    //             this.takeDamage() //Couch
    //             this.y += 10
    //         } else if(this.x >= 725 && this.x < 800 && this.y > 180){
    //             this.takeDamage() //Computer
    //             this.y -= 10
    //         }
    //     }
    // }

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
                    if(this.y >= 270 && this.y < 320){
                        if(this.x >= 230 && this.x < 290){ // 270x, 350y
                            this.playSound(audios.keys, 0) //Both
                        } else {
                            this.playSound(audios.books, 0) //Both
                        }
                    }
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
                    if(this.y >= 270 && this.y < 320){
                        if(this.x >= 230 && this.x < 290){ // 270x, 350y
                            this.playSound(audios.keys, 1) //Right
                        } else {
                            this.playSound(audios.books, 1) //Right
                        }
                    }
                } else {
                    this.playSound(audios.empty, 0)
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                if(this.y >= 270 && this.y < 330){
                    if(this.y >= 270 && this.y < 320){
                        if(this.x >= 230 && this.x < 290){ // 270x, 350y
                            this.playSound(audios.keys, -1) //Left
                        } else {
                            this.playSound(audios.books, -1) //Left
                        }
                    }
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

    sectionFour(){ //x de 490 a 600, y de 0 a 330, checa profundidad en y
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

    sectionSix(){ //x de 690 a 800, y de 0 a 330, checa profundida en y
        switch (this.orientation){
            case 'N':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 40 && this.y < 110){
                    this.playSound(audios.door, 1) //Rgiht
                }
                break
            case 'S':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 40 && this.y < 110){
                    this.playSound(audios.door, -1)//Left
                }
                break
            case 'E':
                soundArr.forEach(sound => sound.pause())
                if (this.y >= 40 && this.y < 110){
                    this.playSound(audios.door, 0)//Left
                }
                break
            case 'W':
                soundArr.forEach(sound => sound.pause())
                this.playSound(audios.empty, 0)
                break
            default: console.error('orientation is undefined, perhaps')
        }
    }
}

class Rommie{
    constructor(){
        this.x = 320
        this.y = 190
        this.sx = 0
        this.sy = 0
        this.width = 60
        this.height = 60
        this.orientation = 'S'
        this.imgFront = new Image()
        this.imgFront.src = images.romFront
        this.imgBack = new Image()
        this.imgBack.src = images.romBack
        this.imgRight = new Image()
        this.imgRight.src = images.romRight
        this.imgLeft = new Image()
        this.imgLeft.src = images.romLeft
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
        this.sx = 190
    }

    goKitchen(){
        if(this.y < 245){
            this.goBack()
        } else if(this.x>85){
            this.goLeft()
        } else if(this.x === 85){
            this.goBack()
        }
    }

    goComputer(){
        if(this.x <= 85){
            this.goForward()
            this.goRight()
        } else if(this.y >= 180){
            this.goRight()
        } else if(this.x === 700){
            this.goBack()
        } else if(this.y === 230){
            this.goRight()
        }
    }

    goForward(){
        this.orientation = 'N'
        this.y -= 20
        this.move()
    }

    goBack(){
        this.orientation = 'S'
        this.y += 20
        this.move()
    }

    goRight(){
        this.orientation = 'E'
        this.x += 20
        this.move()
    }

    goLeft(){
        this.orientation = 'W'
        this.x -= 20
        this.move()
    }
}

const bg = new Background()
const siego = new Siego()
const rommie = new Rommie()

function update(){
    frames++
    bg.draw()
    drawKeys()
    siego.draw()
    rommie.draw()
    siego.checkBoundaries()
    printTime()
    if(frames === 2400) gameOver()
}

function drawKeys(){
    imageKey = new Image()
    imageKey.src = images.keys
        if(!keys) ctx.drawImage(imageKey, 270, 350, 30, 30)
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

function gameOver(){
    //ctx.drawImage(images.gameOver, canvas.width, canvas.height) //MARCA ERROR QUE IMAGEN NO ES VALIDA
    if(player1){
        player2 = Math.floor(frames/40)
        ctx.font = '100px serif'
        ctx.fillText(checkWinner(player1, player2), canvas.width/2, canvas.height/2) //Imprima texto con el ganador
    } else {player1 = Math.floor(frames/40)} //para que ponga el tiempo de cada jugador
    siego.resetValues()
    keys = false
    frames = 0
}

function startGame(){
    if(interval) return
    interval = setInterval(update, 1000/40)
}

function endGame(){
    clearInterval(interval)
    soundArr = []
    frames = 0
}

function checkWinner(time1, time2){
    if(time1 > time2){
        endGame()
        return `Player 2 has won, time: ${time2} seconds`
    } else if(time2 > time1) {
        endGame()
        return `Player 1 has won, time ${time1} seconds`
    } else {
        endGame()
        return `Draw`
    }
}

function printTime(){
    timeP.innerHTML = `Current time: ${Math.floor(frames/40)}`

}

function styleGameBoard(){
    let nav = document.querySelector('nav')
    let juego = document.querySelector("#pantalla-juego")
    let canvasDiv = document.querySelector('#game-board')
    let inicio = document.querySelector("#pantalla-inicial")
    let final = document.querySelector("#pantalla-final")
    nav.style.display = 'flex'
    inicio.style.display = 'none'
    juego.style.display = 'flex'
    canvasDiv.style.display = 'flex'
}

document.getElementById("but-initial").onclick = function() {
    styleGameBoard()
}

window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        startGame()
        document.addEventListener('keydown', ({keyCode}) => {
            switch (keyCode) {
                case 40:
                    siego.goBack()
                    break
                case 38:
                    rommie.goKitchen()
                    siego.goForward()
                    break
                case 39:
                    siego.goRight()
                break
                case 37:
                    rommie.goComputer()
                    siego.goLeft()
                break
                case 32:
                    siego.grab()
                break
                default: console.warn('Key not valid')
            }
          })
    }
}
