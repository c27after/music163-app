<template>
  <item-music :playlist="state.playlist"></item-music>
  <music-list
    :playlistsongs="state.playlistsongs"
    :subscribedCount="state.playlist.subscribedCount"
  ></music-list>
</template>

<script setup>
import { getMusicItemList, getMusicItemListDetail } from '../request/api/Item'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import ItemMusic from '../components/ItemMusic/MusicDetail.vue'
import MusicList from '../components/ItemMusic/MusicList.vue'
const state = reactive({
  playlist: {},
  playlistsongs: [],
})
onMounted(async () => {
  let id = useRoute().query.id
  let res = await getMusicItemList(id)
  state.playlist = res.data.playlist
  console.log(res)
  let result = await getMusicItemListDetail(id)
  state.playlistsongs = result.data.songs
  console.log(result)
  //防止页面刷新，数据丢失，将数据保存到sessionStorage中
  sessionStorage.setItem('itemDetail', JSON.stringify(state))
})
</script>

<style scoped></style>
