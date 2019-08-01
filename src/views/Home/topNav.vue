<template>
  <!-- 导航栏区 -->
  <div id="headNav">
    <div class="headerNav">
      <div class="mainNav web">
        <div class="list">
          <router-link
            v-for="(item,index) in menuCntList"
            :key="index"
            :to="item.url"
            :class="activeNavIndex == index?'active':''"
          >{{item.tit}}</router-link>
        </div>
      </div>
      <div class="mainNav phone">
        <!-- 列表部分 -->
        <div class="menuList" :style="`height:${menuListHeight}px`">
          <ul ref="menuList" class="box">
            <li v-for="(item,index) in menuCntList" :key="index" class="selfBtn">
              <router-link
                :to="item.url"
                :class="activeNavIndex == index ? 'active':''"
                v-html="`<span>${item.tit}</span><i class='iconfont'>${item.icon}</i>`"
                v-if="!(item.index == 2) || userInfo"
              ></router-link>
              <div class="signOut" v-if="item.index == 2 && userInfo" @click="signOut">退出登录</div>
            </li>
          </ul>
        </div>
        <div class="phoneBox">
          <!-- 人物信息 -->
          <div class="userInfo">
            <div class="head">
              <img :src="userInfo.head_img" v-if="userInfo && userInfo.head_img" alt />
              <img src="../../assets/img/akalin.jpg" v-else />
            </div>
            <div class="signInBtn" v-if="!userInfo" @click="signIn">点击进行登录</div>
            <div class="name">{{userInfo && userInfo.name}}</div>
            <div class="desc">{{userInfo && userInfo.description}}</div>
          </div>
          <!-- 导航栏按钮 -->
          <div @click="_openCloseAlert" class="iconBox">
            <menuLottie
              class="icon"
              loName="notFoundLottie"
              :options="lottieOpt"
              @lottieCreated="init"
            ></menuLottie>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuLottie from "../../components/lottie";
import * as menuJSON from "../../assets/lottieJSON/menu.json";
export default {
  components: {
    menuLottie
  },
  props: {},
  data() {
    return {
      // 公共部分
      // 导航的内容
      menuCntList: [
        {
          tit: "首页",
          icon: "&#xe881;",
          index: 0,
          url: "/"
        },
        {
          tit: "讨论区",
          icon: "&#xe89e;",
          index: 1,
          url: "/comment"
        },
        {
          tit: "个人页面",
          icon: "&#xe8a7;",
          index: 2,
          url: "/"
        }
      ],
      // activeNavIndex: 0, // 当前选中
      /**
       * === 手机部分js
       *  */
      lottieOpt: false,
      lottieElem: false,
      isShowMenu: false, // 是否显示 导航弹框
      menuListHeight: 0 // 导航部分当前高度
    };
  },
  computed: {
    // 公共用户信息
    userInfo() {
      return this.$store.state.userInfo;
    },
    activeNavIndex(){
      return this.$store.state.activeNavIndex;
    }
  },
  methods: {
    init(e) {
      this.lottieElem = e;
      this.lottieElem.setSpeed(2); // 运行速度变为 2倍
    },
    // 打开或关闭导航
    _openCloseAlert() {
      let is = this.isShowMenu; // 当前是否有显示 true 关闭 false 打开
      this.lottieElem.playSegments(is ? [100, 170] : [30, 100], true);
      this.isShowMenu = !is;

      let menuList = this.$refs.menuList;
      this.menuListHeight = is ? 0 : menuList.offsetHeight;
    },

    // 进行登录
    signIn() {
      this.$parent.isShowLogin = true;
    },
    // 退出登录
    signOut() {
      window.localStorage.removeItem("CQUID"); // 清除 uid
      this.$store.state.userInfo = null; // 清除用户数据

      this._openCloseAlert(); // 关闭弹出
    }
  },
  created() {
    // 应该写在created内
    this.lottieOpt = {
      animationData: menuJSON,
      loop: false,
      autoplay: false
    };
  }
};
</script>
<style lang="less">
.headerNav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: @bodyColor;
  .mainNav {
    max-width: 1000px;
    margin: 0 auto;
  }
  .web {
    display: block;
    padding: 15px 0;
    .list {
      display: flex;
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
  }
  .phone {
    display: none;
    .phoneBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
    }
    .userInfo {
      display: flex;
      align-items: center;
      .head {
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 0;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .name {
        color: @mainColor;
      }
      .desc {
        font-size: 12px;
        color: @mainColor2;
        margin-left: 10px;
      }
    }
    .iconBox {
      padding: 0 0 0 20px;
      .icon {
        width: 36px;
        font-size: 0;
        cursor: pointer;
      }
    }
    .signInBtn {
      font-size: 12px;
      padding: 10px;
    }
    .menuList {
      height: 0;
      overflow: hidden;
      transition: height linear 0.25s;
      .box {
        a {
          display: block;
          padding: 15px 10px;
          border-bottom: 1px solid @borderColor;
          color: @mainColor;
          span {
            display: inline-block;
            width: 70px;
          }
          .iconfont {
            font-size: 18px;
          }
        }
        .active {
          background: @successColor;
          border-bottom: 1px solid @successColor;
          color: #ffffff;
        }
      }

      .selfBtn {
        position: relative;
        .signOut {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          color: #ffffff;
          font-size: 12px;
          background: @orangeColor;
          line-height: 1;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>