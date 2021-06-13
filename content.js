var title = document.getElementsByTagName("title")[0].innerHTML;

var AUTH_TOKEN=null;

console.log(window.location.href);

class Anilist{
  constructor(){
    this.url=window.location.href;
  }
  authenticate(){
    let a = /access_token=[^&]+/gi.exec(this.url);
    AUTH_TOKEN=a[0].toString().replace(/access_token=/gi, "");
    chrome.storage.sync.set({auth_token:AUTH_TOKEN});
    console.log(`logged in!! token was :\n ${AUTH_TOKEN} \n DO NOT SHARE!!`)
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
  } else {
    return false;
  }
}

//Not a good name but checks which site and returns the instance of the site class wrapper
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
  } else if(containsURL("anilist.co/404#token")){
    let a=new Anilist();
    a.authenticate()
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
//Returns single anime name with the Episode n and bunch of other hot stuffs


function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  return data;
}

async function chutiya(query,variables) {
  if(AUTH_TOKEN===null){
    console.warn("user hasn't logged in log in to update the anilist");
    return
  }
  let url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

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
      console.log('Value set to :' + acha);
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