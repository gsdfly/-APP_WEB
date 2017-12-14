<template>
  <div class="exchangedolls" v-show="htmlShow">
    <div class="header header2">
      <h3>确认订单</h3>
      <div class="defaultAddress">
        <h4><span>{{defaultAddress.name}}</span><i>{{defaultAddress.phone}}</i></h4>
        <dl class="address">
          <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
          <dd>{{''+defaultAddress.province+defaultAddress.city+defaultAddress.area+defaultAddress.address}}</dd>
        </dl>
        <a @click="goAddressList" href="javascript:void(0)">其他地址<i class="iconfont icon-go1"></i></a>
      </div>
    </div>
    <div class="header2">
      <back></back>
      <h3>确认订单</h3>
      <div class="defaultAddress">
        <h4><span>{{defaultAddress.name}}</span><i>{{defaultAddress.phone}}</i></h4>
        <dl class="address">
          <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
          <dd>{{''+defaultAddress.province+defaultAddress.city+defaultAddress.area+defaultAddress.address}}</dd>
        </dl>
        <a @click="goAddressList" href="javascript:void(0)">其他地址<i class="iconfont icon-go1"></i></a>
      </div>
    </div>
    <ul class="dolls">
      <li v-for="item in dolls">
        <img :src="item.picture" alt="">
        <p>{{item.name}}</p>
        </li>
    </ul>
    <div class="footer">
      <button class="btn" @click="confirmExchange">确认兑换</button>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import {getAddressDefault,exchangeDolls} from './../util/ajax'
  export default {
    data(){
      return {
        htmlShow:false,
        dolls:[],
        defaultAddress:{},
      }
    },
    created(){
      this.Indicator.open();
    },
    mounted(){
      this.dolls = JSON.parse(localStorage.getItem('dolls'));
      if(this.$route.query.name){
        this.defaultAddress = this.$route.query;
        this.htmlShow = true;
        setTimeout(()=>{
          this.Indicator.close();
        },100);
      }else {
        getAddressDefault().then((data) => {
          if(data.response.list){
            this.defaultAddress = data.response.list;
            this.htmlShow = true;
          }else {
//          直接去添加地址页面
            MessageBox.alert('您还没有收货地址，前先添加收货地址').then(() => {
              this.$router.push({path:'addressedit',query:{local:'exchangedolls'}});
            });
          }
          this.Indicator.close();
        })
      }
    },
    methods:{
      confirmExchange(){
        var doll_ids = [];
        for(var index in this.dolls){
          doll_ids.push(this.dolls[index].id);
        }
        var address_id = this.defaultAddress.id;
        exchangeDolls({doll_ids:doll_ids,address_id:address_id}).then((data) => {
          this.$router.push('orders');
        })
      },
      goAddressList(){
        this.$router.push('addresslist');
      }
    },
  }
</script>

<style scoped>

  .exchangedolls{
    width: 100%;
    height: 100%;
    padding:0.1px 0.32rem 0 0.32rem;
    font-size: 0.48rem;
    color:#494949;
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
.exchangedolls .header2 h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.56rem 0;
    color: black;
  }

  .defaultAddress{
    width: 100%;
    padding: 0.38rem 0.45rem;
    border: 3px solid #fc8a15;
    border-radius: 5px;
    overflow: hidden;
    margin: 0 0 0.55rem 0;
  }
  .defaultAddress h4{
    line-height: 0.48rem;
    margin: 0 0 0.3rem 0;
  }
  .defaultAddress h4 i{
    float: right;
  }
  .defaultAddress .address{

    width: 100%;
    overflow: hidden;
  }
  .defaultAddress .address dt{
    float: left;
    width:8%;
  }
  .defaultAddress .address dt i{
    font-size: 0.64rem;
  }
  .defaultAddress dd{
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
  }
  .defaultAddress a{
    float: right;
    color: #999999;
    font-size: 0.4rem;
    line-height: 0.4rem;
    margin: 0.2rem;
    font-family: S-Regular;
  }
  .defaultAddress a i{
    font-size: 0.5rem;
    margin: 0 0 0 0.1rem;
  }
  .dolls{
    width: 100%;
    /*margin: 6.99rem 0 1.85rem 0;*/
    margin: 0 0 1.85rem 0;
    overflow: hidden;
  }
  .dolls li{
    width: 100%;
    padding: 0.19rem 0.22rem;
    background: #f8f8f8;
    border: 1px solid #c1c1c1;
    border-top:none;
    overflow: auto;
  }
  .dolls li:first-child{
    border-radius: 5px 5px 0 0;
    border-top: 1px solid #c1c1c1;
  }
  .dolls li:last-child{
    border-radius: 0 0 5px 5px;
  }
  .dolls li img{
    width: 2.06rem;
    height: 2.06rem;
    float: left;
  }
  .dolls li p{
    line-height: 2.06rem;
    float: left;
    text-indent: 0.7rem;
  }

  .footer{
    width: 100%;
    height: 1.8rem;
    /*height: 9.4%;*/
    background: #fff;
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
