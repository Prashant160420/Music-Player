const songs = [
    {
        name: "Shape Of You - Ed Sheeran",
        artist: "Ed Sheeran",
        genre: "Pop",
        audio: "audio/Ed Sheeran - Shape of You.mp3",
        image: "Images/Shape Of You.jpg"
    },
    {
        name: "Easy On Me - Adele",
        artist: "Adele",
        genre: "Pop",
        audio: "audio/Adele - Easy On Me.mp3",
        image: "Images/All of Me.jpg"
    },
    {
        name: "Someone Like You - Adele",
        artist: "Adele",
        genre: "Pop",
        audio: "audio/Adele - Someone Like You.mp3",
        image: "Images/Somelike Like You.jpg"
    },
    {
        name: "Wonderwall - Oasis",
        artist: "Oasis",
        genre: "Rock",
        audio: "audio/Oasis - Wonderwall.mp3",
        image: "Images/Wonderwall.jpg"
    },
    {
        name: "Sugar - Maroon5",
        artist: "Maroon5",
        genre: "Hip-Hop",
        audio: "audio/Maroon 5 - Sugar.mp3",
        image: "Images/Sugar.jpg"
    },
    {
        name: "Locked Away - R. City",
        artist: "R. City",
        genre: "Hip-Hop",
        audio: "audio/R. City - Locked Away ft. Adam Levine.mp3",
        image: "Images/Locked Away.jpg"
    }
];

let currentSongIndex = 0;
let currentPlaylist = [];
let allPlaylists = [];
let filteredSongs = songs; 

// Elements
const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const songImage = document.getElementById('song-image');
const allSongsList = document.getElementById('all-songs-list');
const genreFilter = document.getElementById('genre-filter');
const createPlaylistButton = document.getElementById('create-playlist-button');
const playlistNameInput = document.getElementById('playlist-name-input');
const currentPlaylistElement = document.getElementById('current-playlist');
const allPlaylistsElement = document.getElementById('all-playlists');
const themeToggle = document.getElementById('theme-toggle');

// Load the current song
function loadSong(song) {
    songTitle.textContent = song.name;
    artistName.textContent = song.artist;
    audioSource.src = song.audio;
    songImage.src = song.image;
    audioPlayer.load();
}

// Play the current song
function playSong() {
    audioPlayer.play();
}

// Previous song
document.getElementById('prev-song').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + filteredSongs.length) % filteredSongs.length;
    loadSong(filteredSongs[currentSongIndex]);
    playSong();
});

// Next song
document.getElementById('next-song').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % filteredSongs.length;
    loadSong(filteredSongs[currentSongIndex]);
    playSong();
});

// Populate All Songs list
function updateAllSongsList(filteredSongs) {
    allSongsList.innerHTML = ''; 
    filteredSongs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.name}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(filteredSongs[currentSongIndex]);
            playSong();
        });
        allSongsList.appendChild(li);
    });
}

// Filter songs by genre
function filterSongs() {
    const selectedGenre = genreFilter.value;
    filteredSongs = selectedGenre === 'All' ? songs : songs.filter(song => song.genre === selectedGenre);
    updateAllSongsList(filteredSongs);
    currentSongIndex = 0;
    if (filteredSongs.length > 0) {
        loadSong(filteredSongs[currentSongIndex]);
    }
}

// Create a new playlist
function createPlaylist() {
    const playlistName = playlistNameInput.value.trim();
    if (playlistName) {
        const newPlaylist = {
            name: playlistName,
            songs: []
        };
        allPlaylists.push(newPlaylist);
        updateAllPlaylists();
        playlistNameInput.value = ''; 
    }
}

// Update the current playlist display
function updateCurrentPlaylist() {
    currentPlaylistElement.innerHTML = ''; 
    currentPlaylist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.name;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromPlaylist(index);
        });

        li.appendChild(removeButton); 
        currentPlaylistElement.appendChild(li);
    });
}

// Remove song from current playlist
function removeFromPlaylist(index) {
    currentPlaylist.splice(index, 1); 
    updateCurrentPlaylist(); 
}

// Update the all playlists display
function updateAllPlaylists() {
    allPlaylistsElement.innerHTML = ''; 
    allPlaylists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.textContent = playlist.name;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deletePlaylist(index);
        });

        li.appendChild(deleteButton); 
        allPlaylistsElement.appendChild(li);
    });
}

// Delete a playlist
function deletePlaylist(index) {
    allPlaylists.splice(index, 1); 
    updateAllPlaylists(); 
}

// Initialize
loadSong(songs[currentSongIndex]);
updateAllSongsList(songs); 

// Event listeners
genreFilter.addEventListener('change', filterSongs);
createPlaylistButton.addEventListener('click', createPlaylist);

// Auto play next song when current one ends
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % filteredSongs.length; 
    loadSong(filteredSongs[currentSongIndex]);
    playSong();
});

// Add songs to the current playlist
document.getElementById('add-to-playlist').addEventListener('click', () => {
    const currentSong = filteredSongs[currentSongIndex];
    if (!currentPlaylist.includes(currentSong)) {
        currentPlaylist.push(currentSong);
        updateCurrentPlaylist();
    }
});

// Theme Toggle Logic
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
    }
});
