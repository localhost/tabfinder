var console;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
console = chrome.extension.getBackgroundPage().console;
document.addEventListener('DOMContentLoaded', __bind(function() {
  $('#term').attr('readonly', true);
  $('#result').empty().append('<dl id="windows"></dl>');
  return chrome.windows.getLastFocused(__bind(function(win_last_focused) {
    return chrome.windows.getAll({
      populate: true
    }, __bind(function(windows) {
      var class_focused, class_selected, icon, tab, win, win_el, win_focused, win_num, _i, _j, _len, _len2, _ref;
      win_num = 0;
      for (_i = 0, _len = windows.length; _i < _len; _i++) {
        win = windows[_i];
        win_focused = win_last_focused.id === win.id;
        class_focused = win_focused ? ' focused' : '';
        if (!win.incognito && win.type === 'normal') {
          win_el = $('<dt id="win_' + win.id + '" class="window' + class_focused + '"><h3>Window ' + (++win_num) + ' <span class="num">(' + win.tabs.length + ')</span></h3></dt>').appendTo('#windows');
          _ref = win.tabs;
          for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
            tab = _ref[_j];
            if (tab.url.indexOf('chrome') !== 0) {
              class_selected = win_focused && tab.selected ? ' active' : '';
              icon = tab.favIconUrl || 'gfx/favicon.ico';
              icon = '<img class="icon" src="' + icon + '" />';
              win_el.append('<p id="tab_' + tab.id + '" class="tab' + class_selected + '">' + icon + '<span class="title">' + tab.title + '</span><span class="url">' + tab.url + '</span></p>');
            }
          }
        }
      }
      $('#result').delegate('p.tab', 'click', __bind(function(e) {
        var tab_id;
        tab_id = parseInt(e.currentTarget.id.substring(4));
        chrome.tabs.update(tab_id, {
          selected: true
        });
        return e.stopPropagation();
      }, this));
      $('#term').bind('keyup', __bind(function(e) {
        var term;
        term = $('#term').val().toLowerCase();
        if (term) {
          return $('p.tab').each(__bind(function(index, el) {
            if ($(el).text().toLowerCase().indexOf(term) === -1) {
              return $(el).hide();
            } else {
              return $(el).show();
            }
          }, this));
        } else {
          return $('p.tab').each(__bind(function(index, el) {
            return $(el).show();
          }, this));
        }
      }, this));
      $('#term').attr('readonly', false);
      return $('#term').focus();
    }, this));
  }, this));
}, this));