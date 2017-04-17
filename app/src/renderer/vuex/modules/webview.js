import Vue from 'vue'
import * as types from '../mutation-types'
import { remove } from 'renderer/util'
var count = 0; 
const SEARCHURL ='https://www.baidu.com/s?&back=true&wd='
const state = {
  navs: {
  },
  nowid: -1,
  nowurl: '',
  canGoBack: false,
  canGoForward: false
}
const mutations = {
  [types.WEBVIEW_OPEN_URL](state, url) {
    state.nowid = ++count;
    Vue.set(state.navs, count, {
      url: url
    });
    selectUrl(state.nowid);
    state.nowurl = '';
  },
  [types.WEBVIEW_OPEN_SUPER](state, url) {
    state.nowid = ++count;
    Vue.set(state.navs, count, {
      url: url,
      super: true
    });
    selectUrl(state.nowid);
    state.nowurl = '';
  },
  [types.WEBVIEW_ADD_URL](state, url) {
    state.nowid = ++count;
    Vue.set(state.navs, count, {
      url: '/static/html/blank.html'
    });
    selectUrl(state.nowid);
    state.nowurl = '';
  },
  [types.WEBVIEW_SELECT_URL](state, url) {
    selectUrl(url);
  },
  [types.WEBVIEW_REMOVE_URL](state, url) {
    if (Object.keys(state.navs).length > 1) {
      selectUrl(getOldcount(url))
      Vue.delete(state.navs, url);
    } else {
      require('electron').remote.app.quit();
    }
  },
  [types.WEBVIEW_RELOAD_URL](state) {
    var webview = document.getElementById(state.nowid);
    webview.reload();
  },
  [types.WEBVIEW_BACK_URL](state) {
    var webview = document.getElementById(state.nowid);
    webview.goBack();
    if (~webview.src.indexOf(SEARCHURL)) {
      webview.goBack();
    }
  },
  [types.WEBVIEW_FORWARD_URL](state, url) {
    var webview = document.getElementById(state.nowid);
    webview.goForward(); 
  },
  [types.WEBVIEW_LOAD_URL](state, url) {
    var webview = document.getElementById(state.nowid);
    if (/^http/.test(url)) {
      webview.loadURL(url);
    } else {
      webview.loadURL('http://' + url);
    }

  },
  [types.WEBVIEW_FINISH_LOAD](state, webview) {
    state.canGoBack = webview ? webview.canGoBack() : false;
    state.canGoForward = webview ? webview.canGoForward() : false;
    Vue.set(state.navs[state.nowid], 'title', webview.getTitle());
    updateUrl(webview);
  },
  [types.WEBVIEW_FAVICON_FLASH](state, favicon) {
    Vue.set(state.navs[state.nowid], 'icon', favicon);
  }
}
const actions = {
  [types.WEBVIEW_OPEN_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_OPEN_URL, url);
    Vue.nextTick(function () {
      dispatch('addWebview', url);
    })
  },
  [types.WEBVIEW_OPEN_SUPER]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_OPEN_SUPER, url);
    Vue.nextTick(function () {
      dispatch('addWebview', url);
    })
  },
  [types.WEBVIEW_ADD_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_ADD_URL, url);
    Vue.nextTick(function () {
      dispatch('addWebview', url);
    })
  },
  [types.WEBVIEW_SELECT_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_SELECT_URL, url);
    var webview = document.getElementById(state.nowid);
    commit(types.WEBVIEW_FINISH_LOAD, webview);
  },
  [types.WEBVIEW_REMOVE_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_REMOVE_URL, url);
    var webview = document.getElementById(state.nowid);
    commit(types.WEBVIEW_FINISH_LOAD, webview);
  },
  [types.WEBVIEW_RELOAD_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_FAVICON_FLASH, null);
    commit(types.WEBVIEW_RELOAD_URL, url);
  },
  [types.WEBVIEW_BACK_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_FAVICON_FLASH, null);
    commit(types.WEBVIEW_BACK_URL);
  },
  [types.WEBVIEW_FORWARD_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_FAVICON_FLASH, null);
    commit(types.WEBVIEW_FORWARD_URL, url);
  },
  [types.WEBVIEW_LOAD_URL]({ dispatch, commit }, url) {
    commit(types.WEBVIEW_FAVICON_FLASH, null);
    commit(types.WEBVIEW_LOAD_URL, url);
  },
  addWebview({ dispatch, commit }, url) {
    var webview = document.getElementById(state.nowid);
    webview.addEventListener('did-finish-load', function () {
      commit(types.WEBVIEW_FINISH_LOAD, webview);
    });
    webview.addEventListener('page-favicon-updated', function (event) {
      var icon = event.favicons[0];
      if (!~icon.indexOf('noicon'))
        commit(types.WEBVIEW_FAVICON_FLASH, icon);
    });
    webview.addEventListener('did-fail-load', function (event) { 
       commit(types.WEBVIEW_LOAD_URL, SEARCHURL+document.getElementById('gourl').value);
    });
  }
}

function updateUrl(webview) {
  var url = webview.src;
  if (~url.indexOf('/static/html/blank.html')) {
    state.nowurl = '';
  } else if (~url.indexOf('/static/html/favorites.html')) {
    state.nowurl = '';
  } else if (~url.indexOf('/static/html/super.html')) {
    state.nowurl = '';
  } else {
    state.nowurl = url;
  }
}

function getOldcount(key) {
  var keys = Object.keys(state.navs);
  var count = keys.indexOf(key);
  if (count < keys.length - 1) {
    return keys[count + 1]
  } else {
    return keys[count - 1]
  }
}


function selectUrl(id) {
  state.nowid = id;
  state.nowurl = state.navs[id].url;
}

export default {
  state,
  actions,
  mutations
}
