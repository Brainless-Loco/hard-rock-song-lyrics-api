function durationConverter(seconds){
    let min = parseInt(seconds / 60);
    let sec = seconds % 60;
    return min+" Minutes " + sec + " Seconds";
}

getLyrics = (artistName, songName , i) =>{
    // https://api.lyrics.ovh/v1/Adele/Hello
    let retLyrics ="Sorry!! Lyrics not found for this song!";
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
    .then(res => res.json())
    .then(lyricsObject =>{
        //  console.log(lyricsObject.lyrics);
        // retLyrics = lyricsObject.lyrics;
        if(lyricsObject.lyrics=="" || lyricsObject.lyrics==undefined) document.getElementById("lyricsno"+i).innerText = retLyrics;
        else document.getElementById("lyricsno"+i).innerText = lyricsObject.lyrics;
    });
    // return retLyrics;
}

let searchBar = document.getElementById("search-ber");
searchBar.addEventListener("input",function(e){
    let inputObject = e.target.value;

    let searchResult = document.getElementById("search-result");
    searchResult.innerHTML = "";

    fetch("https://api.lyrics.ovh/suggest/"+inputObject)
    .then(res => res.json())
    .then(arrayOfObjects => {
        //  console.log(arrayOfObjects.data.length);
        // Got Data
        let Data = arrayOfObjects.data;
        console.log(arrayOfObjects);
        for(let i = 0; i<Data.length;i++){
            const songName = Data[i].title;
            const albumName = Data[i].album.title;
            const artistName = Data[i].artist.name;
            const artistLink = Data[i].artist.link;
            const duration = Data[i].duration;
            const songLink = Data[i].link;
            const albumCover = Data[i].album.cover_medium;
            const fullAlbum = Data[i].album.tracklist;
            // console.log(songName + ' ' + albumName);

            let markUp =`
            <div id="resultno${i}" class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9 mb-2">
                    <h3 class="h3">${songName}<h3>
                    <p class="author lead h3">From <span class="font-weight-bold"><a href="${fullAlbum}" class="text-white"> ${albumName}&nbsp; <i class="fas fa-external-link-alt h6"></i></a><br>by <a class="lyrics-name text-warning font-weight-bold" href="${artistLink}">${artistName}</a></span></p>
                </div>
                <div class="col-md-3 mb-2 text-md-right text-center">
                    <button class="btn btn-success" onclick="showDetails(this.id)" id="get-details${i}">Get Details</button>
                </div>
                <div class="container-fluid d-none mx-0 px-0" id="detailsno${i}"></div>
                
            </div>`;
            let markup2 =  `
            <div class="col-8 text-center mx-auto">
                <img src="${albumCover}" class="img-fluid sized_img" alt="">
            </div>
            <br>
            <div class="col-8 text-center mx-auto">
                <audio controls>
                    <source src="${Data[i].preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-12 py-3">
                <div class="col-5 mx-auto text-center">
                    <a href="${songLink}" class="text-white font-weight-bold h4" target="_blank"><i class="fas fa-music"></i> Listen Full Song <i class="fas fa-music"></i></a>
                    <p>${durationConverter(duration)}</p>
                    <h3>Lyrics</h3>
                    <hr style="background-color:white;">
                </div>
            </div>
            <pre id="lyricsno${i}" class="lyric text-center col-12 text-white"></pre>
            `;
            searchResult.innerHTML += markUp;
            document.getElementById("detailsno"+i).innerHTML = markup2;
            getLyrics(artistName,songName,i);
            // console.log(getLyrics(artistName,songName));
            if(i==9){
                break;
                // not more than 7 songs
            }
        }
    });
});

showDetails = idOfButton => {
    let idNo = idOfButton.charAt(idOfButton.length-1);
    document.getElementById("detailsno"+idNo).classList.toggle("d-none");
}