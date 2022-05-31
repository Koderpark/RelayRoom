// 브라우저 익스텐션이 라프텔 사이트 내에서만 활성화되도록 허용.
/*chrome.runtime.onInstalled.addListener(function() {
  chrome.action.disable();
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: 'laftel.net'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});*/

// IsWatchingVideo : 비디오태그가 있는 경우 true, 없으면 false를 반환.
async function IsWatchingVideo(){
  let ret = await chrome.tabs.query({ active: true, currentWindow: true });
  if((ret[0].url).includes('laftel.net/player')){
    return true;
  }
  else{
    return false;
  }
  return ret[0].url;
}

chrome.runtime.onMessage.addListener( function (msg,sender,sendResponse){
  //if(msg.message == 'ChkWatching'){
  //  console.log(IsWatchingVideo());
  //  sendResponse({message: IsWatchingVideo()});
  //}
  IsWatchingVideo().then((ret) => {
    console.log(ret);
    sendResponse({message: ret});
  });
  //sendResponse({message: "Hello World"});
  return true;
});

