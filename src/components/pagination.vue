<template>
  <div class="pagingation" v-if="pageCount > 0">
    <ul class="box">
      <li :class="['othBtn',pageIndex > 1 ? '':'canNotUse']" @click="changePageIndex('prev')">上一页</li>
      <li
        :class="pageIndex == item ? 'active':'not-active'"
        v-for="(item,index) in pageListArr"
        :key="index"
        @click="changePageIndex(item)"
      >{{item}}</li>
      <li
        :class="['othBtn',pageIndex < pageCount ? '':'canNotUse']"
        @click="changePageIndex('next')"
      >下一页</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // 总的数量
    count: {
      default: 0
    },
    // 每页显示数
    pageSize: {
      default: 10
    },
    // 当前所在页数
    pageIndex: {
      default: 1
    }
  },
  data() {
    return {
      pageCount: 0, // 含有的页数
      modalPageIndex: 0, // 组件当前的页数

      pageListArr: [] // 显示分页的数据数组
    };
  },
  methods: {
    // 切换页数
    changePageIndex(type) {
      let index =
        typeof type === "number"
          ? type
          : (() => {
              // debugger
              let pIndex = this.pageIndex;
              if (type === "prev" && pIndex > 1) {
                pIndex -= 1;
              } else if (type === "next" && pIndex < this.pageCount) {
                pIndex += 1;
              }
              return pIndex;
            })();

      if (index !== this.pageIndex) {
        // 当不为相同页数时
        this.$emit("update:pageIndex", index);
        this.modalPageIndex = index;
        this.getPageIndexList(); // 切换分页

        // 返回参数给父级
        this.$emit("index-change", index);
      }
    },

    // 获取页数显示的数组
    getPageIndexList() {
      let pageCount = this.pageCount; // 获取总页数
      let pageListArr = [];

      if (pageCount < 7) {
        for (let i = 0; i < pageCount; i++) {
          // 最多只显示 7 条数据
          pageListArr.push(i + 1);
        }
      } else {
        let pageIndex = this.modalPageIndex; // 当前所在页数

        pageListArr.push(1);
        // debugger
        if (pageIndex <= 4) {
          pageListArr.push(...[2, 3, 4, 5, 6, "..."]);
        } else if (pageIndex >= pageCount - 3) {
          pageListArr.push(
            ...[
              "...",
              pageCount - 5,
              pageCount - 4,
              pageCount - 3,
              pageCount - 2,
              pageCount - 1
            ]
          );
        } else if (pageIndex > 4 && pageIndex <= pageCount - 4) {
          pageListArr.push(
            ...[
              "...",
              pageIndex - 2,
              pageIndex - 1,
              pageIndex,
              pageIndex + 1,
              pageIndex + 2,
              "..."
            ]
          );
        }
        pageListArr.push(pageCount);
      }

      this.pageListArr = [];
      this.pageListArr.push(...pageListArr);
    },

    // 分页初始化
    paginationInit() {
      // 计算出一共有几页
      this.pageCount = Math.ceil(this.count / this.pageSize);
      this.modalPageIndex = this.pageIndex; // 初始化当前页数
      if (this.pageCount > 0 && this.pageIndex > this.pageCount) {
        this.modalPageIndex = this.pageCount;
        // 当前所在页数不能超过最大页数
        this.$emit("update:pageIndex", this.pageCount);
      }

      this.getPageIndexList();
    }
  },
  watch: {
    // 监听总数的变化
    count() {
      this.paginationInit();
    }
  },
  created() {
    this.paginationInit();
  }
};
</script>
<style scoped lang="less">
.pagingation {
  display: inline-block;
  line-height: 1;
  .box {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    @li_h: 30px;
    li {
      box-sizing: border-box;
      width: @li_h;
      height: @li_h;
      line-height: @li_h;
      text-align: center;
      border: 1px solid;
      font-size: 14px;
      cursor: pointer;
      border-radius: 3px;
      margin: 5px;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .othBtn {
      font-size: 12px;
      width: 60px;
      color: @mainColor3;
    }
    .canNotUse {
      color: @Invalid;
      cursor: not-allowed;
    }
    .active {
      color: @successColor;
    }
    .not-active {
      color: @mainColor3;
    }
  }
}
</style>