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
  @import url(//at.alicdn.com/t/font_385880_870ssoyv4an61or.css);

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
    font-family: "Adobe 黑体 Std R";
  }
  .mint-msgbox{

  }
</style>
