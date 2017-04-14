<template>
  <div class="browser-window">
      <div class="iconfont icon-suoxiao1" @click="hideShow"></div> 
      <div class="iconfont icon-suoxiao" @click="full"></div> 
      <div class="iconfont icon-guanbifuzhi" @click="close"></div> 
  </div>
</template>

<script>  
import { mapState } from 'vuex';
const BrowserWindow = require('electron').remote.BrowserWindow;
  export default {
    name: 'browser-window',
    data (){
      return { 
      }
    },
    computed: mapState({ 
      navs: state => state.webview.navs,  
      nowid: state => state.webview.nowid,
    }),
    methods:{ 
      hideShow:function(){ 
        BrowserWindow.getFocusedWindow().hide() 
      },
      full:function(){
        let win=BrowserWindow.getFocusedWindow()
        win.setFullScreen(!win.isFullScreen());
      },
      close:function(){
        BrowserWindow.getFocusedWindow().close() 
      }
    }
  }
</script>

<style scoped lang="less">
  .browser-window{
        position: absolute;
        right: 4px;
        top: 0px; 
        color: #fff;
        border: 1px solid #8B9CA9;
        border-width:0 1px 1px 1px;
        border-radius:2px;
        >div{ 
          display: inline;
          padding: 2px 6px; 
          border-right: 1px solid #8B9CA9;
        }
        .icon-guanbifuzhi{
          padding:1px 10px;
           border-right:0;
        }
  }
</style>
