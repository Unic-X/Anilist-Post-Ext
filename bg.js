let acha={
    key:null,
    coverImage:null,
    titleRomaji:null
  }
  chrome.storage.sync.set(acha, function() {
    console.log('Value is set to ' + acha);
  })


`Changes the storage values when any change from content.js`
chrome.storage.onChanged.addListener((changes)=>{
    console.log(changes)
    chrome.storage.sync.get(['key','coverImage',"titleRomaji"], function(result) {
        console.log('Value currently is ' + result.key + "coverImage: "+result.coverImage);
        acha.key=result.key;acha.coverImage=result.coverImage;acha.titleRomaji;
    });
})