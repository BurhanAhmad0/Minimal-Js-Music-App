function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // Get the full minutes
    const secs = Math.floor(seconds % 60); // Get the remaining seconds

    // Add leading zero if seconds are less than 10
    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${minutes}:${formattedSecs}`;
}

let currentAudio = null;  // Track the currently playing audio
let currentCard = null

export const songPlay = () => {

    let songCards = document.querySelectorAll('.song-card')
    // console.log(songCards)

    songCards.forEach((element) => {

        let songDuration;

        element.addEventListener("click", () => {
            let songLink = element.getAttribute('data-song')
            // console.log(songLink)

            // If there is already a song playing, pause it
            if (currentAudio && currentAudio !== element.audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            let pausePlay = element.querySelector('.pause-play')
            // console.log(pausePlay)

            // If the same song is clicked again, toggle play/pause
            if (currentAudio === element.audio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                    pausePlay.src = "./assets/icons/play-icon.svg";  // Change to pause icon when song is playing
                } else {
                    currentAudio.pause();
                    pausePlay.src = "./assets/icons/pause-icon.svg";   // Change to play icon when song is paused
                }
                return;  // Stop here to avoid recreating audio
            }



            // Create a new audio element for the clicked song
            let audio = new Audio(songLink);
            audio.play();
            pausePlay.src = "./assets/icons/play-icon.svg"
            currentAudio = audio;  // Store reference to the current audio
            currentCard = element; // Store reference to the current song card

            // Attach the audio instance to the song card for future reference
            element.audio = audio;

            audio.addEventListener("loadedmetadata", () => {
                songDuration = audio.duration;
                // Update the time display with initial duration

                let totalTimeSet = element.querySelector('.totalTime')
                totalTimeSet.innerText = formatTime(songDuration)
                // console.log(totalTimeSet)

            });

            // Track current time while the song is playing
            audio.addEventListener("timeupdate", () => {
                let songCurrentTime = formatTime(audio.currentTime);
                // Update the time display continuously
                // console.log(songCurrentTime)

                let currTime = element.querySelector('.currTime')
                currTime.innerText = songCurrentTime

                // Calculate percentage
                if (songDuration > 0) {
                    let percentage = (audio.currentTime / songDuration) * 100; // Multiply by 100 to get percentage

                    let progressBar = element.querySelector('.progress-bar')
                    // console.log(progressBar)
                    progressBar.style.width = `${Math.floor(percentage)}%`
                    // console.log(Math.floor(percentage))
                }

            });

        })

    })

}
