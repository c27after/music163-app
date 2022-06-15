<template>
  <div class="footerplay">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横滑切换歌曲</span>
      </div>
    </div>
    <div class="footerRight">
      <van-icon
        name="play-circle-o"
        size="30"
        @click="play()"
        v-if="isbtnShow"
      />
      <van-icon name="pause-circle-o" size="30" @click="play()" v-else />
      <van-icon name="volume-o" size="30" />
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <music-popup
        :musicList="playList[playListIndex]"
        :play="play"
        :isbtnShow="isbtnShow"
      ></music-popup>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import MusicPopup from '../ItemMusic/MusicPopup.vue'
export default {
  data(){
    return{
      interVal:0
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow']),
  },
  components: {
    MusicPopup,
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
  },
  mounted() {
    this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
    console.log(this.$refs)
    //this.updateTime()//播放调用函数
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsBtnShow(false)
        this.updateTime()//播放调用函数
      } else {
        this.$refs.audio.pause()
        this.updateIsBtnShow(true)
        clearInterval(this.interVal)//暂停清楚定时器
      }
    },
    updateTime(){
     this.interVal=setInterval(()=>{
        this.updateCurrentTime(this.$refs.audio.currentTime)
      },1000)
    },
    ...mapMutations(['updateIsBtnShow', 'updateDetailShow','updateCurrentTime']),
    ...mapActions(['getMusicLyric'])
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsBtnShow(false)
      }
    },
    playList() {
      if (this.isbtnShow) this.$refs.audio.autoplay = true
      this.updateIsBtnShow(false)
    },
  },
}
</script>

<style lang="less" scoped>
.footerplay {
  width: 100%;
  height: 60px;
  background: #fff;
  position: fixed;
  border-top: 1px solid #eee;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .footerLeft {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      height: 1rem;
      width: 1rem;
      border-radius: 1rem;
    }
  }
}
</style>
