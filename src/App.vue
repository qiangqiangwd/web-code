<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("ajax", ["isLogin"])
  },
  created() {
    this.isLogin().then(res => {
      this.$store.state.userInfo = res.data;
    });
  }
};
</script>


<style lang='less'>
@mainColor:#2c3e50;
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @mainColor;

  max-width: 1000px;
  margin: 20px auto;
  /* background: #ffffff; */
  box-sizing: border-box;
  /* padding: 10px; */
}
body {
  background: @bodyColor;
}


// 利用 fontface 引入字体图表 
@font-face {
  font-family: 'iconfont';
  src: url('./assets/fontIcon/iconfont.eot');
  src: url('./assets/fontIcon/iconfont.eot?#iefix') format('embedded-opentype'),
      url('./assets/fontIcon/iconfont.woff2') format('woff2'),
      url('./assets/fontIcon/iconfont.woff') format('woff'),
      url('./assets/fontIcon/iconfont.ttf') format('truetype'),
      url('./assets/fontIcon/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
