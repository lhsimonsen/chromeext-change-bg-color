const changeColor = document.querySelector('#changeColor');
const viewOptions = document.querySelector('#viewOptions');

const dispatchNotification = (title, message) => {
  chrome.notifications.create('changeColor', {type: 'basic', iconUrl: 'icons/get_started16.png', title, message})
  chrome.notifications.clear('changeColor');
}

changeColor.onclick = function(el) {
  const bgcolor = event.target.attributes.getNamedItem('data-bgcolor').value;
  const color = event.target.attributes.getNamedItem('data-color').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: `document.body.style.backgroundColor = "${bgcolor}";
              document.body.style.color = "${color}";` }
    );
  });
  dispatchNotification('Wonderful, now the background is a beauty!', `The new color is '${bgcolor}'`);
}

viewOptions.onclick = function(el) {
  chrome.tabs.create({ url: "options.html" }, function() {});
}

chrome.storage.sync.get('bgcolor', function(data) {
  changeColor.style.backgroundColor = data.bgcolor;
  changeColor.setAttribute('data-bgcolor', data.bgcolor);
  changeColor.innerText = data.bgcolor;
});

chrome.storage.sync.get('color', function(data) {
  changeColor.style.color = data.color;
  changeColor.setAttribute('data-color', data.color);
  changeColor.innerText = data.color;
});
