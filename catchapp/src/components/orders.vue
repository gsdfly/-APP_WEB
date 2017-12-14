<template>
  <div class="orders" v-show="htmlShow">
    <div class="header">
      <h3>订单列表</h3>
    </div>
    <ul class="orderUl">
      <li v-for="item in orderList">
        <h5>{{item.ex_no}}<span>{{item.status}}</span></h5>
       <div class="imgs">
         <div class="img" v-for="doll in item.doll_snapshot">
           <img :src="doll.picture" alt="">
         </div>
       </div>
        <div class="addressInfo">
          <h4><span>{{item.address_snapshot.name}}</span><i>{{item.address_snapshot.phone}}</i></h4>
          <dl class="address">
            <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
            <dd>{{''+''+item.address_snapshot.province+item.address_snapshot.city+item.address_snapshot.area+item.address_snapshot.address}}</dd>
          </dl>
        </div>
        <div class="expressInfo" v-show="item.status != '待配送'">
          <p>{{item.express_company}}</p>
          <p>订单号：<span>{{item.express_no}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getDollOrderList,getDollOrder} from './../util/ajax'
  export default {
    data(){
      return {
        htmlShow:false,
        orderList:[]
      }
    },
    created(){
      this.Indicator.open();
    },
    mounted(){
      this.$nextTick(()=>{
        getDollOrderList().then((data) => {
          this.orderList = data.response.list;
          this.Indicator.close();
          this.htmlShow = true;
        })
      })
    },
    methods:{

    }
  }
</script>

<style scoped>
  .orders{
    width: 100%;
    height: 100%;
    padding:0.1px 0.32rem 0 0.32rem;
    font-size: 0.44rem;
    color: #666666;
    font-family: S-Regular;
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
  .orders .header h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.56rem 0;
    color: #000;
  }
  .orders .orderUl{
    width: 100%;
    overflow: hidden;
    margin: 1.72rem 0 0 0;
  }
  .orders .orderUl li{
    width: 100%;
    padding: 0.44rem 0.52rem 0 0.52rem;
    background: #f8f8f8;
    border: 1px solid #c1c1c1;
    border-radius: 5px;
    margin: 0 0 0.32rem 0;
  }
  .orderUl li  h5{
    font-size: 0.48rem;
    color: #494949;
    line-height: 0.48rem;
    border-left: 3px solid #fc8a15;
    text-indent: 0.1rem;
    margin: 0 0 0.32rem 0;
  }
  .orderUl li  h5 span{
    color:#fc8a15;
    font-size: 0.44rem;
    float: right;
  }
  .orderUl li .addressInfo{
    margin: 0.3rem 0 0.38rem 0;
  }
  .orderUl li .addressInfo h4{
    line-height: 0.48rem;
    margin: 0 0 0.3rem 0;
  }
  .orderUl li .addressInfo h4 i{
    float: right;
  }
  .orderUl li .addressInfo .address{
    width: 100%;
    overflow: hidden;
  }
  .orderUl li .addressInfo .address dt{
    float: left;
    width:8%;
  }
  .orderUl li .addressInfo .address dt i{
    font-size: 0.64rem;
  }
  .orderUl li .addressInfo  .address dd{
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
    font-family: S-Medium;
  }
  .orderUl li .imgs{
    width: 100%;
    height: 2.06rem;
    overflow: hidden;
  }
  .orderUl li .img{
    width: 2.06rem;
    height: 2.06rem;
    background: #fff;
    float: left;
    margin: 0 0.2rem 0 0;
  }
  .orderUl li .img img{
    width: 100%;
  }
  .expressInfo{
    border-top: 1px solid #c1c1c1;
    padding: 0.2rem 0;
    color: #999;
    font-size: 0.36rem;
    line-height: 0.44rem;
  }


</style>
