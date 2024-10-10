export const fetchSongs = async () => {

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
