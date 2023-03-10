import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';
let currentTime = localStorage.getItem(localStorageKey);

player.on('timeupdate', throttle(playback, 1000));

function playback({ seconds }) {
  localStorage.setItem(localStorageKey, seconds);
}

player.setCurrentTime(currentTime);

