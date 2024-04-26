const blacklistedSites = [
  'zoom.us/j/',
  'chrome-extension://',
  'chrome://',
  'midway-auth.amazon',
];
window.addEventListener("SAVE_TO_STORAGE", ({detail}) => {
  const key = Object.keys(detail)[0];
  
  chrome.storage.local.set(detail);
  document.querySelector('#plugin_boh').setAttribute(`data-get${key}`, detail[key])
});
window.addEventListener("GET_FROM_STORAGE", ({detail}) => chrome.storage.local.get(detail).then(res => document.querySelector('#plugin_boh').setAttribute(`data-get${detail}`, res[detail])));

if (!blacklistedSites.find((query) => window.location.href.includes(query)) && window.history.length <= 1 && !document.referrer) {
  fetch(chrome.runtime.getURL('/index.html')).then(r => r.text()).then(html => {
   document.body.insertAdjacentHTML('beforeend', html);
    
    const requestScript = document.createElement('script');
    requestScript.src = chrome.runtime.getURL('/scripts/requests.min.js');
    document.querySelector('#plugin_boh').appendChild(requestScript);

    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('/scripts/plugin-logic.min.js');
    document.querySelector('#plugin_boh').appendChild(script);
  });
}