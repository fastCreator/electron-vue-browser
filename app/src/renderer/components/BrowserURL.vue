<template>
  <div class="browser-url">
      <div @click="goback" class="iconfont icon-houtui" :class="{active:canGoBack}"></div>
      <div @click="goForward" class="iconfont icon-houtui forward" :class="{active:canGoForward}"></div>
      <div @click="reload" class="iconfont icon-qianjin"></div>  
      <devtools-extension></devtools-extension>
      <div class="input">
        <input id="gourl" type="text"  v-model="nowurl" @keydown.enter="loadurl($event)">
        <span class="iconfont shoucan" :class="{active:isactive,'icon-shoucang2':!isactive,'icon-shoucang1':isactive}" @click.stop="bookmark"></span>
      </div>
      <div class="control iconfont icon-gengduo"></div>
      <div class="control iconfont icon-extend" @click="openUrl('/static/html/devtool.html')"></div> 
      <div class="control iconfont icon-favorite" @click="openUrl('/static/html/favorites.html')"></div>
      <div class="control iconfont icon-chao" @click="openSuper"></div> 
  </div>
</template>

<script>  
import { mapState } from 'vuex'
  export default {
    name: 'browser-url',
    data (){ 
      return {   
      } 
    },
     computed: mapState({   
        nowurl: state => state.webview.nowurl, 
        nowid: state => state.webview.nowid,
        canGoBack: state => state.webview.canGoBack, 
        canGoForward: state => state.webview.canGoForward,
        isactive:state=>{  
          var favorites =  state.favorites.favorites; 
              for(var i in favorites){
                 var item = favorites[i]; 
                 for(var j in item){  
                   if(item[j] == state.webview.nowurl){ 
                     return true;
                   }
                 }
              }
              return false;
        }
    }),
    methods:{
      loadurl:function($event){ 
         this.$store.dispatch('WEBVIEW_LOAD_URL',$event.target.value); 
      },  
      reload:function(){
        this.$store.dispatch('WEBVIEW_RELOAD_URL'); 
      },
      goback:function(){ 
        if(this.canGoBack)
          this.$store.dispatch('WEBVIEW_BACK_URL'); 
      },
      goForward:function(){
        if(this.canGoForward){
          this.$store.dispatch('WEBVIEW_FORWARD_URL'); 
        }
      },
      bookmark:function(){
         this.$store.dispatch('favorites_click'); 
      },
      openSuper:function(){
        this.$store.dispatch('WEBVIEW_OPEN_SUPER','/static/html/super.html');
      },
      openUrl:function(url){
        this.$store.dispatch('WEBVIEW_OPEN_URL',url);
      }
    }
  } 
</script>

<style scoped lang="less">
    .browser-url{
          position: fixed;
          top: 28px;
          left: 0;
          width: 100%;
          height: 36px;
          background: #F2F2F2;
          display: block;
          border: 1px solid #B6B4B6;
          border-width: 1px 0;
      >*{
        float:left;
      } 
    }
    .forward{
      transform:rotate(180deg);
      margin-top: 3px;
    }
    .iconfont.icon-houtui{
      color:#D1D1D1;
      &.active{
        color:#36373A;
      }
      &:not(.active){
            cursor: default;
      }
    }
    .icon-qianjin{
      margin-top:1px;
    }
    .iconfont{
      font-size:18px;
      line-height: 35px;
      padding:0 5px;
      cursor: pointer;
      color:#5F5F5F;
    }
    .control{
      color:#5F5F5F;
      float:right; 
    }
    .input{ 
      position:relative;
      line-height: 35px;
      margin-left: 9px;
        input{
          display: inline-block;
          width: 100%;
          height: 25px;
          border: 1px solid #A9A9A9;
          border-radius: 4px;
          padding-left:6px;
          padding-right: 32px;
    }
    .shoucan{
          position: absolute;
          right: -34px;
          top: 0;
          &.active{
            color:#4285F4;
          }
      }
    } 
</style>
<style scoped>
.input{
      width: calc(100% - 244px);
}
</style>