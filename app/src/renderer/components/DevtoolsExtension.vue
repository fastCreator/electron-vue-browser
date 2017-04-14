<template>
  <div class="devtools-extension">
       <input type="file">
  </div>
</template>

<script>  
import { mapState } from 'vuex'
  export default {
    name: 'devtools-extension',
    data (){
      return { 
      }
    },
    computed: mapState({ 
      // navs: state => state.webview.navs,  
      // nowid: state => state.webview.nowid,
    }),
    methods:{
       addDevToolsExtension:function(){
         BrowserWindow.addDevToolsExtension(extension)
       }
    }
  }
</script>

<style scoped lang="less">
    .devtools-extension{
      display:none;
    }
</style>
