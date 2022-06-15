<template>
  <img :src="musicList.al.picUrl" alt="" class="bgimg" />
  <div class="PopupTop">
    <div class="PopupTopLeft">
      <van-icon name="arrow-left" size="30" @click="updateDetailShow" />
      <div class="singer">
        <vue3-marquee style="width: 2.5rem; color: #fff">{{
          musicList.al.name
        }}</vue3-marquee>
        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
      </div>
    </div>
    <div class="PopupTopRight">
      <van-icon name="share-o" size="30" />
    </div>
  </div>
  <div class="PopupMid" v-show="isLyricShow">
    <img
      class="needle"
      src="../../assets/needle-ab.png"
      alt=""
      :class="{ needle_active: !isbtnShow }"
    />
    <img class="cipan" src="../../assets/cipan.png" alt="" />
    <img
      class="midimg"
      :src="musicList.al.picUrl"
      alt=""
      :class="{ midimg_paused: isbtnShow, midimg_active: !isbtnShow }"
    />
  </div>
  <div class="lyric">
    <p v-for="lyric in lyric" :key="lyric" :class="{active:(currentTime*1000>=lyric.time&&currentTime*1000<=lyric.pre)}">
    {{lyric.lrc}}
    </p>
  </div>
  <div class="PopupFooter">
    <div class="IconActions">
      <van-icon name="like-o" size="25" />
      <van-icon name="like-o" size="25" />
      <van-icon name="like-o" size="25" />
      <van-icon name="like-o" size="25" />
      <van-icon name="like-o" size="25" />
    </div>
    <div class="progress"></div>
    <div class="playActions">
      <van-icon name="play-circle-o" size="25" />
      <van-icon name="arrow-left" size="25" />
      <van-icon name="play-circle-o" size="45" @click="play" v-if="isbtnShow" />
      <van-icon name="pause-circle-o" size="45" @click="play" v-else />
      <van-icon name="arrow" size="25" />
      <van-icon name="play-circle-o" size="25" />
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isLyricShow: false,
    }
  },
  components: {
    Vue3Marquee,
  },
  computed: {
    ...mapState(['lyricList','currentTime']),
    lyric() {
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n/]+/).map((item, i) => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          if(isNaN(Number(mill))){
            mill=item.slice(7,9)
            lrc=item.slice(10,item.length)
            let time=parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          }

           //console.log(min, sec, Number(mill), lrc)
           return {min, sec, mill, lrc,time}
        })
        arr.forEach((element,i) => {
          if(i===arr.length-1){
            element.pre=0
          }else{
            element.pre=arr[i+1].time
          }

        });
      }
      console.log(arr);
      return arr
    },
  },
  mounted() {
    //console.log(this.musicList)
    console.log(this.lyricList.lyric);
  },
  props: ['musicList', 'play', 'isbtnShow'],
  methods: {
    ...mapMutations(['updateDetailShow']),
  },
}
</script>

<style lang="less" scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(45px);
}
.PopupTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 7px;
  .PopupTopLeft {
    display: flex;
    align-items: center;
    .singer {
      margin-left: 13px;
      span {
        font-size: 13px;
      }
    }
  }
}
.van-icon {
  color: #ffff;
}
.PopupMid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 9rem;
  position: relative;
  align-items: center;
  .needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-14deg);
    transition: 2s;
  }
  .needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(3deg);
    transition: 2s;
  }
  .cipan {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.2rem;
    z-index: -1;
  }
  .midimg {
    width: 3.2rem;
    height: 3.2rem;
    position: absolute;
    bottom: 3.1rem;
    border-radius: 50%;
    animation: rotate_midimg 20s linear infinite;
  }
  .midimg_active {
    animation-play-state: running;
  }
  .midimg_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_midimg {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.PopupFooter {
  .IconActions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .playActions {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.lyric{
  width: 100%;
  height: 9rem ;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    color: rgb(0, 0, 0);
    margin-bottom: 15px;
    
  }
  .active{
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }

}
</style>
