
var title = document.getElementsByTagName("title")[0].innerHTML

class AnimePahe{
    constructor(){
        this.name=null;
        this.episode=null;
        this.isPaused=true;
    }
    animepaheNameEpisode(str) {
        let anime = str.split("::")[0];
        let [name,episode]=anime.split("Ep.");
        const intEp=parseInt(episode);
        this.name=name;this.episode=intEp;
        return({
            name,intEp
        })
    }
    showAnimeName(){
        return this.name;
    }
    showAnimeEpisode(){
        return this.episode;
    }

    isLoaded() {
        document.querySelector(".click-to-load").addEventListener("click",()=>
        {
            console.log("player is now loaded");
            return true;
    })
    }
}

class Gogoanime{
    constructor(){
        //Gets the title name directly from the div which has
        this.name=null;
        this.episode=null;
    }

    gogoanimeEpisode(str){
        //SEIJO NO MARYOKU WA BANNOU DESU EPISODE 7 ENGLISH SUBBED
        console.log("hello world");
        console.log(title);
        let [animeName,strEp]=str.split("Episode");
        const intEp=parseInt(strEp);
        return({
            animeName,intEp
        })
    }
}

//Checks whether the URL contains the site name
function containsURL(str) {
    if(window.location.href.includes(str)){
        return true;
    }
    else{
        return false;
    }
}

//Not a good name but checks which site and returns the instance of the site class wrapper
function alogund(){
    if(containsURL("animepahe")){
        console.log("Hello Wawwaad");
        return new AnimePahe;
    }else if(containsURL("gogoanime")){
        console.log(title);
        title=document.getElementsByClassName("title_name")[0].children[0].textContent;
        return new Gogoanime;
    }else{
        //pass
    }
}

//Returns the name based on the site
function toAnimeName(w){
    if(alogund() instanceof AnimePahe ){
        let a=alogund().animepaheNameEpisode(w);
        console.log(a.name+" "+a.intEp);
        return a.name;
    }else if(alogund() instanceof Gogoanime){
        let a=alogund();
        console.log(a.gogoanimeEpisode(w))
    }else{
        //pass
    }
}
//Returns the anime name with the Episode no.

var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(id: $id, search: $search, type: ANIME) {
        id
      }
    }
  }
`;

let variables = {
    search: toAnimeName(title),
    page: 1,
    perPage: 1
};

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZjNjAzOGVlNmZlYWY0NTBiOWU0ZDhjZmJkN2JjOWYxZGNhMmU4MjkxN2VjNmY0NTU0M2U4YzczY2FlZTQ1ZGZkMjEzMjMwZmEzNWNmMzE3In0.eyJhdWQiOiI1NDc0IiwianRpIjoiNmM2MDM4ZWU2ZmVhZjQ1MGI5ZTRkOGNmYmQ3YmM5ZjFkY2EyZTgyOTE3ZWM2ZjQ1NTQzZThjNzNjYWVlNDVkZmQyMTMyMzBmYTM1Y2YzMTciLCJpYXQiOjE2MjEzNDMwNjcsIm5iZiI6MTYyMTM0MzA2NywiZXhwIjoxNjUyODc5MDY3LCJzdWIiOiI1MTkzMDQ2Iiwic2NvcGVzIjpbXX0.ADJuTyYUGPXoCUdcVLqEWfyRQK2rw9iq29xeW3qY2G2UEnZQV1M-gTsQ9_FNCWhCsTzZwHIXFF6N3__6EYcU04a5TP_jRuKHHgo-8D0Pd3hquHKbDBrirLT63G68KpfGbG6_PbabKyu-rOU-s-MjSWnIfbMBrgjxLFbxZGy4RwHJ7HmPcJlgtl2Cu3SOWpujwOW8Tbx3JILbcD_qIAfNiaOGbBDJYYYi6vqRKWomSQ2opHl94Lf2jwUQ3gIDEwjAmxTezZoR4M80RyV_VDLHiSl6lj1e-2uyBLGV0dIzLsTK7rlPHaIP9ZZcqZMLNsQyU5YM2dj_snPebtRQ4Jk4vSnTW1RXSh2QKQfSGH9HmAK2Kn1Tfh6jPJdiW6xdyp8-zWnyBY28p4HrB2Opeejtw0tUbpMBRijxOmO8alM2O8tnMcgzCU-1commawgFCey66uswwF3d13Wt14CX4lfDuDTLqfH4yWyG3a16vRoRjO0Lr8AV_3vZZo1hCrJQ6m2aaXRnE-gaTKkdL0nhk6VgiBNfRwFobBZXpifWSE0GK2WhO7_enpwlfeF5UpgkGB-kgb0nBMguf8fii2E52i-Av2UgsJDFSC7O15W29tnrUVMJ0GMZHA4gvnObig_ycm5FZ5GoTMitZujVe7XwIovF_GzORzNVmqrlfsm8xKzuYT8",
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    return data;
}

async function chutiya(){
    let a = await fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch((error)=>{
        console.warn(error);
    });
    console.log(a);
}
Promise.resolve(chutiya())