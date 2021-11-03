const button1 = document.getElementById('button1');
// create a new instance of builtin javascript class
// let audio1 = new Audio();
// audio1.src = './songs/feeling.mp3';

// const audioCtx = new AudioContext();

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
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
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    const barWidth = canvas.width / bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++){
            barHeight = dataArray[i];
            canvasCtx.fillStyle = 'white';
            canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }

    animate();

});



// button1.addEventListener('click', function(){
//     audio1.play();

//     audio1.addEventListener('playing', function(){
//         console.log('Audio 1 started playing!')
//     });

//     audio1.addEventListener('ended', function(){
//         console.log('Audio 1 ended!')
//     });
// });
// // JAVASCRIPT WEB AUDIO API
// const button2 = document.getElementById('button2');

// button2.addEventListener('click', playSound);

// function playSound(){
//     const oscillator = audioCtx.createOscillator();
//     oscillator.connect(audioCtx.destination);
//     oscillator.type = 'sawtooth'; // sine, square, triangle, sawtooth
//     oscillator.start();
//     setTimeout(function(){
//         oscillator.stop();
//     }, 200);
// }