//Todo 1. check the anime name

let title = document.getElementsByTagName("title")[0].innerHTML

console.log();

var a = document.getElementsByClassName("click-to-load");

class AnimePahe{
    constructor(){
        this.name=null;
        this.episode=null;
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
        {console.log("clicked on sex");
        return true;
    })
    }
    
    isPaused(){
        
    }
    

}

function containsURL(str) {
    if(window.location.href.includes(str)){
        return true;
    }
    else{
        return false;
    }
}

function alogund(){
    if(containsURL("animepahe")){
        let animepahe = new AnimePahe;
        return animepahe;
    }else if(containsURL("googanime")){
        let gogoanime = new Gogoanime;
        return gogoanime;
    }
}

function sex(w){
    if(alogund() instanceof AnimePahe ){
        let a=alogund().animepaheNameEpisode(w);
        console.log(a.name+" "+a.intEp);
        return a.name;
    }else{
        //pass
    }
}
//Returns the anime name with the Episode no.

var query = `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    media (id: $id, search: $search) {
      id
      title{
          english
      }
    }
  }
}
`;



let variables = {
    search: sex(title),
    page: 1,
    perPage: 1
};

var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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

function handleError(error) {
    alert('Error, check console');
    console.warn(error); 
}
//let a = fetch(url, options).then(handleResponse)
//                   .then(handleData)
//                   .catch(handleError);
async function chutiya(){

    let a = await fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);
    console.log(a.data.Page.media[0])
}
chutiya();