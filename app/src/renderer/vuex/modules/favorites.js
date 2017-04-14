import * as types from '../mutation-types';
import Vue from 'vue';
const { ipcRenderer } = require('electron');
const state = {
    show: false,
    favorites: {}
}

const mutations = {
    [types.favorites_INIT](state, json) {
        state.favorites = json
    },
    [types.favorites_ADD](state, json) {
        Vue.set(state.favorites[json.path], json.key, json.value);
    },
    [types.favorites_DELETE](state, json) {
        Vue.delete(state.favorites[json.path], json.key)
    },
    [types.favorites_click](state, hidden) { 
        if (hidden) {
            state.show = false;
        } else {
            state.show = !state.show;
        }
    }
}

const actions = {
    favorites_add({ dispatch, commit }, data) {
        ipcRenderer.send('add-favorites', data);
    },
    favorites_delete({ dispatch, commit }, data) {
        ipcRenderer.send('delete-favorites', data);
    },
    favorites_click({ dispatch, commit, rootState }, data) {
        var webview = rootState.webview
        var value = webview.nowurl;
        if (value) {
            commit(types.favorites_click);
            dispatch('favorites_add', {
                path: 'default',
                key: webview.navs[webview.nowid].title,
                value: value,
            });
        }
    },
    favorites_init() {
        ipcRenderer.send('get-favorites');
    }
}

export default {
    state,
    mutations,
    actions
}