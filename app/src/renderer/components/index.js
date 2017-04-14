import browserNavs from './BrowserNavs';
import browserURL from './browserURL';
import BrowserWebview from './BrowserWebview';
import DevtoolsExtension from './DevtoolsExtension';
import BrowserBookmark from './BrowserBookmark';
import BrowserWindow from './BrowserWindow'; 
const install = function (Vue, opts = {}) {
    Vue.component(browserNavs.name, browserNavs)
    Vue.component(browserURL.name, browserURL)
    Vue.component(BrowserWebview.name, BrowserWebview)
    Vue.component(DevtoolsExtension.name, DevtoolsExtension)
    Vue.component(BrowserBookmark.name, BrowserBookmark)
    Vue.component(BrowserWindow.name, BrowserWindow) 
};

export default {
    install: install
}

