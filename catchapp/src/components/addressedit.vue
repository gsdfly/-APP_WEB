<template>
  <div class="addressEdit">
    <h3><span v-if="isShow">修改地址</span><span v-else>新建地址</span></h3>
    <div class="section">
      <input type="text" name="name" class="name" placeholder="收件人姓名" v-model.trim="addressInfo.name"/>
    </div>
    <div class="section">
      <input type="tel" name="phone" class="phone" placeholder="手机或固定电话" v-model.trim="addressInfo.phone"/>
    </div>
    <div class="section" @click="isPopup = !isPopup">
      <span>{{addressInfo.province}}</span>
      <span>{{addressInfo.city}}</span>
      <span>{{addressInfo.area}}</span>
  </div>
  <div class="section">
    <input type="text" name="address" class="address" placeholder="详细地址（街道、门牌号等）" v-model.trim="addressInfo.address"/>
  </div>
  <div class="default" v-show="!defaultInit">
    <i @click="changeDefault($event)" :class="{'iconfont icon-check':addressInfo.default==1}"></i><span>设为默认地址</span>
  </div>
    <div class="footer">
      <button class="btn" @click="createAdd">保存</button>
      <button class="btn" v-show="isShow" @click="deleteAdd">删除地址</button>
    </div>
    <transition name="fade">
      <div class="popup" v-show="isPopup">
        <van-area :areaList="areaList" @confirm="confirm" @cancel="cancel"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Area } from 'vant';
  import { MessageBox } from 'mint-ui';
  import AREALIST from './../arealist';
  import {instance} from './../config/common'
  import {createAddress,updateAddress,deleteAddress,getAddressDefault} from './../util/ajax'

  export default {
    data() {
      return {
        isShow:false,
        isPopup:false,
        areaList:AREALIST,
        defaultInit:false,
        searchResult: [],
        addressInfo:{
          "name": "",
          "phone": "",
          "province": "选择省份",
          "city": "选择城市",
          "area": "选择地区",
          "address": "",
          "post": "4444",
          "default":1,
        }
      }
    },
    mounted(){
      if(this.$route.query.name){
        this.addressInfo = this.$route.query;
        this.isShow = true;
        if(this.addressInfo.default ==1){
          this.defaultInit = true;
        }
      }
      getAddressDefault().then((data) => {
        try{
          data.response.list
        }catch(err){
          this.defaultInit = true;
        }
      })
    },
    methods: {
      changeDefault(event){
        if(event.target.className.indexOf('iconfont') != -1){
          event.target.className = '';
          this.addressInfo.default = 0;
        }else {
          event.target.className = 'iconfont icon-check';
          this.addressInfo.default = 1;
        }
      },
      confirm(data){
        //需要验证选择的收件地区
        if(data[0].name == '选择省份' || data[1].name == '选择城市' || data[2].name == '选择地区'){
          MessageBox('提示','请选择正确的收件地区');
          return;
        }
        this.addressInfo.province = data[0].name;
        this.addressInfo.city = data[1].name;
        this.addressInfo.area = data[2].name;
        this.isPopup = !this.isPopup;
      },
      cancel(){
        this.isPopup = !this.isPopup;
      },
      //添加或修改地址
      createAdd(){
        if(this.addressInfo.name == ''){
          MessageBox('提示','请填写名字');
          return;
        }
        if(this.addressInfo.phone == ''){
          MessageBox('提示','请填写电话');
          return;
        }else {
          var telReg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
          var phoneReg = /^1(3|4|5|7|8)\d{9}$/;
          if(!(telReg.test(this.addressInfo.phone)) && !(phoneReg.test(this.addressInfo.phone))){
            MessageBox('提示','请填写正确的电话');
            this.addressInfo.phone = '';
            return;
          }
        }
        if(this.addressInfo.province == '选择省份'){
          MessageBox('提示','请选择收件地区');
          return;
        }
        if(this.addressInfo.address == ''){
          MessageBox('提示','请填写详细地址');
          return;
        }
        if(this.isShow){
          updateAddress(this.addressInfo).then((data) => {
            MessageBox.alert('修改成功').then(() => {
              this.$router.push('addresslist');
            });
          })
        }else {
          createAddress(this.addressInfo).then((data) =>{
            MessageBox.alert('添加成功').then(() => {
              if(this.$route.query.local){
                this.$router.push('exchangedolls');
              }else{
                this.$router.push('addresslist');
              }
            });
          })
        }
      },
      //删除地址
      deleteAdd(){
        MessageBox.confirm('是否确认删除该地址').then(() => {
          deleteAddress({"ids":[this.addressInfo.id]}).then(() => {
           this.$router.push('addresslist');
          })
        });
      }
    }
  }
</script>

<style scoped>

  .popup{
    position: fixed;
    background-color: #fff;
    width: 100%;
    bottom:0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s
  }
  .fade-enter, .fade-leave-to{
    transform: translate3d(0,100%,0);
  }
  .addressEdit{
    width: 100%;
    height: 100%;
    padding: 0.1px 0.32rem 0 0.32rem;
    font-size: 0.48rem;
    color: #666;
    font-family: S-Regular;
  }
  .addressEdit h3{
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    color: black;
    margin: 0.52rem 0 0.42rem 0;
    font-family: S-Bold;
  }
  .section{
    height: 1.52rem;
    border-bottom: 1px solid #e1e1e1;
    line-height: 1.5rem;
  }
  .section input{
    width: 100%;
    height: 100%;
    border: none;
    box-sizing: border-box;
  }

  .footer{
    width: 100%;
    /*height: 1.8rem;*/
    background: #fff;
    position: absolute;
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
    font-family: S-Medium;
  }

  .default{
    width: 100%;
    height: 0.72rem;
    text-align: center;
    margin: 0.76rem 0 0 0;
    line-height: 0.72rem;
    color: #999;
    font-size: 0.36rem;
  }
  .default i{
    font-size: 0.72rem;
    width: 0.72rem;
    height: 0.72rem;
    display: inline-block;
    border: 1px solid #e1e1e1;
    vertical-align: middle;
    margin: 0 0.2rem 0 0;
    color: #32d894;
    border-radius: 50%;
  }
  .default i.iconfont{
    border: none;
  }

</style>
