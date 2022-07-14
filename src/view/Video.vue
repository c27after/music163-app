<template>
  <nav-bar title="视频"></nav-bar>
  <div class="videoBox" v-if="!loading">
    <div class="videoItem" v-for="(item, i) in videoList" :key="i">
      <router-link class="content" :to="`/mv/${item.mv.id}`">
        <img class="coverUrl" :src="item.cover" alt="" />
        <div class="videoInfo">
          <span class="title">{{ item.name }}</span>
          <!-- <span>{{item.data.description}}</span> -->
          <div class="creatorInfo">
            <!-- <img class="avatarUrl" :src="item.data.creator.avatarUrl" alt="" /> -->
            <span>{{ item.artistName }}</span>
            <span>播放量:{{ item.playCount }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <SkeletonVideoVue v-else />
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import { getAllVideo } from '../request/api/video'
import SkeletonVideoVue from '../components/SkeletonVideo.vue'
import { ref } from 'vue'
export default {
  name: 'Video',
  components: {
    SkeletonVideoVue,
  },
  setup() {
    const state = reactive({
      videoList: [],
    })
    let loading = ref(true)
    onBeforeMount(async () => {
      loading.value = true
      let res = await getAllVideo()
      state.videoList = res.data.data
      // state.videoList.findIndex( (item,i)=>{
      //   item.type===7
      // } )
      loading.value = false
    })
    return {
      ...toRefs(state),
      loading,
    }
  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
}
.videoItem {
  display: flex;
  margin: 15px 5px;
}
.videoInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  .creatorInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
}
.title {
  display: -webkit-box;
  width: 190px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 15px;
  font-weight: bold;
}
.coverUrl {
  width: 160px;
  height: 100px;
  border-radius: 7px;
}
// .avatarUrl {
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
// }
a {
  color: #000;
}
</style>
