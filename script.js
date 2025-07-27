const songs = [
  {
    title: "Another Love",
    artist: "Tom Odell",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songList = document.getElementById("song-list");

const cover = document.getElementById("cover");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

let currentSongIndex = 0;

// Playlistga qo‘shiqlarni chiqarish
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });
  songList.appendChild(li);
});

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  cover.src = song.cover;
  songTitle.innerHTML = `<span>${song.title}</span>`;
  songArtist.textContent = song.artist;

  [...songList.children].forEach(li => li.classList.remove("active"));
  songList.children[index].classList.add("active");

  currentSongIndex = index;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  progress.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
  const { duration } = audio;
  audio.currentTime = (progress.value / 100) * duration;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// Boshlanishida yuklash
loadSong(currentSongIndex);

const volumeSlider = document.getElementById('volume');
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});
