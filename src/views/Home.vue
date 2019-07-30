<template>
  <div class="home" id="home">
    <!-- 导航栏区 -->
    <div class="headerNav">
      <div class="mainNav web">
        <a>内容区</a>
        <a class="active">讨论区</a>
      </div>
      <div class="mainNav phone">
        <div class="user">cqq</div>
      </div>
    </div>

    <div class="containerBox">
      <!-- 内容部分 -->
      <div class="content">
        <comment></comment>
      </div>
      <!-- 个人信息框 -->
      <div class="userInfoBox">
        <div v-if="userInfo" class="detailBox">
          <div class="box">
            <img :src="userInfo.head_img" v-if="userInfo.head_img" alt />
            <img src="../assets/img/akalin.jpg" v-else />
          </div>
          <div class="box">
            <div class="name">{{userInfo.name}}</div>
            <div class="desc">{{userInfo.description}}</div>
            <div class="time">上次登录：{{userInfo.last_login_time | timeFilter()}}</div>
            <div>
              <button class="mainButton warning" @click="signOut">退出登录</button>
            </div>
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
    // 退出登录
    signOut() {
      window.localStorage.removeItem("CQUID"); // 清除 uid
      this.$store.state.userInfo = null; // 清除用户数据
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped lang="less">
.headerNav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 0;
  .mainNav {
    display: flex;

    max-width: 1000px;
    margin: 0 auto;
  }
  .web {
    display: none;
    a {
      display: block;
      width: 100px;
      text-align: center;
      cursor: pointer;
      padding: 10px 0;
      background: #ffffff;
      border-radius: 4px;
      margin-right: 20px;
      color: @mainColor;
    }
    .active {
      background: @successColor;
      color: #ffffff;
    }
  }
  .phone{
    // display: none;
  }
}

.containerBox {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  // flex-wrap: wrap;
  .userInfoBox,
  .content {
    background: #ffffff;
    padding: 10px;
    border-radius: 4px;
  }
  .content {
    width: calc(100% - 270px);
    // min-width: 80%;
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
        .name {
          font-weight: 600;
          color: @mainColor;
          font-size: 24px;
          margin: 10px 0;
        }
        .desc {
          font-size: 14px;
          color: @mainColor2;
          margin-bottom: 10px;
        }
        .time {
          font-size: 14px;
          color: @mainColor3;
          margin-bottom: 10px;
        }
      }
    }

    .loginBtn {
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

// 视窗小于 800px 时
@media only screen and (max-width: 800px) {
  #home {
    // .mainNav {
    //   display: none;
    // }
    .content {
      width: 100%;
      margin-right: 0;
    }
    .userInfoBox {
      display: none;
      width: 250px;
    }
  }
}
</style>
