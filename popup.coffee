console = chrome.extension.getBackgroundPage().console;

document.addEventListener 'DOMContentLoaded', =>
  $('#term').attr 'readonly', true
  $('#result').empty().append '<dl id="windows"></dl>'

  chrome.windows.getAll populate: true, (windows) =>
    win_num = 0
    for win in windows
      if !win.incognito && win.type == 'normal'
        win_el = $('<dt id="win_' + win.id + '" class="window"><h3>Window ' + (++win_num) + ' <span class="num">(' + win.tabs.length + ')</span></h3></dt>').appendTo '#windows'
        for tab in win.tabs
          unless tab.url.indexOf('chrome') == 0
            icon = tab.favIconUrl || 'gfx/favicon.ico'
            icon = '<img class="icon" src="' + icon + '" />'
            win_el.append '<p id="tab_' + tab.id + '" class="tab">' + icon + '<span class="title">' + tab.title + '</span><span class="url">' + tab.url + '</span></p>'

    $('#result').delegate 'p.tab', 'click', (e) =>
      tab_id = parseInt e.currentTarget.id.substring(4)
      win_id = parseInt $(e.currentTarget).parent()[0].id.substring(4)
      #console.log("event for tab %i in win %i", tab_id, win_id)
      chrome.tabs.update tab_id, selected: true
      e.stopPropagation()

    $('#term').attr 'readonly', false
    $('#term').focus()
