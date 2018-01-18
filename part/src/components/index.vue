<template>
  <div class="jo-index">
    <div class="header">
      <img v-show="user.avatar" :src="user.avatar" alt="" />
      <div class="img" v-show="!user.avatar">
        <img src="./../assets/images/icon_portrait.png" alt="" />
      </div>
      <div class="game">
        <div class="game-coins">
          <i class="iconfont icon-jinbi"></i>
          <span>游戏币:</span><span class="coins-num">{{user.coins}}</span>
          <button @click="recharge(1)" id="recharge"></button>
        </div>
        <div class="game-quan" v-show="user.game_ticket>0">
          <i class="iconfont icon-quan"></i>
          <span>免费券:</span><span class="quan-num">{{user.game_ticket}}</span>
        </div>
      </div>
      <button id="user_center" class="btnhistory" @click="openConsumeHis('history')"></button>
    </div>
    <div class="main">
      <div>
        <img class="logo" src="../assets/images/logo.png" alt="">
        <div class="center">
          <h4><span>{{info.coin_num}}</span>币/次</h4>
          <div class="game-num" v-if="user.coins<=0 && user.game_ticket<=0">您还没有游戏币，请先充值<span></span></div>
          <div v-else class="game-num">
            <i id="coin_reduce" class="iconfont icon-jianhao" @click="handlerGameNum('-')"   :class="{
                        'active': gameNum === 1
                    }"></i>
            <div>
              <h3>{{gameNum}}次</h3>
              <p>共消耗{{gameNum * info.coin_num}}个游戏币</p>
            </div>
            <i  id="coin_add" class="iconfont icon-jiahao" @click="handlerGameNum('+')"  :class="{
                        'active': ((gameNum + 1) * info.coin_num) > (user.coins+user.game_ticket*info.coin_num)
                    }"></i>
            <span></span>
          </div>
          <button v-if="user.coins<=0 && user.game_ticket<=0" @click="recharge(0)" id="recharge2" :class="{'btnactive':is_recharge}">充值</button>
          <button v-else @click="handleStartingDevice" id="coin-operated" :class="{'btnactive':is_start}">投币</button>
          <img v-if="start_desc=='投币中'" src="../assets/images/lamp_before.gif" alt="">
          <img v-show="is_lamp_after && start_desc=='投币'" src="../assets/images/lamp_after.gif" alt="">
          <p v-show="is_lamp_after && start_desc=='投币'">投币成功，“<span>摇动游戏杆</span>”即可开始游戏</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="./../assets/images/bg_image.png" alt="">
      <p>当前机器号：<span>{{machine_no}}</span></p>
      <ul>
        <li @click="handleScanQRCode" id="change_device"><i></i>更换机器</li>
        <li><a id="support" href="tel:0755-32904117" @click="support"><i></i>联系客服</a></li>
      </ul>
    </div>

    <div class="bg" v-show="bgShow"></div>

    <div class="history" v-show="isShow == 'history'" :style="maskStyle">
        <div  @click="closePopup" class="close iconfont icon-guanbi" v-show="maskShow">
          <i>.</i>
          <i>.</i>
          <i>.</i>
          <i>.</i>
          <i>.</i>
        </div>
        <div class="history-main" ref="tbody" @scroll="addEventScroll()">
          <table cellpadding="0" cellspacing="0" ref="scro" v-show="sume.length>0">
            <thead>
            <tr>
              <td>时间</td>
              <td>地点</td>
              <td>耗币数</td>
            </tr>
            </thead>
            <tbody>
              <tr v-for="item in sume">
                <td>
                  <h3>{{getYear(item.created_at)}}</h3>
                  <p>{{getTime(item.created_at)}}</p>
                </td>
                <td>
                  {{item.site_name}}
                </td>
                <td>
                  {{item.coin_num}}个
                </td>
              </tr>
            </tbody>
          </table>
          <div v-show="load" class="history-loading">
            {{loading_art}}
          </div>
          <div class="history-no" v-show="!isHasHistory">
            <p>你还没有抓过娃娃哦，</p>
            <p>现在抓娃娃，记录自己的战绩吧~</p>
            <img src="./../assets/images/image_charge.png" alt="">
          </div>
        </div>
      </div>

    <div class="recharge-box" v-show="isShow == 'recharge'" :style="maskStyle">
      <div @click="closePopup" class="close iconfont icon-guanbi" v-show="maskShow">
        <i>.</i>
        <i>.</i>
        <i>.</i>
        <i>.</i>
        <i>.</i>
      </div>
      <div class="recharge">
        <jo-pay @rechargeok="rechargeOk"></jo-pay>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from '../config'
  import {mapState} from 'vuex'
  import joPay from './wxpay'
  import MessageBox from 'mint-ui/lib/message-box'

  export default {
    data(){
      return {
        start_desc: '投币',
        gameNum: 1,
        maskStyle: {},
        is_start: false,
        is_lamp_after:false,
        is_recharge:false,
        loading_art: '加载更多~',
        load: false,
        max_page: false,
        maskShow:false,
        isShow:'',
        sume:[],
        recharge_auto: false,
        bgShow:false,
        scrollTop:0,
        isHasHistory:false
      }
    },
   created() {
     this.Indicator.open()
   },
   components: {
     joPay
   },
   computed: mapState({
     user: state => state.user.user,
     consume: state => state.user.consume,
     machine_no: state => state.user.machine_no,
     info: state => state.user.info
   }),
   mounted() {
          this.$store.dispatch('judgeMachine')
          this.$store.dispatch('getUser')
            .then(() => {
              this.Indicator.close()
            })
          this.$store.dispatch('getConsume', {
            page_index: 1,
            page_size: 10
          }).then(d => {
            if (d.data.length > 0) {
              this.isHasHistory = true;
              this.$store.commit('setConsume', {
                data: [],
                meta: {
                  pagination: {}
                }
              })
            }
          })
     },
   methods:{
     handlerGameNum(x) {
       if (x === '-') {
         if (this.gameNum === 1) return false;
         this.gameNum--;
         _hmt.push(['_trackEvent', '减币', '点击', '', '']);
       } else {
         if (((this.gameNum + 1) * this.info.coin_num) > (this.user.coins+this.info.coin_num*this.user.game_ticket)) {
           if (this.user.coins < this.info.coin_num)  this.openRecharge('recharge')
           return false
         }
         this.gameNum++;
         _hmt.push(['_trackEvent', '加币', '点击', '', '']);
       }
     },
     //投币，开始游戏
     handleStartingDevice() {
       if(this.info.online == 0){
         MessageBox.alert('设备离线请扫码更换机器','提示').then(() => {
           this.handleScanQRCode();
         });
         return
       }
       if (this.is_start) {
         return
       } else {
         this.is_start = true
         this.is_lamp_after = false
         this.start_desc = '投币中'
         if (this.user.game_ticket+this.user.coins < this.info.coin_num) {
           this.start_desc='';
           this.is_start = false
           this.recharge_auto = true
           MessageBox.alert('余额不足，请充值','提示').then(() => {
             this.openRecharge('recharge')
           });
           return false
         }
         //添加百度统计
         _hmt.push(['_trackEvent', '主按钮投币', '点击', '投币-游戏次数-' + this.gameNum, '']);
         this.$store.dispatch('startingDevice', this.gameNum * this.info.coin_num)
           .then(() => {
             this.is_lamp_after = true
             this.is_start = false
             this.start_desc = '投币'
             this.gameNum = 1;
             this.isHasHistory = true;
             setTimeout(() => {
               this.is_lamp_after = false
             },12000*this.gameNum)
           })
           .catch(() => {
             this.is_start = false
             this.start_desc = '投币'
           })
       }
     },
     //  扫码
     handleScanQRCode() {
       _hmt.push(['_trackEvent', '扫码更换机器', '点击', '', '']);//添加百度统计
       if (CONFIG.isAlipay) {
         ap.scan(function (res) {
           window.location.href = res.code
         })
       } else {
         wx.scanQRCode({
           needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
           scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
           success: function (res) {
             var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
             window.location.href = result
           },
           error: function () {
             alert('扫码失败')
           }
         })
       }
     },
     support(){
       _hmt.push(['_trackEvent', '客服', '点击', '', '']);
     },
//       打开历史消费列表
     openConsumeHis(is) {
       if(this.isHasHistory){
         this.getConsumeList();
       }
       this.handleMaskShow(is);
       //添加百度统计
       _hmt.push(['_trackEvent', "我的战绩", '点击', '', '']);
     },
     getConsumeList() {
       const p = this.consume.meta.pagination
       if (this.load) return false
       if (this.max_page) {
         this.loading_art = '没有更多了~'
         this.load = true
         setTimeout(() => {
           this.load = false;
         },1000);
         return false
       }
       this.loading_art = '加载更多~'
       this.load = true
       this.$store.dispatch('getConsume', {
         page_index: p.current_page ? p.current_page + 1 : 1,
         page_size: 10
       })
         .then(d => {
           const pp = d.meta.pagination
           if (pp.current_page == pp.total_pages) {
             this.max_page = true
           }
           for (let i = 0; i < d.data.length; i++) {
             this.sume.push(d.data[i])
           }
           this.load = false
         })
     },
     addEventScroll() {
       const b = this.$refs.tbody
       const r = this.$refs.scro
       if(this.scrollTop<b.scrollTop){
         if (b.scrollTop + b.clientHeight > r.clientHeight - 84) {
           this.getConsumeList()
         }
       }
       this.scrollTop = b.scrollTop;
     },
     handleMaskShow(is) {
       this.maskShow = true;
       this.is_recharge = false;
       this.isShow = is;
        setTimeout(() => {
          this.bgShow = true;
          this.maskStyle = {
               'webkitTransform': 'translate3d(0,0,0)',
               'transform': 'translate3d(0,0,0)'
             }
        },100)
     },
     closePopup() {
       this.maskStyle = {
         'webkitTransform': 'translate3d(0,100%,0)',
         'transform': 'translate3d(0,100%,0)',
       }
       setTimeout(() => {
         this.bgShow = false;
         this.maskShow = false;
         this.max_page = false
         this.$store.commit('setConsume', {
           data: [],
           meta: {
             pagination: {}
           }
         })
         this.sume = []
       },400)
     },
     getYear(date) {
       return date.toString().split(' ')[0]
     },
     getTime(date) {
       return date.toString().split(' ')[1]
     },
     //充值
     recharge(type){
       this.is_recharge = true;
       if(this.info.online == 0){
         MessageBox.alert('设备离线请扫码更换机器','提示').then(() => {
           this.handleScanQRCode();
         });
         return;
       }
       this.openRecharge('recharge');
       if(type ==1){
         _hmt.push(['_trackEvent', '固定充值按钮', '点击', '', '']);
       }else {
         _hmt.push(['_trackEvent', '主按钮充值', '点击', '', '']);
       }
     },
     //  打开充值界面
     openRecharge(is) {
       this.bgShow = true;
       this.handleMaskShow(is)
//       if (auto) this.recharge_auto = false
     },
     //  充值成功
     rechargeOk() {
       this.closePopup()
//       if (this.recharge_auto) {
//         this.gameNum = Math.floor(coin / this.info.coin_num)
//         this.handleStartingDevice()
//       }
     },
   }
 }
