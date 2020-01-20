
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

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


const bg = new Background()

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

//Para el sonido puedes borrar esto
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        bg.draw()
        ctx.fillRect(180, 0, 10, 10)
    }
}