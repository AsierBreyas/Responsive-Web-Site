 const videos = [
    'media/ComerNiños.mp4',
    'media/MAL.mp4',
    'media/NosVamosADrogar.mp4',
    'media/NosPegan.mp4'
];
var video_player = document.getElementById("video_player").querySelector("video");
let contador = 0;
const playVideo = (id) => {
    contador = id;
    video_player.querySelector('source').src = videos [contador];
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
const playbar = document.querySelector('#video-playbar');
//const textCurrent = document.querySelector('.time-current');
video_player.addEventListener('timeupdate',(ev) =>{
    playbar.value = video_player.currentTime / video_player.duration * 100;
});
playbar.addEventListener('click',(ev) =>{
    const newTime = ev.offsetX / playbar.offsetWidth;
    playbar.value = `${newTime * 100}`;
    video_player.currentTime = newTime * audioEL.duration;
});
