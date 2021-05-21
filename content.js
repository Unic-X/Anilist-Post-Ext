var title = document.getElementsByTagName("title")[0].innerHTML;

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

  isLoaded() {
    document.querySelector(".click-to-load").addEventListener("click", () => {
      console.log(`%c Player is Now Loaded!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 
                        6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 
                        18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)`);
      return true;
    });
  }
}

class Gogoanime {
  constructor() {
    //Gets the title name directly from the div which has
    this.name = null;
    this.episode = null;
  }

  gogoanimeEpisode(str) {
    //SEIJO NO MARYOKU WA BANNOU DESU EPISODE 7 ENGLISH SUBBED
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
  if (window.location.href.includes(str)) {
    return true;
  } else {
    return false;
  }
}

//Not a good name but checks which site and returns the instance of the site class wrapper
function alogund() {
  if (containsURL("animepahe")) {
    console.log("Hello Wawwaad");
    return new AnimePahe();
  } else if (containsURL("gogoanime")) {
    console.log(title);
    title =
      document.getElementsByClassName("title_name")[0].children[0].textContent;
    return new Gogoanime();
  } else {
    //pass
  }
}

//Returns the name based on the site
function toAnimeName(w) {
  if (alogund() instanceof AnimePahe) {
    let a = alogund().animepaheNameEpisode(w);
    console.log(a.name + "| " + a.intEp);
    return a.name;
  } else if (alogund() instanceof Gogoanime) {
    let a = alogund().gogoanimeEpisode(w);
    console.log(a.animeName + "| " + a.intEp);
    return a.animeName;
  } else {
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
  perPage: 1,
};

var url = "https://graphql.anilist.co",
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

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  return data;
}

async function chutiya() {
  let a = await fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch((error) => {
      console.warn(error);
    });
  console.log(a);
}

Promise.resolve(chutiya());
