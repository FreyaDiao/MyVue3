<template>
  <n-layout-footer bordered class="my-footer">
    就是不理你有限公司copyright@2015-{{curYear}}
  </n-layout-footer>
</template>

<script setup>
  const curYear = new Date().getFullYear();
</script>

<style lang="less" scoped>
  .my-footer {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>