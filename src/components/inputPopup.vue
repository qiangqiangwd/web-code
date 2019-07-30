<template>
  <div class="inputPopup" v-if="visibility">
    <div class="table">
      <div class="cell">
        <!-- @click.self="_close" -->
        <div class="inputBox">
          <div class="firstTit">
            发表评论
            <i class="iconfont">&#xe88f;</i>
            <a class="iconfont closeBtn" @click="_close" title="关闭">&#xe899;</a>
          </div>
          <div class="numberBox" :word-number="comment.length+'/'+maxLength">
            <div
              ref="textarea"
              :class="['textarea',comment?'':'null',comment.length>=maxLength?'full':'']"
              contenteditable="true"
              @input="getMsg"
              @focus="inputFocus"
              @blur="inputBlur"
              :word-number="comment.length+'/'+maxLength"
            >{{placeholder}}</div>
            <!-- <textarea
              ref="textarea"
              :class="['textarea',comment?'':'null',comment.length>=maxLength?'full':'']"
              v-model="comment"
              :placeholder="placeholder"
            ></textarea>-->
          </div>
          <div class="buttonBox">
            <a
              class="addFaceIcon iconfont"
              ref="faceBaoBtn"
              @click="takeFaceBao"
              title="添加表情"
            >&#xe8ac;</a>
            <button
              :class="['mainButton',comment?'success':'disabled']"
              @click="createNewComment"
            >提交评论</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "../assets/js/posAddElem";
import { mapActions } from "vuex";
export default {
  props: ["visibility", "linkedData"],
  data() {
    return {
      comment: "",
      placeholder: "不发表下自己的见解么？", // 默认提示语
      maxLength: 200, // 最大字数限制

      // 表情弹框对象
      faceBaoObj: null
    };
  },
  watch: {
    linkedData(newVal) {
      this.placeholder = newVal ? "@" + newVal.name : "不发表下自己的见解么？";
    }
  },
  methods: {
    ...mapActions("ajax", ["newComment"]),
    //关闭弹框
    _close() {
      this.comment = ""; // 关闭后清空输入数据
      this.hideFaceBao(); // 关表情包
      this.$emit("update:visibility", false);
    },
    // 若获得焦点
    inputFocus() {
      // 若当前内容为空
      if (!this.comment) {
        this.$refs.textarea.innerText = "";
      }
    },
    // 失去焦点
    inputBlur() {
      if (!this.comment) {
        this.$refs.textarea.innerText = this.placeholder;
      }
    },
    // 获取输入的信息
    getMsg() {
      // 获取输入框节点
      let ele = this.$refs.textarea;
      let comment = ele.innerHTML;
      if (comment.length <= this.maxLength) {
        this.comment = comment;
      } else {
        ele.innerHTML = this.comment; // 使输入框内容 永远保持在 字数限制内
        let range = window.getSelection(); //创建range
        range.selectAllChildren(ele); //range 选择obj下所有子内容
        range.collapseToEnd(); //光标移至最后
      }
    },
    // 打开表情包
    takeFaceBao() {
      if (!this.faceBaoObj) {
        let _this = this;
        this.faceBaoObj = new $(this.$refs.faceBaoBtn);
        // 打开表情包
        this.faceBaoObj.openFaceBao(img => {
          let wordCount = _this.comment.length + img.length;
          if (wordCount <= _this.maxLength) {
            // 改变对应的值
            _this.comment += img;
            _this.$refs.textarea.innerHTML = _this.comment;
          } else {
            _this.$message("字数爆仓啦！");
          }

          _this.hideFaceBao();
        });
      } else {
        this.hideFaceBao();
      }
    },
    // 关闭表情包
    hideFaceBao() {
      if (this.faceBaoObj) {
        // 关闭表情包
        this.faceBaoObj.hideFaceBao();
        this.faceBaoObj = null;
      }
    },
    // 创建新的评论
    createNewComment() {
      let comment = this.comment.trim();
      // console.log(this.$refs.textarea.innerText);
      // console.log("获取的关联信息：", this.linkedData);
      if (!comment) {
        this.$message("嘿！内容不能为空或纯空格哦~");
        return;
      }
      let linkedData = this.linkedData;
      let sendData = {
        content: encodeURIComponent(comment.replace(/\%/g, "%25")), // 内容
        linked_comment_id: linkedData
          ? linkedData.linked_comment_id || linkedData.id
          : "", // 关联评论id
        linked_user_id: linkedData ? linkedData.user_id : "" // 关联用户id
        // linked_article_id: null // 关联文章id【这里不用】
      };
      this.newComment(sendData).then(res => {
        // console.log(res);
        if (res.status) {
          let data = res.data;
          this.$message(res.msg);
          this._close(); // 关弹框
          // 更新评论
          this.$emit("updateComment");
        }
      });
    }
  }
  // created() {
  //   this.showPlaceholder = this.placeholder; // 获取显示的提示语
  // },
};
</script>
<style scoped lang="less">
.inputPopup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  // .firstTit {
  //   position: relative;
  // }
  .table {
    display: table;
    width: 100%;
    height: 100%;
    .cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }
    .inputBox {
      display: inline-block;
      background: #ffffff;
      padding: 20px 10px;
      width: 90%;
      max-width: 400px;
      border-radius: 4px;
      text-align: left;
      box-sizing: border-box;
      position: relative;
      .closeBtn {
        position: absolute;
        right: 10px;
        top: 10px;
        color: @redColor;
        font-size: 26px;
        cursor: pointer;
        opacity: .5;
        transition: opacity linear .25s;
        &:hover{
          opacity: 1;
          transition: opacity linear .25s;
        }
      }
      .firstTit {
        margin-bottom: 10px;
      }
      // 为空时
      .null {
        color: @mainColor3;
      }
      // 字数爆仓时
      .full[word-number]::after {
        color: @redColor;
      }
    }
  }
  .buttonBox {
    // text-align: right;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .addFaceIcon {
      display: inline-block;
      font-size: 24px;
      margin-right: 10px;
      cursor: pointer;
      color: @mainColor2;
      transition: color linear 0.25s;
      &:hover {
        color: @blueColor;
        transition: color linear 0.25s;
      }
    }
  }
  .textarea {
    width: 100%;
    outline: none;
    box-sizing: border-box;
    resize: none;
    padding: 10px 10px 20px 10px;
    font-size: 14px;
    min-height: 80px;
    color: @mainColor;
    border: none;
  }
  .numberBox {
    width: 100%;
    display: inline-block;
    line-height: 1;
    position: relative;
    font-size: 0;
    border: 1px solid @borderColor;
    border-radius: 4px;
  }
  .numberBox[word-number]::after {
    content: attr(word-number);
    color: @mainColor3;
    font-size: 12px;
    position: absolute;
    bottom: 3px;
    right: 10px;
  }
}
</style>