var title = document.getElementsByTagName("title")[0].innerHTML;

class Anilist{
  constructor(){
    this.url=window.location.href;
    this.authenticated=false;
  }
  authenticate(){
    let a = /access_token=[^&]+/gi.exec(this.url);
    let AUTH_TOKEN=a[0].toString().replace(/access_token=/gi, "");
    chrome.storage.sync.set({auth_token:AUTH_TOKEN,logged_in:true});
    console.log(`logged in!! token was :\n ${AUTH_TOKEN} \n DO NOT SHARE!!`)
    this.authenticated=true;
  }
  changeUI(){
    if(this.authenticated){
      //will change UI in future
    }
  }

  //clears the chrome storage data of the extension only
  resetData(){
    let confirmAction = confirm("Are you sure to execute this action this will make u relogin?");
        if (confirmAction) {
          chrome.storage.sync.clear(()=>{
            alert("You have cleared all your data saved in chrome");
          })
        } else {
          alert("Action canceled");
        }
  }
}

class AnimePahe {
  constructor() {
    this.name = null;
    this.episode = null;
    this.isPaused = true;
  }
  animepaheNameEpisode(str) {
    let anime = str.split("::")[0];
    let [name, episode] = anime.split("Ep.");
    const intEp = parseInt(episode);
    this.name = name;
    this.episode = intEp;
    return {
      name,
      intEp,
    };
  }
  showAnimeName() {
    return this.name;
  }
  showAnimeEpisode() {
    return this.episode;
  }

  onLoaded() {
    document.querySelector(".click-to-load").addEventListener("click", () => {
      console.log('%c Player is Now Loaded!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
      return true;
    });
  }

  changeUI(){
    document.createElement()
  }
}

class Gogoanime {
  constructor() {
    //Gets the title name directly from the div which has
    this.name = null;
    this.episode = null;
  }

  gogoanimeEpisode(str) {
    let [animeName, strEp] = str.split("Episode");
    const intEp = parseInt(strEp);
    this.name = animeName;
    this.episode = intEp;
    return {
      animeName,
      intEp,
    };
  }
}

//Checks whether the URL contains the site name
function containsURL(str) {
  if (location.hostname.match(str)) {
    return true;
  } else if(location.href.match(str)){
    return true;
  }else{
    return false;
  }
}

if(containsURL("anilist.co/404#access_token")){
  let a=new Anilist();
  a.authenticate()
}else{
  console.log(location.hostname)
}

//Not a good name but checks which site and returns the instance of the site's class wrapper
function alogund() {
  if (containsURL("animepahe.org") || containsURL("animepahe.com")) {
    return new AnimePahe();
  } else if (containsURL("gogoanime.ai")) {
    try {
      title = document.getElementsByClassName("title_name")[0].children[0].textContent;
      console.log(title);
    } catch (error) {
      //the current active page is homepage 
      title=null;
    }
    return new Gogoanime();
  }else{
    //pass
  }
}

//Returns the name based on the site
function toAnimeName(w) {
  const instanceOfClass=alogund();
  if (instanceOfClass instanceof AnimePahe) {
    instanceOfClass.onLoaded()
    let a = instanceOfClass.animepaheNameEpisode(w);
    console.log(a.name + "| " + a.intEp);
    return (a.name!==null?a.name:console.warn(title+" was not found"));
  } else if (instanceOfClass instanceof Gogoanime) {
    let a = instanceOfClass.gogoanimeEpisode(w);
    console.log(a.animeName + "| " + a.intEp);
    return (a.animeName!==null?a.animeName:console.warn(title+" was not found"));
  } else {
    //pass
  }
}


function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  return data;
}

async function chutiya(query,variables) {
  let url = 'https://graphql.anilist.co';
  var options=null;
  function returnHeader(){
    var token={};
    token.

    //getting data out of this shit i can't
    chrome.storage.sync.get(null,(a)=>{
      console.log(a);
    });
    
    if("auth_token" in token){
      console.log("how");
      options = {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token.auth_token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };
    }else{
      console.log("allah");
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };
    }return options;
  }

  returnHeader()
  
  let a = await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch((error) => {
      console.warn(error);
    });

    let acha={
      key:a.data.Media.description,
      coverImage:a.data.Media.coverImage.large,
      titleEnglish:a.data.Media.title.english,
      latestAnime:a.data.Media.id
    }

    chrome.storage.sync.set(acha, function() {
      console.log(acha);
    });
}


async function getAnime(){
  let variables = {
    search: toAnimeName(title),
    page: 1,
    perPage: 1,
  };

  let query=` query ($id: Int, $search: String) {
    Media (id: $id, search: $search, type: ANIME) {
        id
        duration
        description(asHtml: false)
        episodes
        bannerImage
        title {
            romaji
            english
            native
        }
        coverImage {
            large
        }
    }
}`
;
  await chutiya(query,variables);
}

function updateUser(stat){
  let query =`
    mutation ($mediaId: Int, $status: MediaListStatus) {
      SaveMediaListEntry (mediaId: $mediaId, status: $status) {
        id
        status
        }
      }
    `;
    let id=null;
    chrome.storage.sync.get([latestAnime],(result)=>{
      id=result.latestAnime
    });
    let variables = {
      mediaId:id,
      status:stat
    };

    chutiya(query,variables)
}

Promise.resolve(getAnime());