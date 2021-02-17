const songContainer = document.querySelector(".search-result");
const singleLyrics = document.querySelector(".single-lyrics");

// searchSong = () => {
//     const searchText = document.getElementById("searchText").value;
//     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displaySong(data.data))
// }

searchSong = async() => {
    const searchText = document.getElementById("searchText").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySong(data.data);
}

displaySong = songs => {
    document.querySelector(".search-result").innerHTML = "";
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";

        const html = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}' , '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songDiv.innerHTML = html;
        songContainer.appendChild(songDiv);
    });    
}
// getLyrics = (artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyrics(data.lyrics))
// }

getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res = await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
}

displayLyrics = (lyrics) => {
        singleLyrics.innerText = lyrics;
    }
