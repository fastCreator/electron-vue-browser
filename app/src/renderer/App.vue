<template>
  <div id="#app" @keydown="keydown" @click="click">
    <browser-navs></browser-navs>
    <!--<browser-window></browser-window>-->
    <browser-url></browser-url>  
    <browser-bookmark></browser-bookmark>
    <browser-webview ref="webview"></browser-webview>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store';  
  export default {
    store, 
    methods:{
      keydown:function(e){ 
         switch(e.key)
          {
          case 'F12':    
            this.$refs.webview.$emit('openDev')
            break; 
          }
      },
      click:function(){
         this.$store.commit('favorites_click',true);
      }
    }
  }
</script>

<style lang="less"> 
  @import "./style/iconfont.css";
  * {
    margin: 0;
    padding: 0;
  }
  
  html,
  body {
    height: 100%;
  } 
  body {
    font-size:12px;
    color:#010102;
    align-items: center;
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
  .iconfont{ 
      cursor: pointer; 
    }
</style>
