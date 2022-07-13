<template>
  <div class="searchTop">
    <van-icon name="arrow-left" size="30" @click="$router.go(-1)" />
    <input
      class="searchBox"
      type="text"
      placeholder="陈奕迅"
      @keydown.enter="enterKey"
      v-model="searchKey"
    />
  </div>
  <div class="history">
    <div class="actionBox">
      <span class="lishi">历史</span>
      <van-icon name="cross" size="20" @click="delHistory" />
    </div>
    <span
      class="historyItem"
      @click="serachHistory(item)"
      v-for="item in keyWorldList"
      :key="item"
      >{{ item }}</span
    >
  </div>
  <div class="songs" v-if="!showHotSearch">
    <div
      class="songsItem"
      v-for="(item, i) in songs"
      :key="i"
      @click="playSong(item)"
    >
      <span class="index">{{ i + 1 }}</span>
      <div class="songsDis">
        <div class="songsitemdetail">
          <span>{{ item.name }}</span>
          <!-- <span v-for="item3 in item.alias" :key="item3">{{ item3 }}</span> -->
          <div class="singer">
            <span v-for="(item2, i) in item.artists" :key="i"
              >{{ item2.name }}&nbsp;&nbsp;
            </span>
          </div>
        </div>
        <div>
          <van-icon name="video-o" size="25" v-if="item.mvid != 0" /><van-icon
            name="guide-o"
            size="25"
            style="margin-left: 15px"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="hotSearch" v-else>
    <h2><van-icon name="fire-o" color="red" />热搜榜</h2>
    <div
      class="hotItem"
      v-for="(hot, i) in hotSearch.data"
      :key="hot"
      @click="serachHistory(hot.searchWord)"
    >
      <div>
        <span style="margin-right: 10px">{{ i + 1 }}.</span>
        <span>{{ hot.searchWord }}</span>
      </div>
      <span
        ><van-icon name="fire-o" color="red" />{{
          this.countScore(hot.score)
        }}</span
      >
    </div>
  </div>
</template>

<script>
import { searchSongs, searchHotSongs } from '../request/api/search'
import { mapMutations } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Search',
  data() {
    return {
      keyWorldList: [],
      searchKey: '',
      songs: [],
      hotSearch: [],
      showHotSearch: true,
    }
  },

  mounted() {
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList'))
      ? JSON.parse(localStorage.getItem('keyWorldList'))
      : []
    this.searchHot()
  },

  methods: {
    async enterKey() {
      if (this.searchKey !== '') {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        })
        this.keyWorldList.unshift(this.searchKey)
        this.keyWorldList = [...new Set(this.keyWorldList)]
        if (this.keyWorldList.length > 8) {
          this.keyWorldList.splice(this.keyWorldList.length - 1, 1)
        }

        localStorage.setItem('keyWorldList', JSON.stringify(this.keyWorldList))

        let res = await searchSongs(this.searchKey)
        this.songs = res.data.result.songs
        if (this.songs === undefined) {
          Toast('网络繁忙，请重试！')
        }
        this.searchKey = ''
        this.showHotSearch = false
      }
    },
    async serachHistory(key) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      let res = await searchSongs(key)
      this.songs = res.data.result.songs
      this.showHotSearch = false
      if (this.songs === undefined) {
        Toast('网络繁忙，请重试！')
        this.showHotSearch = true
      }
      console.log(this.songs)
    },
    //展示热门搜索
    async searchHot() {
      let { data } = await searchHotSongs()
      this.hotSearch = data
      console.log(this.hotSearch)
    },
    delHistory() {
      localStorage.removeItem('keyWorldList')
      this.keyWorldList = ''
    },
    playSong(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('playSearchSong', item)
      this.$store.commit(
        'updatePlayListIndex',
        this.$store.state.playList.length - 1
      )
    },
    countScore(num) {
      if (num > 100000000) return (num / 100000000).toFixed(1) + '亿'
      else if (num > 10000) return (num / 10000).toFixed(1) + '万'
    },

    ...mapMutations(['playSearchSong']),
  },
}
</script>

<style lang="less" scoped>
.searchTop {
  display: flex;
  align-items: center;
}
.searchBox {
  width: 80%;
  border: none;
  border-bottom: 1px solid #000;
  height: 30px;
}
.actionBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  .lishi {
    font-weight: bold;
    font-size: 15px;
  }
}
.historyItem {
  background-color: aquamarine;
  display: inline-block;
  padding: 5px;
  margin: 5px 15px;
  border-radius: 30px;
}

.songs {
  padding: 0 7px;
  margin-bottom: 60px;
  .songsItem {
    display: flex;
    height: 50px;
    align-items: center;
    overflow: hidden;
    .songsDis {
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
.hotSearch {
  padding: 5px 15px;
  margin-bottom: 60px;
  .hotItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    font-size: 16px;
  }
}
</style>
