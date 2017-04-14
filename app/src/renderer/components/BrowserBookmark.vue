<template>
  <div class="browser-bookmark" v-show="show" @click.stop>
      <div class="title">已保存书签</div>
      <label><span>名字:</span><input type="text" v-model="title"></label>
      <label><span>地址:</span><input type="text" v-model="nowurl"></label>
      <div class="opt">
          <!--<div @click="addhistory">/添加/</div> 
          <div @click="lookhistory">/查看/</div>
          <div @click="deletehistory">/删除/</div>-->

          <div @click="deletehistory">删除</div> 
          <div @click="look">查看</div>
          <div @click="hideen">完成</div>
      </div>
      
  </div>
</template>

<script>  
import { mapState } from 'vuex'
const { ipcRenderer } = require('electron');
  export default {
    name: 'browser-bookmark',
    data (){
      return { 
      }
    },
    created:function(){
      var that =this;
      this.$store.dispatch('favorites_init'); 
      ipcRenderer.on('favorites', function (event, arg) {   
        that.$store.commit('favorites_INIT',arg);
      });
      ipcRenderer.on('favorites-add-success', function (event, arg) { 
        that.$store.commit('favorites_ADD',arg);
      });
      ipcRenderer.on('favorites-delete-success', function (event, arg) {
        that.$store.commit('favorites_DELETE',arg);
        that.$store.commit('favorites_click');
      });
    },
    computed: mapState({ 
      navs: state => state.webview.navs,  
      nowid: state => state.webview.nowid,
      nowurl: state => state.webview.nowurl,
      title: state => {
        if(state.webview.nowid){ 
          return state.webview.navs[state.webview.nowid].title;
        }else{
          return '';
        } 
      },
      show: state => state.favorites.show,
    }),
    methods:{ 
      look:function(){
        console.log(this.$store.state.favorites)
      }, 
      deletehistory:function(){
        this.$store.dispatch('favorites_delete',{path:'default',key:this.title}); 
      }, 
      hideen:function(){
        this.$store.dispatch('favorites_click'); 
      }
    }
  }
</script>

<style scoped lang="less">
  .browser-bookmark{
    z-index: 20;
    border: 1px solid #CDCDCD;
    padding:0 20px 20px;
    position: fixed;
    top: 58px;
    right: 81px;
    background: #FBFBFB;
    text-align: left;
    .title{
      text-align:center;
      margin:10px 0;
    }
    label{
          margin-top:6px;
          display: block;
          span{
            display: inline-block;
            width:44px;
          }
    }
    .opt{
      margin-top:12px; 
      text-align: center;
      >div{
        display:inline;
        border:1px solid #CBCBCB;
        padding:4px 6px;
        margin:0 6px;
        cursor: pointer;
      }
    }
  }
</style>
