console = chrome.extension.getBackgroundPage().console;

document.addEventListener('DOMContentLoaded', function() {
  chrome.extension.getViews().forEach(function(view) { console.log(view.location.href) })
});
