<template>
  <div class="exchangedolls" v-show="htmlShow">
    <div class="header header2">
      <div class="defaultAddress">
        <h4><span>{{defaultAddress.name}}</span><i>{{defaultAddress.phone}}</i></h4>
        <dl class="address">
          <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
          <dd>{{'' + defaultAddress.province + defaultAddress.city + defaultAddress.area + defaultAddress.address}}</dd>
        </dl>
        <a @click="goAddressList" href="javascript:void(0)">其他地址<i class="iconfont icon-go1"></i></a>
      </div>
    </div>
    <div class="header2">
      <div class="defaultAddress">
        <h4><span>{{defaultAddress.name}}</span><i>{{defaultAddress.phone}}</i></h4>
        <dl class="address">
          <dt><i class="iconfont icon-icon-yxj-address"></i></dt>
          <dd>{{'' + defaultAddress.province + defaultAddress.city + defaultAddress.area + defaultAddress.address}}</dd>
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
    <button class="btn" @click="confirmExchange">确认</button>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {getAddressDefault, exchangeDolls, getDollList} from './../util/ajax'

  export default {
    data() {
      return {
        htmlShow: false,
        dolls: [],
        defaultAddress: {},
      }
    },
    mounted() {
      if(this.$route.query.name){
        this.defaultAddress = this.$route.query;
        getDollList().then((data) => {
          var dolllist = data.response.list
          for (var index in dolllist) {
            if (dolllist[index].status == 0) {
              this.dolls.push(dolllist[index]);
            }
          }
          this.htmlShow = true;
          this.callAppFunction('showContent')
        })
      }else {
        getAddressDefault().then((data) => {
          if (data.response.length != 0) {
            this.defaultAddress = data.response;
            this.dolllist = data.response.list;
            getDollList().then((data) => {
              var dolllist = data.response.list
              for (var index in dolllist) {
                if (dolllist[index].status == 0) {
                  this.dolls.push(dolllist[index]);
                }
              }
              this.htmlShow = true;
              this.callAppFunction('showContent')
            })
          }
//          else {
////          直接去添加地址页面
//            MessageBox.alert('请先添加收货地址','').then(() => {
//              this.$router.push({path: 'addressedit', query: {local: 'exchangedolls'}});
//            });
//          }
        })
      }
    },
    methods: {
      confirmExchange() {
        var doll_ids = [];
        for (var index in this.dolls) {
          doll_ids.push(this.dolls[index].id);
        }
        var address_id = this.defaultAddress.id;
        exchangeDolls({doll_ids: doll_ids, address_id: address_id}).then((data) => {
          this.$router.push({path:'order',query:{dollID:doll_ids[0]}});
        })
      },
      goAddressList() {
        this.$router.push({path:'addresslistmanage',query:{form:'exchangedolls'}});
      }
    },
  }
</script>

<style scoped>

  .exchangedolls {
    width: 100%;
    height: 100%;
    padding: 0 0.36rem;
    font-size: 0.48rem;
    color: #494949;
    overflow: auto;
    background: #fff2f2;
  }

  .header {
    width: 100%;
    background: #fff2f2;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 666;
    padding: 0 0.32rem;
  }

  .exchangedolls .header2 h3 {
    font-size: 0.64rem;
    font-weight: 600;
    line-height: 0.64rem;
    margin: 0.52rem 0 0.56rem 0;
    color: black;
  }

  .defaultAddress {
    width: 100%;
    padding: 0.4rem 0.36rem 0.32rem 0.36rem;
    /*border: 3px solid #fc8a15;*/
    border-radius: 0.18rem;
    overflow: hidden;
    /*margin: 0 0 0.55rem 0;*/
    background: #fff;
    margin: 0.42rem 0;
  }

  .defaultAddress h4 {
    line-height: 0.48rem;
    margin: 0 0 0.3rem 0;
    font-size: 0.48rem;
  }

  .defaultAddress h4 i {
    float: right;
  }

  .defaultAddress .address {

    width: 100%;
    overflow: hidden;
  }

  .defaultAddress .address dt {
    float: left;
    width: 8%;
  }

  .defaultAddress .address dt i {
    font-size: 0.64rem;
  }

  .defaultAddress dd {
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
  }

  .defaultAddress a {
    float: right;
    color: #999999;
    font-size: 0.4rem;
    line-height: 0.4rem;
    margin: 0.3rem 0.1rem 0 0;
  }

  .defaultAddress a i {
    font-size: 0.5rem;
    margin: 0 0 0 0.1rem;
  }

  .dolls {
    width: 100%;
    /*margin: 6.99rem 0 1.85rem 0;*/
    margin: 0 0 1.85rem 0;
    overflow: hidden;
  }

  .dolls li {
    width: 100%;
    padding: 0.19rem 0.22rem;
    background: #fff;
    border-top: none;
    overflow: auto;
    margin: 0 0 0.06rem 0;
    border-radius: 0.18rem;
  }

  .dolls li img {
    width: 2.06rem;
    height: 2.06rem;
    float: left;
    border-radius: 0.18rem;
  }

  .dolls li p {
    line-height: 2.06rem;
    float: left;
    max-width: calc(100% - 2.3em);
    text-indent: 0.7rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .btn {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.34rem;
    width: 8.16rem;
    height: 1.38rem;
    outline: none;
    border: none;
    border-radius: 0.18rem;
    background: #f972c7;
    color: #fff;
    font-size: 0.52rem;
    display: block;
    /*margin: 0 0 0.24rem auto;*/
  }

</style>
