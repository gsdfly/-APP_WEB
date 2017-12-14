<template>
  <div class="ableexchangedolls" v-show="htmlShow">
    <div class="header">
      <h3>选择要寄送的娃娃</h3>
    </div>
    <ul class="main">
      <li v-for="doll in dolllist">
        <img :src="doll.picture" alt="">
        <p>{{doll.name}}</p>
        <div class="checkbox">
          <input type="checkbox" name="doll" @click="addDoll(doll,$event)"/><span></span>
        </div>
      </li>
    </ul>
    <div class="footer">
      <button class="btn" @click="exchange">确定</button>
    </div>
  </div>
</template>

<script>
  import { Checkbox } from 'vant';
  import { MessageBox } from 'mint-ui';
  import {getDollList,getDollOrderList,getDollOrder,exchangeDolls} from './../util/ajax'
  export default {
    data(){
      return {
        htmlShow:false,
        dolllist:[],
        dolls:[]
      }
    },
    created(){
      this.Indicator.open();
    },
    mounted(){
      getDollList({status:0}).then((data) => {
        this.dolllist = data.response.list;
        this.Indicator.close();
        this.htmlShow = true;
      })
    },
    methods:{
      addDoll(item,event){
        if(event.target.checked){
          event.target.nextSibling.className = 'iconfont icon-check';
          this.dolls.push(item);
        }else {
          event.target.nextSibling.className = '';
          this.dolls.splice(this.dolls.indexOf(item),1);
        }
      },
      exchange(){
        if(this.dolls.length<2){
          MessageBox('提示', '一次兑换的娃娃数量，不能少于2个');
          return;
        }
        localStorage.setItem('dolls',JSON.stringify(this.dolls));
//        this.$router.push({path:'exchangedolls',query:this.dolls});
        this.$router.push('exchangedolls');
      },
    }
  }
</script>

<style scoped>
  .ableexchangedolls{
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
  .ableexchangedolls h3{
     font-size: 0.64rem;
     font-weight: 600;
     line-height: 0.64rem;
     margin: 0.52rem 0 0.56rem 0;
   }
  .ableexchangedolls h3 span{
    font-size: 0.52rem;
    color:#fc8a15;
    float: right;
    font-weight: normal;
  }

  .ableexchangedolls .main{
    width: 100%;
    margin: 1.77rem 0 1.85rem 0;
    overflow: hidden;
  }
  .ableexchangedolls .main li{
    width: calc((100% - 0.32rem)/2);
    border: 1px solid #c1c1c1;
    border-radius: 0.1rem;
    float: left;
    margin: 0 0.32rem 0.32rem 0;
    position: relative;
  }
  .ableexchangedolls .main li:nth-child(2n){
    margin: 0 0 0.32rem 0;
  }
  .ableexchangedolls .main li img{
    display: block;
    width: 100%;
    height: 3.65rem;
    vertical-align: top;
  }
  .ableexchangedolls .main li>p{
    font-size: 0.36rem;
    height: 0.73rem;
    color: #494949;
    background:#f8ede1;
    font-weight: 600;
    line-height: 0.73rem;
    text-indent: 0.23rem;
  }
  .checkbox{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .checkbox input{
    position: absolute;
    right:0.1rem;
    bottom: 0.1rem;
    width: 0.72rem;
    height: 0.72rem;
    opacity: 0;
    z-index: 2;
  }
  .checkbox span{
    position: absolute;
    right:0.1rem;
    bottom: 0.1rem;
    width: 0.72rem;
    height: 0.72rem;
    border: 1px solid #e1e1e1;
    background: #fff;
    border-radius: 50%;
  }
  .checkbox span.iconfont{
    border: none;
    font-size: 0.72rem;
    color: #32d894;
  }
  .footer{
    width: 100%;
    height: 1.8rem;
    background: #999999;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .btn{
    width: 7.6rem;
    height: 1.16rem;
    border: none;
    outline: none;
    background: url("./../assets/images/press.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.46rem;
    font-weight: 600;
    display: block;
    margin:0.32rem auto;
  }

</style>
