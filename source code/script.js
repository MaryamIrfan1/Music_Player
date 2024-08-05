const songs = [
    {
        name: "Faded",
        path: "music/Faded.mp3",
        artist: "Alan Walker",
        cover: "images/img1.jpeg",
    },
    {
        name: "Walking down the street",
        path: "music/walking-down-the-street.mp3",
        artist: "Ron Carroll",
        cover: "images/img2.jpeg",
    },
    {
        name: "Rather Be",
        path: "music/Rather Be.mp3",
        artist: "Jess Glynne",
        cover: "images/img3.jpeg",
    },
    {
        name: "Stay",
        path: "music/stay.mp3",
        artist: "Justin Bieber",
        cover: "images/img4.jpeg",
    },
];

const songsList = document.getElementById("songsList");
const seekBar = document.getElementById("seekBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("duration");
const volumeIcon = document.getElementById("volumeIcon");
const volumeValue = document.getElementById("volumeValue");
const waves = document.querySelectorAll(".wave");
const songName = document.getElementById("songName");
const coverImage = document.querySelector(".details-container img");
const repeatBtn = document.querySelector(".btn.repeat");
const playBtn1 = document.querySelector(".play-btn1");

let currentAudioIndex = 0;
let preAudioIndex = 0;
let audio = new Audio();
let repeat = false;

function showSongList() {
    songsList.style.display = "block";
}

function hideSongList() {
    songsList.style.display = "none";
}

function setAudio() {
    audio.src = songs[currentAudioIndex].path;
    audio.load();
    songName.textContent = songs[currentAudioIndex].name;
    coverImage.src = songs[currentAudioIndex].cover;
}

function playBtnClick() {
    checkCurrentAudio();
}

function checkCurrentAudio() {
    if (songs.length !== 0) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}

function refreshBtnClick() {
    audio.currentTime = 0;
}

function prevBtnClick() {
    if (currentAudioIndex > 0 && songs.length !== 0) {
        preAudioIndex = currentAudioIndex;
        --currentAudioIndex;
        setAudio();
        checkCurrentAudio();
    }
}

function nextBtnClick() {
    if (songs.length !== 0 && currentAudioIndex < songs.length - 1) {
        preAudioIndex = currentAudioIndex;
        ++currentAudioIndex;
        setAudio();
        checkCurrentAudio();
    }
}

function repeatBtnClick() {
    repeat = !repeat;
    repeatBtn.classList.toggle("active", repeat);
}

function changeSongController(e) {
    if (songs.length > 0) {
        audio.currentTime = (e.target.value / 100) * audio.duration;
    }
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    min = min < 10 ? `0${min}` : min;
    let sec = Math.floor(time % 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
}

function changeVolumeController(e) {
    audio.volume = e.target.value;
    const volume = Math.floor(e.target.value * 100);
    volumeValue.textContent = `${volume}%`;

    if (volume === 0) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else if (volume > 0 && volume <= 50) {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    } else {
        volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}

function populateSongList() {
    const list = document.getElementById("list");
    list.innerHTML = ""; 

    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.setAttribute("data-index", index);
        li.innerHTML = `
            <div class="details">
                <img src="${song.cover}" alt="${song.name}" />
                <h5>${song.name}</h5>
            </div>
            <button class="btn play-btn2" onclick="playSong(${index})">
                <i class="fa-solid fa-play"></i>
            </button>
        `;
        list.appendChild(li);
    });
}

function playSong(index) {
    currentAudioIndex = index;
    setAudio();
    checkCurrentAudio();
}

audio.addEventListener("timeupdate", function () {
    if (audio.duration) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
        currentTime.textContent = formatTime(audio.currentTime);
        durationTime.textContent = formatTime(audio.duration);
    } else {
        seekBar.value = 0;
    }
});

audio.addEventListener("playing", function () {
    waves.forEach((wave) => wave.classList.add("active"));
    playBtn1.innerHTML = '<i class="fa-solid fa-pause"></i>';
    updatePlayButtonState();
});

audio.addEventListener("pause", function () {
    waves.forEach((wave) => wave.classList.remove("active"));
    playBtn1.innerHTML = '<i class="fa-solid fa-play"></i>';
    updatePlayButtonState();
});

audio.addEventListener("ended", function () {
    if (!repeat) {
        if (currentAudioIndex < songs.length - 1) {
            preAudioIndex = currentAudioIndex;
            ++currentAudioIndex;
            setAudio();
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        audio.play();
    }
});

function updatePlayButtonState() {
    const playButtons = document.querySelectorAll(".play-btn2");
    playButtons.forEach((btn) => {
        const index = btn.getAttribute("data-index");
        if (parseInt(index) === currentAudioIndex) {
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
}

setAudio();
populateSongList();

function showSongList() {
    const songList = document.getElementById("songsList");
    songList.classList.add("active");
}
// Function to hide the song list
function hideSongList() {
    const songList = document.getElementById("songsList");
    songList.classList.remove("active");
}


