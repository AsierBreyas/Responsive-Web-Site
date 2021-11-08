const songs = [
    'media/SpookyScarySkeletons.mp3',
    'media/Perdio su vida en el lol.mp3',
    'media/Woah.mp3',
    'media/Doraemon.mp3',
    'media/Caballo Homosexual de las Montañas.mp3',
];
const nSongs = [
    'Spooky Scary Skeletons',
    'Perdió su vida en el lol',
    'Woah',
    'Doraemon',
    'Caballo homosexual de las montañas',
];
const imLink =[
    'https://i1.sndcdn.com/artworks-000431798787-gfse36-t500x500.jpg',
    'http://images.genius.com/5f7f26053f8dca98bd676b8b14ec99fd.332x187x1.jpg',
    'https://pm1.narvii.com/6592/04e819ff0f4eb5c937c672dee6af2a0ff2b5ecfc_hq.jpg',
    'https://yt3.ggpht.com/ytc/AKedOLQMSrgxItPwy1gW4nke8tyEXNImWjwt3upFTg7g=s900-c-k-c0x00ffffff-no-rj',
    'https://m.media-amazon.com/images/I/A1RG9R2dXlL._SS500_.jpg',
];
const  audioEL = document.querySelector('#audio');
const nombreCancion = document.querySelector('#pCancion');
const imagen = document.querySelector('.image');
let current = 0;
const playAudio = (id) => {
    current = id;
    audioEL.querySelector('source').src = songs [current];
    nombreCancion.textContent = nSongs[current];
    imagen.style.backgroundImage = `url(${imLink[current]})`;
    audioEL.load();
    audioEL.play();
};
document.querySelector('#control-previous').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playAudio(current === 0 ? 4 : --current);
});
document.querySelector('#control-next').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playAudio(current === 4 ? 0 : ++current);
});
document.querySelector('#control-play').addEventListener('click',(ev) => {
    ev.preventDefault();
    if(audioEL.paused) {
        audioEL.play();
    }else{
        audioEL.pause();
    }
});
audioEL.addEventListener('play',(ev) => {
    console.log('playing', ev.target);
    document.querySelector('#control-play').textContent = 'pause';
});
audioEL.addEventListener('pause',(ev) => {
    console.log('pausing', ev.target);
    document.querySelector('#control-play').textContent = 'play_arrow';
});
document.querySelector('#control-stop').addEventListener('click',(ev) => {
    ev.preventDefault();
    audioEL.pause();
    audioEL.currentTime = 0;
});
const neatTime = (time) => {
    // const hours = Math.floor((time % 86400) / 3600)
    const minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : '0${seconds}';
    return '${minutes}:${seconds}';
};

const progressFill = document.querySelector('#playbar');
//const textCurrent = document.querySelector('.time-current');
audioEL.addEventListener('timeupdate',(ev) =>{
    progressFill.value = audioEL.currentTime / audioEL.duration * 100;
});

//const progressSlider = document.querySelector('.progress');
progressFill.addEventListener('click',(ev) =>{
    const newTime = ev.offsetX / progressFill.offsetWidth;
    progressFill.value = `${newTime * 100}`;
    audioEL.currentTime = newTime * audioEL.duration;
});