<template>
  <div id="TopSwiper">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted,reactive } from "vue"
import {getBanner} from "../../request/api/home"
export default {
  setup() {
    const state = reactive({
      images:[

      ]
    });
    onMounted(async()=>{
      // axios.get('http://localhost:4000/banner?type=2').then((res)=>{
      //   console.log(res);
      //   state.images=res.data.banners
      // })
      let res = await getBanner()
      state.images=res.data.banners
    })
    return { state }
  },
}
</script>

<style lang="less">
#TopSwiper {
  .van-swipe {
    width: 100%;
    height: 150px;
    .van-swipe-item{
      width: 100%;
      height: 100%;
      padding: 0 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
  }
}
</style>
