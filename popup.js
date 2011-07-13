console = chrome.extension.getBackgroundPage().console;

document.addEventListener('DOMContentLoaded', function() {

  //chrome.extension.getViews().forEach(function(view) { console.log(view.location.href) });

  $('#search').attr('readonly', true);

  $('#result').empty().append('<dl id="windows"></dl>');

  chrome.windows.getAll({ populate: true }, function(windows) {
    var win_num = 0;

    windows.forEach(function(win) {

      if (!win.incognito && win.type == 'normal') {
        var win_el = $('<dt id="win_' + win.id + '" class="window"><h3>Window ' + (++win_num) + '</h3></dt>').appendTo('#windows');

        win.tabs.forEach(function(tab) {
          if (tab.url.indexOf('chrome') !== 0) {
            win_el.append('<p id="tab_' + tab.id + '" class="tab"><span class="title">' + tab.title + '</span><span class="url">' + tab.url + '</span></p>');
          }

        });
        
      }

    });

    $('#search').attr('readonly', false);

  });
  
  //chrome.tabs.getAllInWindow(function(tabs) { console.log(tabs[0]) });

});
