import { createStore } from 'vuex'
import { getMusicLyric } from '../request/api/Item'

export default createStore({
  state: {
    playList: [
      {
        al: {
          //给播放列表一个默认值
          id: 35702116,
          name: '哪里都是你',
          pic: 109951162964628420,
          picUrl:
            'https://p1.music.126.net/lnOnBbP_H-052Hv5ls-QjA==/109951162964628408.jpg',
          pic_str: '109951162964628408',
        },
        id: 488249475,
      },
    ],
    playListIndex: 0,
    //暂停按钮的显示
    isbtnShow: true,
    detailShow: false,
    lyricList: {}, //歌词,
    currentTime: 0,
  },
  mutations: {
    updateIsBtnShow(state, value) {
      state.isbtnShow = value
    },
    updateplayList(state, value) {
      state.playList = value
      console.log(state.playList)
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
      console.log(state.currentTime)
    },
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      console.log(res)
      context.commit('updateLyricList', res.data.lrc)
    },
  },
  modules: {},
})
