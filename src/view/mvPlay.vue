<template>
  <nav-bar :title="title"></nav-bar>
  <video-detail :data="info"></video-detail>
</template>

<script setup>
import { getVideoInfoDetail } from '../request/api/video'
import { useRoute } from 'vue-router'
import { onBeforeMount, reactive, ref } from 'vue'
const route = useRoute()
let info = reactive({
  artists: {},
  desc: '',
  publishTime: '',
})
let title = ref('')
onBeforeMount(async () => {
  let { data } = await getVideoInfoDetail(route.params.id)
  info.artists = data.data.artists
  info.desc = data.data.desc
  info.publishTime = data.data.publishTime
  title.value=data.data.name
})
console.log(info)
</script>

<style lang="less" scoped></style>
