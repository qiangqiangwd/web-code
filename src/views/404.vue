<template>
  <div class="notFoundPage">
    <div class="notFoundIcon">
      <lottie class="icon" loName="notFoundLottie" :options="lottieOpt" @lottieCreated="init"></lottie>
    </div>
    <h1>404</h1>
    <div class="tips">对不起，你访问的文件不存在，请检查访问路径是否拼写正确。</div>
    <div>
        <router-link to="/" class="mainButton">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import lottie from "../components/lottie";
import * as notFoundJSON from "../assets/lottieJSON/notFound.json";
export default {
  components: {
    lottie
  },
  data() {
    return {
      lottieOpt: false,
      lottieElem: false
    };
  },
  created() {
    // 应该写在created内
    this.lottieOpt = {
      animationData: notFoundJSON,
      loop: true,
      autoplay: true
    };
  },
  methods: {
    init(e) {
      this.lottieElem = e;
    }
  }
};
</script>
<style scoped lang='less'>
.notFoundPage {
  text-align: center;
  .notFoundIcon {
    display: inline-block;
    width: 300px;
    height: 300px;
    position: relative;
    z-index: 0;
    overflow: hidden;
    .icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -30%) scale(2.5);
    }
  }

  h1{
      font-size: 44px;
      margin-bottom: 10px;
  }
  .tips{
      font-size: 14px;
      color: #2c3e50;
       margin-bottom: 20px;
  }
}
</style>