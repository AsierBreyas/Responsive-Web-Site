const videos = [
    'media/ComerNiños.mp4',
    'media/MAL.mp4',
    'media/NosVamosADrogar.mp4',
    'media/Wrys.mp4'
];
const nombres = [
    'Comer Niños',
    'Mal',
    'Nos vamos a drogar',
    'Wrys'
];
var video_player = document.getElementById("video_player").querySelector("video");
var video_name = document.querySelector("#pVideo");
let contador = 0;
video_player.requestFullscreen();
const playVideo = (id) => {
    contador = id;
    video_player.querySelector('source').src = videos [contador];
    video_name.textContent = nombres[contador];
    video_player.load();
    video_player.play();
};
document.querySelector('#video-previous').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playVideo(contador === 0 ? 3 : --contador);
});
document.querySelector('#video-next').addEventListener('click', (ev) =>{
    ev.preventDefault();
    playVideo(contador === 3 ? 0 : ++contador);
});
document.querySelector('#video-play').addEventListener('click',(ev) => {
    ev.preventDefault();
    if(video_player.paused) {
        video_player.play();
    }else{
        video_player.pause();
    }
});
video_player.addEventListener('play',(ev) => {
    console.log('playing', ev.target);
    document.querySelector('#video-play').textContent = 'pause';
});
video_player.addEventListener('pause',(ev) => {
    console.log('pausing', ev.target);
    document.querySelector('#video-play').textContent = 'play_arrow';
});
document.querySelector('#video-stop').addEventListener('click',(ev) => {
    ev.preventDefault();
    video_player.pause();
    video_player.currentTime = 0;
});
const barra = document.querySelector('#video-playbar');
//const textCurrent = document.querySelector('.time-current');
video_player.addEventListener('timeupdate',(ev) =>{
    barra.value = video_player.currentTime / video_player.duration * 100;
});
barra.addEventListener('click',(ev) =>{
    const newtime = ev.offsetX / barra.offsetWidth;
    barra.value = `${newtime * 100}`;
    video_player.currentTime = newtime * audioEL.duration;
});
const fullscreen = document.querySelector('#video-fullscreen');
function getFullscreen(element){
    if(element.requestFullscreen) {
        element.requestFullscreen();
    }
}
fullscreen.addEventListener('click', (ev) =>{
    ev.preventDefault();
    getFullscreen(video_player);
});