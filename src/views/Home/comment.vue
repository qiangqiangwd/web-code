<template>
  <div class="commentList">
    <!-- 发表评论 -->
    <div class="sendMsgBox">
      <div class="firstTit">
        讨论区
        <i class="iconfont">&#xe89e;</i>
      </div>
      <button
        :class="['mainButton',userInfo?'success':'disabled']"
        :title="userInfo?'':'请先登录'"
        @click="showCommentModel(null)"
      >
        <i class="iconfont">&#xe8ad;</i> 发表评论
      </button>
    </div>
    <!-- 内容部分 -->
    <div class="contentList">
      <!-- 一级评论 -->
      <div v-for="(item,index) in commentList" :key="item.id" class="comBox first">
        <div class="head">
          <img :src="item.head_img" v-if="item.head_img" />
          <img src="../../assets/img/akalin.jpg" v-else />
        </div>
        <div class="content">
          <!-- 昵称+其他操作 -->
          <div class="name">
            <a>{{item.name}}</a>
            <div class="iconList">
              <a
                :class="item.id | isAddLiked(commentLikedArray)"
                title="赞"
                @click="likedChange(item,index)"
              >
                <span class="iconfont">&#xe87c;</span>
                <span>{{item.liked}}</span>
              </a>
              <a class="iconfont cb" title="回复" @click="showCommentModel(item)">&#xe8ab;</a>
              <a
                class="iconfont del"
                title="删除"
                v-if="userInfo && userInfo.id == item.user_id"
                @click="delCommentOpt(item,index)"
              >&#xe88e;</a>
            </div>
          </div>
          <!-- 时间 -->
          <div class="time">
            <div>{{item.create_time | timeFilter()}}</div>
            <div class="index">#{{index+1+page.pageSize*(page.pageIndex - 1)}}</div>
          </div>
          <!-- 内容 -->
          <div class="cnt" v-html="$options.filters.cntHtml(item.content)"></div>

          <!-- 二级评论 -->
          <div class="second" v-if="item.second_comment.length > 0">
            <div v-for="(sItm,sIndex) in item.second_comment" :key="sItm.id" class="comBox">
              <div class="head">
                <img :src="sItm.head_img" alt />
              </div>
              <div class="content">
                <div class="name">
                  <a>{{sItm.name}}</a>
                  <div class="iconList">
                    <a
                      :class="item.id | isAddLiked(commentLikedArray)"
                      title="赞"
                      @click="likedChange(sItm,index,sIndex)"
                    >
                      <span class="iconfont">&#xe87c;</span>
                      <span>{{sItm.liked}}</span>
                    </a>
                    <a class="iconfont cb" title="回复" @click="showCommentModel(sItm)">&#xe8ab;</a>
                    <a
                      class="iconfont del"
                      title="删除"
                      v-if="userInfo && userInfo.id == sItm.user_id"
                      @click="delCommentOpt(sItm,index,sIndex)"
                    >&#xe88e;</a>
                  </div>
                </div>
                <!-- 时间 -->
                <div class="time">{{sItm.create_time | timeFilter()}}</div>
                <div class="cnt">
                  <a class="linkedName">@{{sItm.linked_user_name}}</a>
                  <span v-html="$options.filters.cntHtml(sItm.content)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pageList">
      <page
        :count="page.count"
        :pageIndex.sync="page.pageIndex"
        @index-change="indexChange"
        :pageSize="page.pageSize"
      ></page>
    </div>

    <inputPopup
      :visibility.sync="visibility"
      @updateComment="getCommentData"
      :linkedData="linkedData"
    ></inputPopup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import inputPopup from "../../components/inputPopup"; // 输入弹出框
