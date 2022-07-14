<template>
  <div class="songsBox">
    <div class="songsTop">
      <div class="songsCount">
        <van-icon name="tv-o" size="28" /><span
          >共{{ playlistsongs.length }}首</span
        >
      </div>
      <div class="subCount">+收藏 {{ subscribedCount }}</div>
    </div>
    <div class="songs">
      <div class="songsItem" v-for="(item, i) in playlistsongs" :key="i">
        <span class="index">{{ i + 1 }}</span>
        <div class="songsDis" @click="playMusic(i)">
          <div class="songsitemdetail">
            <span>{{ item.al.name }}</span>
            <div class="singer">
              <span v-for="(name, i) in item.ar" :key="i">{{ name.name }}</span>
            </div>
          </div>
          <div>
            <van-icon name="video-o" size="25" v-if="item.mv != 0" /><van-icon
            name="guide-o"
            size="25"
            style="margin-left: 15px"
          />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  setup(props) {
    console.log(props)
  },
  methods:{
    playMusic(i){
      this.updateplayList(this.playlistsongs)
      this.updatePlayListIndex(i)
    },
    ...mapMutations(['updateplayList','updatePlayListIndex'])
  },
  props: ['playlistsongs', 'subscribedCount'],
}
</script>

<style lang="less" scoped>
.songsBox {
  margin-top: 0.2rem;
  background-color: #fff;
  width: 100%;
  height: auto;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  .songsTop {
    display: flex;
    justify-content: space-between;
    padding: 7px 10px;
    align-items: center;
    .songsCount {
      display: flex;
      align-items: center;
      font-size: 20px;
      .van-icon {
        margin-right: 0.1rem;
      }
    }
    .subCount {
      border: 0.02rem solid red;
      border-radius: 10px;
      background-color: red;
      color: #fff;
      padding: 5px 10px;
    }
  }
  .songs {
    padding: 0 7px;
    margin-bottom: 60px;
    .songsItem {
      display: flex;
      height: 50px;
      align-items: center;
      .songsDis{
        display: flex;
        justify-content: space-between;
        width: 100%;
        .songsitemdetail {
        display: flex;
        flex-direction: column;
        font-size: 15px;
        font-weight: bold;
        .singer {
          display: flex;
          font-size: 12px;
          font-weight: 500;
        }
      }
      }
      
      .index {
        font-size: 22px;
        margin-right: 7px;
      }
    }
  }
}
</style>
