const button1 = document.getElementById('button1');
// create a new instance of builtin javascript class
let audio1 = new Audio();
audio1.src = './songs/feeling.mp3';

const audioCtx = new AudioContext();



button1.addEventListener('click', function(){
    audio1.play();

    audio1.addEventListener('playing', function(){
        console.log('Audio 1 started playing!')
    });

    audio1.addEventListener('ended', function(){
        console.log('Audio 1 ended!')
    });
});
// JAVASCRIPT WEB AUDIO API
const button2 = document.getElementById('button2');

button2.addEventListener('click', playSound);

function playSound(){
    const oscillator = audioCtx.createOscillator();
    oscillator.connect(audioCtx.destination);
    oscillator.type = 'sawtooth'; // sine, square, triangle, sawtooth
    oscillator.start();
    setTimeout(function(){
        oscillator.stop();
    }, 200);
}