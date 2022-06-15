<template>
  <router-view></router-view>
  <footer-play></footer-play>
</template>

<script>
import FooterPlay from "./components/ItemMusic/FooterPlay.vue";
export default{
  components:{FooterPlay}
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
