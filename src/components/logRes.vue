<template>
  <div class="loginBox" v-if="isSHowLogin" @click.self="closeLogin">
    <!-- <canvas id="loginCanvasBg"></canvas> -->
    <div class="centerBox">
      <div>
        <input type="text" v-model="email" placeholder="请输入邮箱" />
      </div>
      <div>
        <input type="password" v-model="psd" placeholder="请输入密码" />
      </div>
      <div>
        <button :class="['loginBtn',email&&psd?'has':'']" @click="startLogin">登录</button>
      </div>
      <!--跳舞的狗： https://assets7.lottiefiles.com/packages/lf20_eLKAOD.json -->
      <!--跳舞的猴子： https://assets9.lottiefiles.com/packages/lf20_Y8UeVt.json -->
      <!--神奇的WIFI https://assets1.lottiefiles.com/datafiles/KffIdlWo8rSz0eU/data.json -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  props: ["isSHowLogin"],
  data() {
    return {
      email: "862983345@qq.com",
      psd: "1234"
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions("ajax", ["login"]),
    startLogin() {
      let resData = {
        email: this.email.trim(),
        psd: this.psd.trim()
      };

      this.login(resData).then(res => {
        if (res.status) {
          window.localStorage.setItem("CQUID", res.data.CQUID);
          this.$store.state.userInfo = res.data.userInfo; // 保存用户信息
          this.$emit("update:isSHowLogin", false);
        }
      });
    },
    //  关闭登录
    closeLogin(){
      this.$emit("update:isSHowLogin", false);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="less">
.loginBox {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  #loginCanvasBg {
    width: 100%;
    height: 100%;
  }
  .centerBox {
    display: inline-block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 300px;
    background: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    input {
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #cccccc;
      color: #333333;
      padding: 5px 0;
      line-height: 1;
      margin-bottom: 20px;
    }
    .loginBtn {
      width: 100%;
      box-sizing: border-box;
      border: none;
      padding: 10px 0;
      outline: none;
      cursor: pointer;
      color: #666666;
      border-radius: 4px;
    }
    .has {
      background: @mainColor;
      color: #ffffff;
    }
  }
}
</style>