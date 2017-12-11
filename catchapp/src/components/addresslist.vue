<template>
  <div class="addressList" v-show="htmlShow">
   <div class="header">
     <back></back>
     <h3>选择收货地址<span @click="goManage">管理</span></h3>
   </div>
    <ul class="addressUl">
      <li v-for="item in list" @click="changeAddress(item)">
        <h4><span>{{item.name}}</span><i>{{item.phone}}</i></h4>
        <dl class="address">
          <dt><i v-if="item.default == 1">默认地址：</i><i class="iconfont icon-icon-yxj-address" v-else></i></dt>
          <dd>{{''+item.province+item.city+item.area+item.address}}</dd>
        </dl>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Toast, AddressList } from 'vant';
  import back from './back.vue'
  import {instance} from './../config/common.js'
  import {getAddressList,deleteAddress,setAddressDefault} from './../util/ajax'
  export default {
    data() {
      return {
        htmlShow:false,
        chosenAddressId: '1',
        list: []
      }
    },
    created(){
      this.Indicator.open();
    },
    mounted(){
      getAddressList().then((data) => {
        this.list = data.response.list;
        this.Indicator.close();
        this.htmlShow = true;
      })
    },
    components:{
      back
    },
    methods: {
      goManage(){
        this.$router.push('addresslistmanage');
      },
      changeAddress(item){
        this.$router.push({path:'exchangedolls',query:item})
      }
    }
  }
</script>

<style scoped>
  .default{
    background: red;
  }
  .addressList{
    width: 100%;
    height: 100%;
    padding: 0.1px 0.32rem 0 0.32rem;
    overflow: auto;
  }
  .addressList .header h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.68rem 0;
  }
  .addressList .header h3 span{
    font-size: 0.52rem;
    color:#fc8a15;
    float: right;
    font-weight: normal;
  }
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    padding: 0 0.32rem;
  }
  .addressUl{
    width: 100%;
    font-size: 0.48rem;
    color: #494949;
    margin: 2.99rem 0 0 0;
    font-family: S-Regular;
  }

  .addressUl li{
    width: 100%;
    padding: 0.44rem 0.52rem 0.38rem 0.52rem;
    border: 1px solid rgba(193,193,193,0.92);
    border-top: none;
    overflow: hidden;
  }
  .addressUl li:hover{
    background: #c1c1c1;
  }
  .addressUl li:first-child{
    padding: 0.44rem 0.52rem;
    margin: 0 0 0.54rem 0;
    border: 3px solid #fc8a15;
    border-radius: 5px;
    font-family: S-Medium;
  }
  .addressUl li:nth-child(2){
    border-top: 1px solid rgba(193,193,193,0.92);
    border-radius: 5px 5px 0 0;
  }
  .addressUl li:last-child{
    border-radius: 0 0 5px 5px;
  }
  .addressUl li:first-child{
    padding: 0.44rem 0.52rem;
    margin: 0 0 0.54rem 0;
    border: 3px solid #fc8a15;
    border-radius: 5px;
    font-family: S-Medium;
  }
  .addressUl li h4{
    line-height: 0.48rem;
    margin: 0 0 0.3rem 0;
  }
  .addressUl li h4 i{
    float: right;
  }
  .addressUl li .address{
    width: 100%;
    overflow: hidden;
  }
  .addressUl li .address dt{
    float: left;
    width:8%;
  }
  .addressUl li:first-child .address dt{
    width: 27%;
  }
  .addressUl li:first-child .address dd{
    width: 73%;
  }
  .addressUl li .address dt i{
    font-size: 0.64rem;
  }
  .addressUl li:first-child .address dt i {
    font-size: 0.48rem;
    color: #fc8a15;
  }
  .addressUl li dd{
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
  }

</style>
