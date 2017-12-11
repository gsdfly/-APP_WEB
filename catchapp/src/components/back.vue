<template>
  <div class="back">
    <div class="top"><i class="iconfont icon-back" @click="goBack"></i></div>
  </div>
</template>

<script>
  export default {
    methods:{
      goBack(){
        window.history.go(-1);
      }
    }
  }
</script>

<style scoped>
  .back{
    width: 100%;
  }
  .top{
    width: 100%;
    height: 1.15rem;
    position: relative;
  }
  .top i{
    font-size: 0.8rem;
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
