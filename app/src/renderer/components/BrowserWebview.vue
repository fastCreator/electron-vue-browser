<template>
    <div class="browser-webview">
      <template v-for="(item, key) in navs" plugins="on" >
           <webview  v-if="item.super" nodeintegration :key="key" :src="item.url" :id="key" v-show="key==nowid"></webview>
           <webview  v-else :key="key" :src="item.url" :id="key" v-show="key==nowid"></webview>
           
      </template>
     
    </div>
</template>

<script>  
import { mapState } from 'vuex' 
  export default {
    name: 'browser-webview',
    data (){ 
        return {  
        }
    }, 
    computed: mapState({ 
      nowid: state => state.webview.nowid, 
      navs: state => state.webview.navs, 
    }),
    methods:{ 

    }, 
    mounted:function(){
       this.$on('openDev',function(){
          document.getElementById(this.nowid).openDevTools();
       })
    }
  }
</script>

<style scoped lang="less"> 
.browser-webview{
    position: fixed;
    top: 66px;
    left: 0;
    bottom:0;
    width: 100%; 
}
webview{
  display:inline-flex; 
  width:100%; 
  height:100%
}
</style>
