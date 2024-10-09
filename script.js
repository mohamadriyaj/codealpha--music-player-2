let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Mekanın Sahibi",
    artist: "Norm Ender",
    image: "file:///C:/Users/Admin/Downloads/music/cover-1.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/mp3_music-1.mp3"
  },
  {
    name: "Everybody Knows",
    artist: "Leonard Cohen",
    image: "file:///C:/Users/Admin/Downloads/music/cover-2.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-2.mp3"
  },
  {
    name: "Extreme Ways",
    artist: "Moby",
    image: "file:///C:/Users/Admin/Downloads/music/cover-3.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-3.mp3",
  },
  {
    name: "Butterflies",
    artist: "Sia",
    image: "file:///C:/Users/Admin/Downloads/music/cover-4.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-4.mp3",
  },
  {
    name: "The Final Victory",
    artist: "Haggard",
    image: "file:///C:/Users/Admin/Downloads/music/cover-5.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-5.mp3",
  },
  {
    name: "Genius ft. Sia, Diplo, Labrinth",
          artist: "LSD",
    image: "file:///C:/Users/Admin/Downloads/music/cover-6.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-6.mp3",
  },
  {
    name: "The Comeback Kid",
          artist: "Lindi Ortega",
    image: "file:///C:/Users/Admin/Downloads/music/cover-7.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-7.mp3",
  },
  {
    name: "Overdose",
          artist: "Grandson",
    image: "file:///C:/Users/Admin/Downloads/music/cover-8.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-8.mp3",
  },
  {
    name: "Rag'n'Bone Man",
    artist: "Human",
    image: "file:///C:/Users/Admin/Downloads/music/cover-9.jpg",
    path: "file:///C:/Users/Admin/Downloads/music/music-9.mp3",
  },
];

function random_bg_color() {

  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

