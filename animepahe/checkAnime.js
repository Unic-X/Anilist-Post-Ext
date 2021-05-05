

export default function animepaheNameEpisode(str) {
    let anime = str.split("::")[0];
    let [name,episode]=anime.split("Ep.");
    const intEp=parseInt(episode);
    return {
        name,
        intEp
    };
}