


const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasCtx = canvas.getContext('2d');
let audioSource;
let analyser;

container.addEventListener('click', function(){
    // let audio1 = new Audio();
    const audio1 = document.getElementById('audio1');
    audio1.src = './songs/feeling.mp3';

    const audioCtx = new AudioContext();
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    const barWidth = (canvas.width / 2) / bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }

    animate();

});


file.addEventListener('change', function(){
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.onload();
    audio1.play();
    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    const barWidth = (canvas.width / 2) / bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }

    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i];
        canvasCtx.save();
        canvasCtx.translate(canvas.width/2, canvas.height/2);
        canvasCtx.rotate(i * Math.PI * 2 / bufferLength);
        const hue = i * 5;
        canvasCtx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
        canvasCtx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        canvasCtx.restore();
    }
   
}
