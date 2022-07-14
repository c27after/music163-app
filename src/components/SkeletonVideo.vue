<template>
  <van-skeleton :row="3" />
  <van-skeleton :row="3" />
  <van-skeleton :row="3" />
</template>

<script setup></script>

<style lang="less" scoped>
/deep/ .van-skeleton__content {
  margin: 10px 5px;
}
/deep/ .van-skeleton {
  padding: 0;
}
</style>
