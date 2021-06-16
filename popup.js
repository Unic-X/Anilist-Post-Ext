var paadu={
    key:null,
    coverImage:null
}
const signInButton=document.getElementById("sign_in");


signInButton.addEventListener("click",()=>{
    chrome.tabs.create({ url: "https://anilist.co/api/v2/oauth/authorize?client_id=5474&response_type=token" })
})

function allah(a,b){
    document.getElementById("chamar").innerHTML=a;
    document.getElementById("chamar_image").style.backgroundImage=`url(${b})`;
}
chrome.storage.sync.get(['key','coverImage'], function(result) {
    paadu.coverImage=result.coverImage;paadu.key=result.key;
    allah(result.key,result.coverImage);
})

var acha={
    key:null,
    coverImage:null
};


`Changes the storage values when any change from content.js`
chrome.storage.onChanged.addListener(()=>{
    chrome.storage.sync.get(['key','coverImage'], function(result) {
        acha.key=result.key;acha.coverImage=result.coverImage;
        allah(result.key,result.coverImage);
    });
})

const changeLang=document.getElementById("sign_in");


function toLang(){
    changeLang.innerHTML=`Current Language is (${currentLang})`;
    changeLang.addEventListener("click",()=>{
        
    })
}



