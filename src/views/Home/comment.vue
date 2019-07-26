<template>
  <div class="commentList">
    <!-- 发表评论 -->
    <div class="sendMsgBox">
      <div class="title">
        讨论区
        <i class="iconfont">&#xe89e;</i>
      </div>
      <button
        :class="['mainButton',userInfo?'success':'disabled']"
        :title="userInfo?'':'请先登录'"
        @click="visibility = true"
      >
        <i class="iconfont">&#xe8ad;</i> 发表评论
      </button>
    </div>
    <!-- 内容部分 -->
    <div class="contentList">
      <!-- 一级评论 -->
      <div v-for="item in commentList" :key="item.id" class="comBox first">
        <div class="head">
          <img :src="item.head_img" v-if="item.head_img" />
          <img src="../../assets/img/akalin.jpg" v-else />
        </div>
        <div class="content">
          <!-- 昵称+其他操作 -->
          <div class="name">
            <a>{{item.name}}</a>
            <div class="iconList">
              <a class="liked" title="赞">
                <span class="iconfont">&#xe87c;</span>
                <span>{{item.liked}}</span>
              </a>
              <a class="iconfont" title="回复">&#xe8ab;</a>
            </div>
          </div>
          <!-- 时间 -->
          <div class="time">{{item.create_time | timeFilter()}}</div>
          <!-- 内容 -->
          <div class="cnt">{{item.content}}</div>

          <!-- 二级评论 -->
          <div class="second" v-if="item.second_comment.length > 0">
            <div v-for="sItm in item.second_comment" :key="sItm.id" class="comBox">
              <div class="head">
                <img :src="sItm.head_img" alt />
              </div>
              <div class="content">
                <div class="name">
                  <a>{{sItm.name}}</a>
                  <div class="iconList">
                    <a class="liked" title="赞">
                      <span class="iconfont">&#xe87c;</span>
                      <span>{{sItm.liked}}</span>
                    </a>
                    <a class="iconfont" title="回复">&#xe8ab;</a>
                  </div>
                </div>
                <!-- 时间 -->
                <div class="time">{{sItm.create_time | timeFilter()}}</div>
                <div class="cnt">
                  <a class="linkedName">@{{sItm.linked_user_name}}</a>
                  {{sItm.content}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <inputPopup :visibility.sync="visibility"></inputPopup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import inputPopup from "../../components/inputPopup"; // 输入弹出框
export default {
  data() {
    return {
      commentList: [],
      visibility: true // 弹框时否显示
    };
  },
  components: {
    inputPopup
  },
  computed: {
    // 公共用户信息
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    ...mapActions("ajax", ["getComment"])
  },
  created() {
    this.getComment().then(res => {
      if (res.status) {
        this.commentList.push(...res.data.dataList);
      }
    });
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.commentList {
  .contentList {
    .comBox {
      display: flex;
      .head {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 10px;
        box-shadow: 0 0 10px #eeeeee;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        width: calc(100% - 50px);
        padding-left: 10px;
        .name {
          color: @mainColor2;
          font-size: 14px;
          margin-bottom: 3px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          > a {
            color: @successColor;
          }
          .iconList {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: @mainColor2;
            .iconfont {
              display: inline-block;
              padding: 0 8px;
              font-size: 16px;
            }
            .liked {
              font-size: 14px;
              padding: 0 8px 0 0;
              .iconfont {
                padding: 0 8px;
              }
            }
          }
        }
        .time {
          color: @mainColor3;
          font-size: 12px;
          margin-bottom: 10px;
        }
        .cnt {
          color: @mainColor;
          min-height: 25px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        a {
          cursor: pointer;
        }
        .linkedName {
          color: @blueColor;
          font-size: 14px;
        }
      }
    }
    .first,
    .second {
      padding: 10px;
      box-sizing: border-box;
      border-radius: 4px;
    }
    .first {
      border: 1px solid @borderColor;
      margin-bottom: 15px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    .second {
      background: #f9f9f9;
      .comBox {
        margin-bottom: 15px;
        &:last-of-type {
          margin-bottom: 0;
        }
        .content {
          .cnt {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .sendMsgBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;
    .title {
      font-size: 18px;
      font-weight: 600;
      padding-left: 15px;
      border-left: 4px solid @successColor;
      line-height: 1;
    }
  }
}
</style>