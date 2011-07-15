var console;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
console = chrome.extension.getBackgroundPage().console;
document.addEventListener('DOMContentLoaded', __bind(function() {
  $('#search').attr('readonly', true);
  $('#result').empty().append('<dl id="windows"></dl>');
  return chrome.windows.getAll({
    populate: true
  }, __bind(function(windows) {
    var icon, tab, win, win_el, win_num, _i, _j, _len, _len2, _ref;
    win_num = 0;
    for (_i = 0, _len = windows.length; _i < _len; _i++) {
      win = windows[_i];
      if (!win.incognito && win.type === 'normal') {
        win_el = $('<dt id="win_' + win.id + '" class="window"><h3>Window ' + (++win_num) + '</h3></dt>').appendTo('#windows');
        _ref = win.tabs;
        for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
          tab = _ref[_j];
          if (tab.url.indexOf('chrome') !== 0) {
            icon = tab.favIconUrl || 'gfx/favicon.ico';
            icon = '<img class="icon" src="' + icon + '" />';
            win_el.append('<p id="tab_' + tab.id + '" class="tab">' + icon + '<span class="title">' + tab.title + '</span><span class="url">' + tab.url + '</span></p>');
          }
        }
      }
    }
    return $('#search').attr('readonly', false);
  }, this));
}, this));