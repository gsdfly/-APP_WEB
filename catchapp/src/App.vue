<template>
  <div id="app">
    <!--<transition name="fade" mode="out-in">-->
      <router-view></router-view>
    <!--</transition>-->
  </div>
</template>

<script>

  export default {
    name: 'app'
  }
</script>

<style>
  /*.fade-enter-active, .fade-leave-active {*/
    /*transition: all .5s*/
  /*}*/
  /*.fade-enter  {*/
    /*!*opacity: 0,*!*/
    /*transform:translateX(100%);*/
  /*}*/
  /*.fade-leave-active  {*/
    /*transform:translateX(0);*/
  /*}*/
  @import url(//at.alicdn.com/t/font_385880_z82suy0lsfumzpvi.css);

  /*@font-face*/
  /*{*/
    /*font-family: S-Bold;*/
    /*src: url('./assets/fonts/SourceHanSansCN-Bold.ttf');*/
  /*}*/
  /*@font-face*/
  /*{*/
    /*font-family: S-Medium;*/
    /*src: url('./assets/fonts/SourceHanSansCN-Medium.ttf');*/
  /*}*/
  /*@font-face*/
  /*{*/
    /*font-family: S-Regular;*/
    /*src: url('./assets/fonts/SourceHanSansCN-Regular.ttf');*/
  /*}*/
  html,body ,#app{
    width: 100%;
    height: 100%;
  }
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, mark, menu, nav, object, ol, p, pre, q, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    line-height: 0;
    content: "";
  }

  body {
    /*font-family: S-Medium;*/
    font-family: "Adobe 黑体 Std R";
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #000;*/
    /*font-size: 0.22rem;*/
  }
  /*body .header h3{*/
    /*font-family: S-Bold;*/
  /*}*/
  /*body .header h3 span{*/
    /*font-family: S-Medium;*/
  /*}*/


</style>
