<template>
  <div class="index">
      <p>活动的页面</p>
  </div>
</template>

<script>
  import {getWxJssdk} from './../api'
  export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods:{
    async getReq(){
     let data = await getWxJssdk();
    },
    async test(){
      var myHeaders = new Headers();
//      var myInit = { method: 'GET',
//        headers: myHeaders,
//        mode: 'cors',
//        cache: 'default' };

      let myInit = {
        method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             // 'Authorization': 'Bearer'+CONFIG.token
         },
        mode: "cors",
        cache: 'default'
      }

      var res = await window.fetch('http://proxy.5zhua.cn/api/get_room_list',myInit);
//        .then(function (res) {
//        console.log(res);
//      });
      var obj =await res.json();
      console.log(obj);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
