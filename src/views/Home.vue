<template>
  <div class="home">
    <div class="containerBox">
      <!-- 内容部分 -->
      <div class="content">
        <comment></comment> 
      </div>
      <!-- 个人信息框 -->
      <div class="userInfoBox">
        <div v-if="userInfo" class="detailBox">
          <div class="box">
            <img :src="userInfo.head_img" alt />
          </div>
          <div class="box">
            <div>{{userInfo.name}}</div>
            <div>{{userInfo.last_login_time}}</div>
          </div>
        </div>
        <div v-else>
          <button class="loginBtn" @click="isShowLogin = true">登录</button>
        </div>
      </div>
    </div>

    <!-- 登录框 -->
    <loeRes :isSHowLogin.sync="isShowLogin"></loeRes>
  </div>
</template>

<script>
import loeRes from "../components/logRes";
import comment from "./Home/comment";
// import { mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      isShowLogin: false // 是否弹出登录框
    };
  },
  components: {
    loeRes,
    comment
  },
  computed: {
    // 公共用户信息
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    // ...mapActions("ajax", ["isLogin"]),
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.containerBox {
  display: flex;
  justify-content: space-between;
  .userInfoBox,
  .content {
    background: #ffffff;
    padding: 10px;
    border-radius: 4px;
  }
  .content {
    width: calc(100% - 270px);
    box-sizing: border-box;
    margin-right: 20px;
  }
  .userInfoBox {
    width: 250px;
    .detailBox {
      text-align: center;
      .box {
        img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
        }
      }
    }

    .loginBtn{
      outline: none;
      border: none;
      // text-align: center;
      width: 100%;
      padding: 10px 0;
      cursor: pointer;
      background: @mainColor;
      color: #ffffff;
      border-radius: 2px;
    }
  }
}
</style>
