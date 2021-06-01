import { theme } from '@morfeo/web';
import { colors, components, spaces, sizes } from './builders';

const builders = [colors, spaces, sizes, components];

function reset() {
  const dynamicContents = document.querySelectorAll('.dynamic');
  dynamicContents.forEach(element => {
    element.innerHTML = '';
  });
}

function build() {
  builders.forEach(builder => builder());
}

theme.subscribe(build);

function onPanelCreate(panel) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'GET_THEME' }, response => {
        if (response && response.theme) {
          theme.set(response.theme);
        }
      });
    }
  });

  chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'MORFEO_DEVTOOLS') {
      port.onMessage.addListener(function (message) {
        if (message.theme) {
          reset();
          theme.set(message.theme);
        }
      });
    }
  });
}

function createPanel() {
  chrome.devtools.panels.create(
    'morfeo',
    'images/logo.png',
    'index.html',
    onPanelCreate,
  );
}

createPanel();