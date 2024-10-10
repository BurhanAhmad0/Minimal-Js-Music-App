export const fetchAPIsongs = async (query) => {
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
        result.data.forEach(obj => {
            // console.log(`Title: ${song.title}`);
            // console.log(`Artist: ${song.artist.name}`);
            // console.log(`Album Cover (Small): ${song.album.cover_small}`); // Small cover image
            // console.log(`Album Cover (Medium): ${song.album.cover_medium}`); // Medium cover image
            // console.log(`Album Cover (Large): ${song.album.cover_big}`); // Large cover image

            songTitles.push(obj.title)
            songArtist.push(obj.artist.name)
            songCover.push(obj.album.cover_medium)
            songs.push(obj.preview)

        });

        // console.log(songTitles, songTitles.length)
        // console.log(songArtist, songArtist.length)
        // console.log(songCover, songCover.length)

        return [songTitles, songArtist, songCover, songs]

    } catch (error) {
        console.error(error);
    }
}
