chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({bgcolor: '#222', color: '#eee'}, function() {
    console.log('The bgcolor is #222, color is #eee');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'developer.chrome.com' }
        })
      ],
      actions: [ new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});
