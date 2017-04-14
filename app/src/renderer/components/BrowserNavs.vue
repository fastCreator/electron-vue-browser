<template>
  <div class="browser-navs">
      <div v-for="(item, key) in navs" :class="['item',{active:nowid==key}]" key="key" @click="selectUrl(key)">
          <div class="before"></div>
          <div class="content">  
             <img  v-if="!item.super&&item.icon" :src="item.icon" class="icon">
             <img  v-if="item.super" src="../img/super.png" class="icon">
            <span class="title">{{item.title||'正在加载中...'}}</span>
            <span class="close iconfont icon-guanbifuzhi" @click.stop="removeUrl(key)"></span>
          </div> 
          <div class="after"></div>
      </div>
      <div class="browser-add" @click="addwebView"></div>
  </div>
</template>

<script>  
import { mapState } from 'vuex';
const BrowserWindow = require('electron').remote.BrowserWindow;
var mouse={
  win:null,
  mpos:[],
  wpos:[],
  size:[]
}

  export default {
    name: 'browser-navs',
    data (){
      return {  

      }
    },
    computed: mapState({ 
      navs: state => state.webview.navs,  
      nowid: state => state.webview.nowid
    }),
    methods:{
      selectUrl:function(key){  
          this.$store.dispatch('WEBVIEW_SELECT_URL',key); 
      },
      removeUrl:function(key){  
          this.$store.dispatch('WEBVIEW_REMOVE_URL',key); 
      },
      addwebView:function(){
          this.$store.dispatch('WEBVIEW_ADD_URL'); 
      } 
    },
    created:function(){
          this.$store.dispatch('WEBVIEW_ADD_URL'); 
    }
  }
</script>

<style scoped lang="less">
    @nav-height:28px;
    .browser-navs{
      padding-left: 12px;
      height: @nav-height;
      width:100%;
      overflow: hidden;
      position:fixed;
      background:rgba(4,6,9,0.8);
      top:0;
      left:0; 
      .browser-add{
        background: #A4A4A5;
        width: 26px;
        height: 16px;
        float: left;
        transform: skew(24deg);
        margin-top: 6px;
        margin-left: 8px;
      }
      .item{
        float: left;
        display: inline;
        margin: 0 -6px;
          &.active{
            z-index:10;
            >.before{  
            border-bottom: @nav-height solid #fff; 
            }
            >.after{  
            border-bottom: @nav-height solid #fff; 
            &:after{ 
              width:0;
            }
            }
            .content{
              background: #fff;
            }
          } 
          *{
            float:left;
          }   
          >.before{ 
            float: left;
            display: inline-block;
            content:'';
            width:0;
            height:0;  
            border-bottom: @nav-height solid #A5A6A7;
            border-left: 12px solid transparent;  
          }
          >.after{ 
            float: right;
            display: inline-block;
            content:'';
            width:0;
            height:0;  
            border-bottom: @nav-height solid #A5A6A7;
            border-right: 12px solid transparent; 
            position:relative;
             &:after{
                  content: '';
                  display: inline-block;
                  width: 1px;
                  height: 38px;
                  background: #7E7E7F;
                  position: absolute;
                  right: -7px;
                  top: -3px;
                  transform: rotate(-23deg);
            }
          }
          .icon{
            width: 18px;
            height: 18px;
            margin: 2px;
          }
          .content{ 
              display:inline; 
              background: #A5A6A7;
              padding: 4px 2px; 
              .title{
                color:#010102;
                line-height: 22px;
              }
              >span{
                max-width: 130px;
                overflow: hidden;
                white-space: nowrap;
              }
              .close{ 
                    cursor: default;
                    color: #343435;
                    font-size: 10px;
                    border-radius: 100%;
                    display: inline;
                    padding: 2px;
                    line-height: 10px;
                    margin-top: 2px;
                    margin-left: 2px;
              }
              .close:hover{
                  background-color: #DD6E64;
                  color:#fff;
              }
          }
      }
    }
</style>
