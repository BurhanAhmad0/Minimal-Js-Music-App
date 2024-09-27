function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Get the full minutes
    const secs = Math.floor(seconds % 60); // Get the remaining seconds

    // Add leading zero if seconds are less than 10
    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${minutes}:${formattedSecs}`;
}

async function fetchAPIsongs(query) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`;  // Search for songs by a query
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '539113dcf0mshcecadc3048f356ap1593c2jsna1ea292c674a',
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // console.log(result);  // Inspect the response

        let songTitles = []
        let songArtist = []
        let songCover = []
        let songs = []

        // Loop through the result to get song data and audio previews
        result.data.forEach(song => {
            // console.log(`Title: ${song.title}`);
            // console.log(`Artist: ${song.artist.name}`);
            // console.log(`Album Cover (Small): ${song.album.cover_small}`); // Small cover image
            // console.log(`Album Cover (Medium): ${song.album.cover_medium}`); // Medium cover image
            // console.log(`Album Cover (Large): ${song.album.cover_big}`); // Large cover image

            songTitles.push(song.title)
            songArtist.push(song.artist.name)
            songCover.push(song.album.cover_medium)
            songs.push(song.preview)

        });

        // console.log(songTitles, songTitles.length)
        // console.log(songArtist, songArtist.length)
        // console.log(songCover, songCover.length)

        return [songTitles, songArtist, songCover, songs]

    } catch (error) {
        console.error(error);
    }
}

async function fetchSongs() {

    let api = await fetch('http://127.0.0.1:5501/songs/')
    let response = await api.text()

    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response

    // console.log(fetchedSongs)

    let anchors = div.getElementsByTagName('a')

    // console.log(anchors)

    let songNames = []
    // console.log(songNames)
    let songs = []
    // console.log(songs)

    for (let index = 0; index < anchors.length; index++) {
        const element = anchors[index];

        // console.log(element.href)

        if (element.href.endsWith('.mp3')) {
            // console.log(element.href)

            songs.push(element.href)
            songNames.push(element.href.split('/songs/')[1].replace(".mp3", ""))
        }
        
    }    

    return [songs, songNames]
    
}

function songPlay() {

    let songCards = document.querySelectorAll('.song-card')
    // console.log(songCards)
    let currentAudio = null;  // Track the currently playing audio

    songCards.forEach((element) => {

        let songDuration;

        element.addEventListener("click", () => {
            let songLink = element.getAttribute('data-song')
            // console.log(songLink)

            // If there is already a song playing, pause it
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;  // Reset the previous song's time
            }

            // Create a new audio instance for the clicked song
            let audio = new Audio(songLink);
            audio.play();
            currentAudio = audio;  // Set the new audio as the currently playing one

            let playbar = document.getElementById('player')
            playbar.style.display = "flex"

            audio.addEventListener("loadedmetadata", () => {
                songDuration = audio.duration;
                // Update the time display with initial duration

                let totalTimeSet = document.getElementById('totalTime')
                totalTimeSet.innerText = formatTime(songDuration)
                
            });

            // Track current time while the song is playing
            audio.addEventListener("timeupdate", () => {
                let songCurrentTime = formatTime(audio.currentTime);
                // Update the time display continuously

                let currTime = document.getElementById('currTime')
                currTime.innerText = songCurrentTime

                 // Calculate percentage
                 if (songDuration > 0) {
                    let percentage = (audio.currentTime / songDuration) * 100; // Multiply by 100 to get percentage

                    let progressBar = document.getElementById('progress-bar')
                    progressBar.style.width = `${percentage}%`
                }
                
            });
            
            let playbarSongTitle = document.querySelector('.info')
            // console.log(playbarSongTitle)

            let songName = element.querySelector('.song-title').innerHTML
            // console.log(songName)
            let songArtist = element.querySelector('.artist-name').innerHTML
            // console.log(songArtist)

            let setSongTitle = `<span>${songName}.mp3 - ${songArtist}</span>`

            playbarSongTitle.innerHTML = setSongTitle

        })

    })
    
}

async function main() {

    let [songs, songNames] = await fetchSongs()
    // console.log(songs)
    // console.log(songNames)

    let container = document.querySelector('.container')
    // console.log(container)

    for (let index = 0; index < songNames.length; index++) {
        const songName = songNames[index];
        const song = songs[index];

        let songCard = `<div class="song-card" data-song=${song}>
                            <img src="./icons/music.svg" alt="Song Cover" class="cover-img" />
                            <div class="song-info">
                            <h3 class="song-title">${songName}</h3>
                            <p class="artist-name">Artist Name</p>
                            <button class="play-btn">Play</button>
                            </div>
                        </div>`  

        container.innerHTML = container.innerHTML + songCard
        
    }

    // Call the function with a search query, for example, "eminem"
    let [songTitles, songArtists, songCovers, song] = await fetchAPIsongs('Young Stunners');

    for (let index = 0; index < songTitles.length; index++) {
        const songTitle = songTitles[index];
        const songArtist = songArtists[index];
        const songCover = songCovers[index];
        const track = song[index];

        let songCard = `<div class="song-card" data-song=${track}>
                            <img src="${songCover}" alt="Song Cover" class="cover-img" />
                            <div class="song-info">
                            <h3 class="song-title">${songTitle}</h3>
                            <p class="artist-name">${songArtist}</p>
                            <button class="play-btn">Play</button>
                            </div>
                        </div>`  

        container.innerHTML = container.innerHTML + songCard
        
    }

    songPlay()
    
}

main()
