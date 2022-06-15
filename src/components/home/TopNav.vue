<template>
  <div class="TopNav">
    <div class="topLeft"><van-icon name="setting-o" size="30" /></div>
    <div class="topContent">
      <span>我的</span><span class="active">发现</span><span>歌单</span
      ><span>视频</span>
    </div>
    <div class="topRight"><van-icon name="search" size="30" /></div>
  </div>
</template>

<script></script>

<style lang="less" scoped>
.TopNav {
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 20px;
    .active {
      font-weight: bold;
    }
  }
}
</style>
