<template>
<top-nav></top-nav>
<top-swiper></top-swiper>
<icon-list></icon-list>
<music-list></music-list>
</template>

<script>
import TopNav from "../components/home/TopNav.vue"
import TopSwiper from "../components/home/TopSwiper.vue"
import IconList from "../components/home/IconList.vue"
import MusicList from "../components/home/MusicList.vue"
export default{
  components:{
    TopNav
    ,TopSwiper,
    IconList,
    MusicList
  }
}
</script>

<style scoped>

</style>