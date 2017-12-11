<template>
  <div class="addressListManage" v-show="htmlShow">
    <div class="header">
      <back></back>
      <h3>管理收货地址</h3>
    </div>
    <ul class="addressUl">
      <li v-for="item in list">
        <h4><span>{{item.name}}</span><i>{{item.phone}}</i></h4>
        <dl class="address">
          <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
          <dd>{{''+item.province+item.city+item.area+item.address}}</dd>
        </dl>
        <div class="bottom">
          <i @click="setDefault(item.id,$event)" :class="{'iconfont icon-check' : item.default==1}" class="first"></i><span v-if="item.default==1" class="default">默认地址</span><span v-else>设为默认地址</span>
          <i class="iconfont icon-delete" @click="deleteAdd(item.id,$event)"></i>
          <i class="iconfont icon-bianji" @click="editAdd(item)"></i>
        </div>
      </li>
    </ul>
    <div class="footer">
      <div class="btn" @click="createAdd">添加新地址</div>
    </div>
  </div>
</template>

<script>
  import { AddressList } from 'vant';
  import { MessageBox } from 'mint-ui';
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
    components:{
      back
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
    methods: {
      //设置默认地址
      setDefault(id,event){
        if(event.target.className.indexOf('iconfont') != -1){
          return;
        }
        setAddressDefault({"id":id}).then((data) => {
            var currentLi = document.querySelector('.icon-check');
            if(currentLi){
              currentLi.className = 'first';
              currentLi.nextElementSibling.className = '';
              currentLi.nextElementSibling.innerHTML = '设为默认地址';
            }
            event.target.className = 'first iconfont icon-check';
            event.target.nextElementSibling.className = 'default';
            event.target.nextElementSibling.innerHTML = '默认地址';
        })
      },
      //删除地址
      deleteAdd(id,event){
        MessageBox.confirm('是否确认删除该地址').then(action => {
          deleteAddress({"ids":[id]}).then((data) => {
            getAddressList().then((data) => {
              this.list = data.response.list;
            })
          })
        });
      },
      //编辑地址
      editAdd(item){
        this.$router.push({path:'addressedit',query:item});
      },
      //添加地址
      createAdd(){
        this.$router.push('addressedit');
      }

    }
  }
</script>

<style scoped>

  .addressListManage{
    width: 100%;
    height: 100%;
    padding:0.1px 0.32rem 0 0.32rem;
    overflow: auto;
  }
  .addressListManage .header h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.68rem 0;
  }
  .header{
    position: fixed;
    width: 100%;
    background: #fff;
    left: 0;
    top: 0;
    padding: 0 0.32rem;
  }
  .addressUl{
    width: 100%;
    font-size: 0.48rem;
    color: #494949;
    margin: 3.04rem 0 1.85rem 0;
  }

  .addressUl li{
    width: 100%;
    padding: 0.44rem 0 0 0;
    border: 1px solid rgba(193,193,193,0.92);
    overflow: hidden;
    margin: 0.32rem 0 0 0;
    border-radius: 5px;
  }
  .addressUl li h4{
    line-height: 0.48rem;
    padding: 0 0.52rem;
    margin: 0 0 0.3rem 0;
  }
  .addressUl li h4 i{
    float: right;
  }
  .addressUl li .address{
    width: 100%;
    overflow: hidden;
    padding: 0 0.52rem;

  }
  .addressUl li .address dt{
    float: left;
    width:8%;
  }
  .addressUl li .address dt i{
    font-size: 0.64rem;
  }
  .addressUl li dd{
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
  }
  .bottom{
    width: 100%;
    height: 1.22rem;
    margin: 0.42rem 0 0 0;
    font-size: 0.42rem;
    padding: 0.42rem 0.52rem 0.38rem 0.52rem;
    border-top: 1px solid rgba(193,193,193,0.92);
    line-height: 0.58rem;
    font-family: S-Regular;
  }
  .bottom i{
    float: right;
    color: #868686;
  }
  .bottom i:last-of-type {
    margin: 0 0.8rem 0 0;
  }
  .bottom i:nth-last-of-type(2) {
    margin: 0 0.08rem 0 0;
  }
  .bottom .first{
    width: 0.58rem;
    height: 0.58rem;
    float: left;
    border: 1px solid #494949;
    border-radius: 50%;
    font-size: 0.58rem;
    color: #fc9327;
    margin: 0 0.1rem 0 0;
  }
  .bottom .iconfont{
    border: none;
  }
  .bottom .default{
    color: #fc9327;
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
    text-align: center;
    line-height: 1.16rem;
    margin:0.32rem auto;
  }

</style>
