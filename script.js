
//Para el sonido puedes borrar esto 
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
        let audioCtx = new AudioContext()
        let htmlAudio = document.createElement('audio')
        htmlAudio.src = 'AudioSources/poker-chips-daniel_simon.mp3'
        let source = audioCtx.createMediaElementSource(htmlAudio)
        let panNode = audioCtx.createStereoPanner()
        audioCtx.destination
        source.connect(panNode)
        panNode.connect(audioCtx.destination)
        panNode.pan.value = -1
        htmlAudio.play()
        console.log(panNode.pan)
    }
}