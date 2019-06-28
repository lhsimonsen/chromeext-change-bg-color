const buttonDiv = document.querySelector('#buttonDiv');
const colors = ['tomato', 'blueviolet', 'cream', 'darkcyan'];

const setColorSelectorButtons = () => {
  colors.forEach(color => {
    const btn = document.createElement('button');
    btn.style.backgroundColor = color;
    btn.innerText = color;
    btn.addEventListener('click', () => {
      chrome.storage.sync.set({bgcolor: color, color: '#eee'}, function() {
        console.log(`The bgcolor is ${color}, color is #eee`);
      });
    });
    buttonDiv.appendChild(btn);
  });
}
setColorSelectorButtons(colors);
