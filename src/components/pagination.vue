<template>
  <div class="pagingation">
      <div class="box">1</div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style scoped lang="less">
.pagingation{
    .box{
        display: flex;
    }
}
</style>