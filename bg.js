var paadu={
    key:null,
    coverImage:null
}

function allah(a){
    document.getElementById("chamar").innerHTML=a;

}
chrome.storage.sync.get(['key','coverImage'], function(result) {
    paadu.coverImage=result.coverImage;paadu.key=result.key;
    allah(result.key);
})

var acha={
    key:null,
    coverImage:null
};


`Changes the storage values when any change from content.js`
chrome.storage.onChanged.addListener((changes)=>{
    chrome.storage.sync.get(['key','coverImage'], function(result) {
        acha.key=result.key;acha.coverImage=result.coverImage;
        allah(result.key);
        console.log(acha);
    });
})