</script>

<style scoped>
  .jo-index {
    position: relative;
    width: 100%;
    height: 100%;
  }
  *{
    box-sizing: border-box;
  }
  .header{
    width: 100%;
    /*height: 1.4rem;*/
    height: 12%;
    position: relative;
  }
  .header>img{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    border: 2px solid #fc8a15;
    display: block;
    float: left;
    margin: 0.12rem 0 0 0.22rem;
    background: #f9e3d7;
  }
  .header .img{
    width: 1.28rem;
    height: 1.28rem;
    border-radius: 50%;
    border: 2px solid #fc8a15;
    display: block;
    float: left;
    margin: 0.14rem 0 0 0.22rem;
    background: #f9e3d7;
  }
  .header .img img{
    height: 80%;
    display: block;
    margin: 20% auto 0 auto;
  }
  .header .game{
    position: absolute;
    left: 0;
    top: 0;
    font-size: 0.24rem;
    color: #fd8a15;
  }
  .header .game-coins{
    /*width: 2.65rem;*/
    padding: 0 0.6rem 0 0;
    height: 0.62rem;
    /*border: 0.02rem solid #fd8a15;*/
    border: 1px solid #fd8a15;
    border-radius: 0.31rem;
    background: #fff;
    margin: 0.52rem 0 0 1.25rem;
    line-height: 0.6rem;
    border-right: none;
    float: left;
    position: relative;
  }
  .header .game-coins button{
    width: 0.64rem;
    height: 0.64rem;
    background: url("../assets/images/press_Recharge.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top:-0.02rem;
    right: -0.07rem;
    font-size: 0;
    border: none;
    outline: none;
  }
  .header i.iconfont{
    color: #fc8a15;
    font-size: 0.4rem;
    font-weight: 500;
    text-align: center;
    outline: none;
    float: left;
    margin: 0 0 0 0.12rem;
  }
  .header .game-coins span,.header .game-quan span{
    float: left;
  }
  .header .game-coins span:first-of-type ,.header .game-quan span:first-of-type{
    margin: 0 0 0 0.08rem;
  }
  .header .game-quan{
    /*width: 1.94rem;*/
    padding: 0 0.12rem 0 0;
    height: 0.62rem;
    border: 1px solid #fd8a15;
    border-radius: 0.31rem;
    background: #fff;
    margin: 0.52rem 0 0 0.2rem;
    line-height: 0.6rem;
    float: left;
  }
  .header .game-coins span.coins-num,.header .game-quan span.quan-num{
    font-size: 0.36rem;
    text-shadow: 0 0 0.01rem #9d5911;
    display: block;
    min-width: 0.56rem;
    text-align: center;
  }
  .header>button{
    width: 0.76rem;
    height: 0.84rem;
    background: url("../assets/images/icon_record.png") no-repeat;
    background-size: 100% 100%;
    display: block;
    border: none;
    outline: none;
    float: right;
    margin: 0.38rem 0.22rem 0 0;
  }
  .main{
    width: 100%;
    height: 59%;
    /*height: calc(100% - 4.96rem);*/
    min-height: 6.9rem;
    position: relative;
  }
  .main>div{
    width: 100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
  .logo{
    width: 1.55rem;
    margin: 0 auto;
    display: block;
  }

  .center{
    width: 100%;
    min-height: 4.5rem;
    padding:0.35rem 0.96rem 0 0.96rem;
    color: #999999;
  }
  .center>img{
    width: 100%;
    margin: 0.1rem 0 0 0;
  }
  .center>p{
    font-size: 0.3rem;
    color: #494949;
    line-height: 0.3rem;
    margin: 0.1rem 0 0 0;
  }
  .center>p>span{
    font-weight: 600;
  }
  .center h4{
    font-size: 0.26rem;
    font-weight: normal;
    text-align: left;
    line-height: 0.26rem;
  }
  .center .game-num {
    height: 0.93rem;
    border: 1px solid #c8c8c8;
    border-radius: 0.16rem;
    font-size: 0.28rem;
    line-height: 0.77rem;
    position: relative;
    margin: 0.2rem 0 0 0;
    padding: 0.06rem 0;
  }
  .center .game-num i{
    display: block;
    width: 0.88rem;
    height: 100%;
    float: left;
    font-size: 0.5rem;
    color: #fc8a15;
  }
  .center .game-num i.active {
    color: #c8c8c8;
  }
  .center .game-num div{
    width: calc(100% - 1.76rem);
    height: 100%;
    float: left;
    border-right: 1px solid #fc8a15;
    border-left: 1px solid #fc8a15;
  }
  .center .game-num div h3 {
    font-size: 0.46rem;
    color: #fc8a15;
    line-height: 0.46rem;
  }
  .center .game-num div p {
    font-size: 0.26rem;
    color: #7e7e7e;
    line-height: 0.4rem;
  }

  .center .game-num span{
    position: absolute;
    width: 0.18rem;
    height: 0.12rem;
    background: #fff url("../assets/images/icon.png") no-repeat;
    background-size: 100% 100%;
    bottom: -0.12rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .center button{
    width: 100%;
    height: 1.6rem;
    display: block;
    border: none;
    background: url("../assets/images/press.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 0.52rem;
    margin: 0.38rem 0 0 0;
    outline: none;
  }
  .center .btnactive{
    background: url("../assets/images/press_waiting.png") no-repeat;
    background-size: 100% 100%;
  }
  .footer{
    width: 100%;
    height: 29%;
    /*height: 3.56rem;*/
    /*background: url("../assets/images/bg_image.png") no-repeat;*/
    background-size: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .footer>img{
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 1.16rem;
  }
  .footer ul{
    width: 100%;
    height: 1.16rem;
    padding: 0.22rem;
    position: absolute;
    bottom: 0;
  }
  .footer ul li{
    width: 3.42rem;
    height: 0.72rem;
    border: 1px solid #fc8a15;
    float: left;
    list-style: none;
    border-radius: 0.1rem;
    font-size: 0.26rem;
    color:#fc8a15;
    line-height: 0.68rem;
    text-align: center;
    vertical-align: top;
  }
  .footer ul li i{
    display: inline-block;
    width: 0.39rem;
    height: 0.36rem;
    background: url("../assets/images/tab_icon_code.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.16rem 0.2rem 0 0;
    vertical-align: top;
  }
  .footer ul li a{
    display: block;
    width: 100%;
    height: 100%;
    color: #fc8a15;
    text-decoration: none;
  }
  .footer ul li:last-of-type{
    float: right;
  }
  .footer ul li:last-of-type i{
    background: url("../assets/images/icon_kefu.png") no-repeat;
    background-size: 100% 100%;

  }
  .footer p{
    font-size: 0.24rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: right;
    position: absolute;
    right: 0;
    bottom:1.26rem;
    color: #999;
    padding: 0 0.22rem;
    background: #fff;
    border-radius: 0.22rem;
  }

  .bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 3;
    top:0;
    left:0;
  }
  .history {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 4;
    transform: translate3d(0,100%,0);
    transition: all 0.4s;
  }
  .history .history-main{
    max-height: 5.7rem;
    overflow: auto;
    background: #fff;
  }
  .history table{
    width: 100%;
    color: #4a4a4a;
    position: relative;
  }
  .history table thead {
    width: 100%;
  }
  .history table thead tr {
    height: 0.84rem;
  }
  .history table thead tr td{
    position: fixed;
    left: 0;
    z-index: 5;
    line-height: 0.84rem;
    height: 0.84rem;
    font-size: 0.36rem;
    color: #494949;
    background: #eeeeee;
  }
  .history table tr td:first-child{
    width: 25%;
  }
  .history table  tr td:nth-child(2) {
    width: 50%;
  }
  .history table thead tr td:nth-child(2){
    width: 50%;
    left: 25%;
  }
  .history table tr td:nth-child(3){
    width: 25%;
  }
  .history table thead tr td:nth-child(3){
    left:75%;
  }

  .history table tbody{
    margin: 2.5rem 0 0 0;
  }
  .history table tr{
    width: 100%;
    height: 0.96rem;
  }
  .history table tr td{
    width:calc(100% / 3);
    height:0.96rem;
    border-bottom: 1px solid #eeeeee;
    vertical-align: top;
    font-size: 0.28rem;
    color: #494949;
    line-height: 0.95rem;
  }
  .history table tr td h3{
    line-height: 0.28rem;
    margin: 0.22rem 0 0.1rem 0;
    font-weight: normal;
  }
  .history table tbody tr td:last-of-type{
    color: #fc8a15;
  }

  .history table tr td p {
    font-size: 0.24rem;
    line-height: 0.24rem;
    color: #7e7e7e;
  }
  .history table tr:last-of-type td{
    border-bottom: none;
  }

  .history .history-loading{
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    background-color: #5c5c5c;
    color: #fff;
  }
  .history .history-no{
    width: 100%;

  }
  .history .history-no p{
    font-size: 0.32rem;
    color: #494949;
    line-height: 0.32rem;
  }
  .history .history-no p:first-of-type{
    margin: 0.7rem 0 0.26rem 0;
  }
  .history .history-no img{
    width: 100%;
    display: block;
    margin: 0.4rem 0 0 0;
  }

  .close {
    font-size: 1rem;
    color: #fff;
    width: 1rem;
    line-height: 0.9rem;
    position: absolute;
    top:0;
    left: 50%;
    transform: translate3d(-50%,-110%,0);
  }
  .close i {
    display: block;
    font-size: 0.5rem;
    height: 0.14rem;
    line-height: 0.14rem;
  }

  .recharge-box {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 4;
    transform: translate3d(0,100%,0);
    transition: all 0.4s;
  }
  .recharge-box .recharge{
    width: 100%;
    /*margin: 1.8rem 0 0 0;*/
    background: #fff;
    max-height: 4.25rem;
    overflow: auto;
    padding: 0.22rem 0.22rem 0 0.22rem;
  }
  .recharge-box p {
    margin: 0 0 0.4rem 0;
    text-align: left;
    color: #838587;
    font-size: 0.24rem;
  }


</style>
