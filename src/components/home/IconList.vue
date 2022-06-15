<template>
<div class="iconList">
<div class="iconItem">
  <van-icon name="chat-o" color="yellow" size="50"/>
  <span>每日推荐</span>
</div>
<div class="iconItem">
  <van-icon name="gem-o" color="green" size="50"/>
  <span>每日推荐</span>
</div>
<div class="iconItem">
  <van-icon name="star-o" color="red" size="50"/>
  <span>每日推荐</span>
</div>
<div class="iconItem">
  <van-icon name="service-o" color="blue" size="50"/>
  <span>每日推荐</span>
</div>
</div>
</template>

<script>
</script>

<style lang='less' scoped>
.iconList{
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;
  .iconItem{
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
  }
}
</style>