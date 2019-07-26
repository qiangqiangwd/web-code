<template>
  <div>
    <div class="inputPopup" @click.self="_close">
      <div>66{{visibility}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["visibility"],
  data() {
    return {};
  },
  methods: {
    //关闭弹框
    _close() {
      this.$emit("update:visibility", false);
    }
  },
  created() {},
  mounted() {}
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
}
</style>