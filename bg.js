
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
});
chrome.tabs.onActivated.addListener(tab=>{
    console.log(tab.url)
});
