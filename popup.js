var paadu={
    key:null,
    coverImage:null,
    titleEnglish:null,
}
//const signInButton=document.getElementById("sign_in");


/*signInButton.addEventListener("click",()=>{
    chrome.tabs.create({ url: "https://anilist.co/api/v2/oauth/authorize?client_id=5474&response_type=token" })
})*/

function allah(a,b){
    if(a.length>14){
        document.getElementById("animeTitle").innerHTML=a.slice(0,11)+"...";
    }else{
        document.getElementById("animeTitle").innerHTML=a;
    }
    document.getElementById("animeNameFull").innerHTML=a;
    document.getElementById("coverImg").style.backgroundImage=`url(${b})`;
}
chrome.storage.sync.get(['titleEnglish','coverImage'], function(result) {
    paadu.coverImage=result.coverImage;paadu.titleEnglish=result.titleEnglish;
    allah(result.titleEnglish,result.coverImage);
})

var acha={
    key:null,
    coverImage:null,
    titleEnglish:null,
};


`Changes the storage values when any change from content.js`
chrome.storage.onChanged.addListener(()=>{
    chrome.storage.sync.get(['titleEnglish','coverImage'], function(result) {
        acha.titleEnglish=result.titleEnglish;acha.coverImage=result.coverImage;
        allah(result.titleEnglish,result.coverImage);
    });
})

//const changeLang=document.getElementById("sign_in");


/*function toLang(){
    changeLang.innerHTML=`Current Language is (${currentLang})`;
    changeLang.addEventListener("click",()=>{
        
    })
}*/



