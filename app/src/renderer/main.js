import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
//import Router from 'vue-router'

import App from './App'
import Components from './components'
//import routes from './routes'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Components)
//Vue.use(Router)
Vue.config.debug = true;

// const router = new Router({
//   scrollBehavior: () => ({ y: 0 }),
//   routes
// })

/* eslint-disable no-new */
new Vue({
  //router,
  ...App
}).$mount('#app');
 
 const remote = require('electron').remote;
 const BrowserWindow = remote.BrowserWindow;  

//BrowserWindow.addDevToolsExtension('d:/My Documents/桌面/浏览器制作/vue/vue-devtools/shells/chrome');
//BrowserWindow.removeDevToolsExtension('Vue.js devtools');
// var dev =BrowserWindow.getDevToolsExtensions()
// console.log(dev);