import page from "../../components/pagination"; // 输入弹出框
export default {
  data() {
    return {
      commentList: [],
      visibility: false, // 弹框时否显示
      linkedData: null, // 关联的评论相关信息

      commentLikedArray: [], // 保存点赞过的评论id

      // 分页部分数据
      page: {
        count: 0,
        pageIndex: 1,
        pageSize: 10
      }
    };
  },
  filters: {
    // 对评论内容进行转码
    cntHtml(cnt) {
      return decodeURIComponent(cnt);
    },
    // 是否点过赞
    isAddLiked(id, commentLikedArray) {
      let isHas = commentLikedArray.filter(r => r == id).length > 0; // 判断是否点过赞
      return isHas ? "liked isHas" : "liked";
    }
  },
  components: {
    inputPopup,
    page
  },
  computed: {
    // 公共用户信息
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    ...mapActions("ajax", ["getComment", "likedComment", "delComment"]),
    // 添加一条创建的评论
    addNewComment(data) {},
    // 打开评论弹框
    showCommentModel(data) {
      if (!this.userInfo) {
        this.$parent.isShowLogin = true; // 显示登录弹框
        return;
      }
      this.linkedData = data; // 相关联评论信息
      this.visibility = true;
    },

    // 获取评论数据
    getCommentData() {
      let pageOpt = this.page; // 分页相关数据
      // 上传的参数
      let sendData = {
        pageIndex: pageOpt.pageIndex,
        pageSize: pageOpt.pageSize
      };
      this.getComment(sendData).then(res => {
        if (res.status) {
          let data = res.data; // 获取数据
          this.commentList = []; // 先清空数组
          this.commentList.push(...data.dataList);

          if (data.count != pageOpt.count) this.page.count = data.count;
        }
      });
    },

    // 改变评论分页，并重新获取数据
    indexChange(index) {
      this.page.pageIndex = index;
      this.getCommentData();
    },

    // 进行点赞
    likedChange(data, idx1, idx2) {
      let type = this.commentLikedArray.filter(id => data.id == id).length > 0; // 判断是否有过添加
      // 以下为保存点赞的相关操作
      if (type) {
        // 若有过则取消点赞
        for (let i = 0; i < this.commentLikedArray.length; i++) {
          if (this.commentLikedArray[i] == data.id) {
            this.commentLikedArray.splice(i, 1); // 删除对应的
            break;
          }
        }
      } else {
        // 若未保存过则进行添加
        this.commentLikedArray.push(data.id);
      }

      // 重新保存
      window.localStorage.removeItem("commentLikedArray"); // 先删除在添加
      window.localStorage.setItem(
        "commentLikedArray",
        JSON.stringify(this.commentLikedArray)
      );

      this.likedComment({
        id: data.id,
        type: !type
      }).then(res => {
        if (res.status) {
          let commentList = this.commentList[idx1];
          if (typeof idx2 === "number") {
            commentList.second_comment[idx2].liked = res.data;
          } else {
            commentList.liked = res.data;
          }
          this.commentList.splice(idx1, 1, commentList);

          this.$message(res.msg);
        }
      });
    },

    // 删除评论
    delCommentOpt(data, idx1, idx2) {
      this.delComment({
        id: data.id
      }).then(res => {
        if (res.status) {
          this.$message("删除成功");
          // 删除对应的数据
          let commentList = this.commentList[idx1];
          if (typeof idx2 === "number") {
            commentList.second_comment.splice(idx2, 1);
            this.commentList.splice(idx1, 1, commentList);
          } else {
            this.commentList.splice(idx1, 1);
          }
        }
      });
    }
  },
  created() {
    this.getCommentData();

    let commentLikedArray = window.localStorage.getItem("commentLikedArray");
    if (!commentLikedArray) {
      // 若没有则设置一个
      window.localStorage.setItem("commentLikedArray", "[]");
    } else {
      this.commentLikedArray = JSON.parse(commentLikedArray); // 有含有则进行获取
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
.commentList {
  // 内容部分
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
        word-break: break-all;
        .name {
          color: @mainColor2;
          font-size: 14px;
          margin-bottom: 5px;

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
          display: flex;
          justify-content: space-between;
          .index {
            padding: 0 8px;
          }
        }

        .cnt {
          color: @mainColor;
          min-height: 25px;
          margin-bottom: 20px;
          line-height: 1.4;
        }
        a {
          cursor: pointer;
        }
        // 点过赞
        .isHas {
          color: @redColor;
        }
        a.cb {
          color: @blueColor;
        }
        a.del {
          color: @orangeColor;
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
            a,
            span {
              vertical-align: middle;
            }
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

  // 分页部分
  .pageList {
    text-align: center;
    margin-top: 20px;
  }

  .sendMsgBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0;
  }
}
</style>