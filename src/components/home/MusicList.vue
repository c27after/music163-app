<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="160"
        class="hand-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.List" :key="item">
        <router-link :to="{path:'/ItemMusic',query:{id:item.id}}">
          <img :src="item.picUrl" alt="" />
          <span class="playCount"
            ><van-icon name="like-o"/>{{ playCount(item.playCount) }}</span
          >
          <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getMisicList } from '../../request/api/home'
export default {
  setup() {
    const state = reactive({
      List: [],
    })
    onMounted(async () => {
      let res = await getMisicList()
      state.List = res.data.result
      console.log(state.List)
    })
    const playCount = (num) => {
      if (num > 100000000) return (num / 100000000).toFixed(1) + '亿'
      else if (num > 10000) return (num / 10000).toFixed(1) + '万'
    }
    return { state, playCount }
  },
}
</script>

<style lang="less" scoped>
.musicTop {
  display: flex;
  width: 100%;
  height: 0.8rem;
  justify-content: space-between;
  margin-top: 0.2rem;
  padding: 0 0.3rem;
  align-items: center;
  .title {
    font-weight: bold;
    font-size: 0.36rem;
  }
  .more {
    font-size: 18px;
    border: 0.02rem solid #eee;
    padding: 5px 20px;
    border-radius: 0.3rem;
    cursor: pointer;
  }
}
.musicContent {
  width: 100%;
  height: 4.5rem;
  .van-swipe{
    width: 100%;
    height: 100%;
    .van-swipe-item {
    flex-shrink:1;
    position: relative;
    height: 100%;
    width: 100%;
    margin:.1rem;
    // margin: .1rem 15px;
    .playCount {
      
      position: absolute;
      left: 0;
      color: #fff;
    }
    img {
      border-radius: 10px;
      height: 150px;
    }
  }
  }
  
}
a{
  color: #000;
}
</style>
