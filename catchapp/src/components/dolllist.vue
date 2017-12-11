<template>
  <div class="dolllist" v-show="htmlShow">
   <div class="header">
     <back></back>
     <h3>我的娃娃<span @click="sendDoll">寄送娃娃<i class="iconfont icon-go"></i></span></h3>
     <ul class="datalist">
       <li>
         <h4>{{dolllist.length}}</h4>
         <p>总数量</p>
       </li>
       <li>
         <h4>{{dolllist.length - already}}</h4>
         <p>待寄送</p>
       </li>
       <li>
         <h4>{{already}}</h4>
         <p>已寄送</p>
       </li>
     </ul>
   </div>
    <ul class="main">
      <li v-for="doll in dolllist" :class="{activedoll:doll.status ==1}">
        <img :src="doll.picture" alt="">
        <p>{{doll.name}}</p>
        <div class="tip">
          <p>{{doll.status ==1 ? '已寄送' : '待寄送'}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getDollList} from './../util/ajax'
  import back from './back.vue'
  export default {
      data(){
        return {
          htmlShow:false,
          dolllist:[],
          dolls:[],
          already:0
        }
      },
      created(){
        this.Indicator.open();
      },
      mounted(){
        getDollList().then((data) => {
          this.dolllist = data.response.list;
          for(var index in this.dolllist){
            if(this.dolllist[index].status){
              this.already++;
            }
          }
          this.Indicator.close();
          this.htmlShow = true;
        })
      },
      methods:{
        sendDoll(){
          this.$router.push('ableexchangedolls');
        }
      },
      components:{
          back
      }
  }
</script>

<style scoped>
  .dolllist{
    width: 100%;
    height: 100%;
    padding:0.1px 0.32rem 0 0.32rem;
    overflow: auto;
  }
    .header{
      width: 100%;
      background: #fff;
      position: fixed;
      left: 0;
      top:0;
      z-index: 666;
      padding: 0 0.32rem;
    }
  .dolllist h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.88rem 0;
  }
  .dolllist h3 span{
    font-size: 0.52rem;
    color:#fc8a15;
    float: right;
    font-weight: normal;
  }
  .dolllist .datalist{
    width: 100%;
    height: 1.3rem;
    margin: 0 0 0.97rem 0;
  }
  .dolllist .datalist li{
    width: 33.33%;
    height: 100%;
    float: left;
    color: #666666;
    text-align: center;
    border-right: 1px solid #c1c1c1;
  }
  .dolllist .datalist li:last-child{
    border-right: none;
  }
  .dolllist .datalist li h4{
    width: 100%;
    height: 0.82rem;
    line-height: 0.82rem;
    font-size: 0.52rem;
    font-weight: 600;
  }

  .dolllist .datalist li p{
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.44rem;
    font-family: S-Regular;
  }
  .dolllist .main{
    width: 100%;
    /*height: calc(100% - 4.49rem);*/
    margin: 5.46rem 0 0 0;
  }
  .dolllist .main li{
    width: calc((100% - 0.32rem)/2);
    border: 1px solid #fc8a15;
    border-radius: 0.1rem;
    float: left;
    margin: 0 0.32rem 0.32rem 0;
    position: relative;
    overflow: hidden;
  }
  .dolllist .main li:nth-child(2n){
    margin: 0 0 0.32rem 0;
  }
  .dolllist .main li img{
    display: block;
    width: 100%;
    height: 3.65rem;
    vertical-align: top;
  }
  .dolllist .main li>p{
    font-size: 0.36rem;
    height: 0.73rem;
    color: #494949;
    background:#f8ede1;
    font-weight: 600;
    line-height: 0.73rem;
    text-indent: 0.23rem;
  }
  .dolllist .main li .tip{
    width: 2.1rem;
    height: 2.1rem;
    background: #fc8a15;
    position: absolute;
    top:-1.05rem;
    left: -1.05rem;
    transform: rotate(-45deg);

  }
  .dolllist .main li .tip p{
    width: 100%;
    font-size: 0.36rem;
    color: #fff;
    line-height: 0.64rem;
    text-align: center;
    position: absolute;
    bottom: 0;
  }
  .dolllist .main li.activedoll{
    border:1px solid #c1c1c1;
  }
  .dolllist .main li.activedoll .tip{
    background: #cacaca;
  }


</style>
