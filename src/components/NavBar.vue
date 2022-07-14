<template>
  <van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    }
  },
  setup() {
    const onClickLeft = () => history.back()
    return {
      onClickLeft,
    }
  },
}
</script>

<style lang="less" scoped></style>
