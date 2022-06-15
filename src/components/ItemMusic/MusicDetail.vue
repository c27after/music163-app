<template>
  <!-- 头部 -->
  <div class="ItemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
    <div class="itemLeft">
      <van-icon name="arrow-left" size="25" @click="$router.go(-1)" />
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <van-icon name="search" size="25" />
      <van-icon name="search" size="25" />
    </div>
  </div>
  <!-- 歌单信息 -->
  <div class="ItemInfo">
    <div>
      <img :src="playlist.coverImgUrl" alt="" class="ItemInfoImg" />
    </div>
    <div class="creatorInfo">
      <span class="playlist-name">
        {{ playlist.name }}
      </span>
      <div class="creator">
        <img :src="playlist.creator.avatarUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
      </div>
      <div class="description">
        {{ playlist.description }}
      </div>
    </div>
  </div>
  <!-- 展示 -->
  <div class="shwoActions">
    <div class="iconItem">
      <van-icon name="chat-o" color="yellow" size="50" />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <van-icon name="gem-o" color="green" size="50" />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <van-icon name="star-o" color="red" size="50" />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <van-icon name="service-o" color="blue" size="50" />
      <span>每日推荐</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator
    }
  },
  props: ['playlist'],
}
</script>

<style lang="less" scoped>
.ItemMusicTop {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 1rem;
  .itemLeft,
  .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    span {
      font-size: 0.3.5rem;
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .bgimg {
    position: fixed;
    width: 100%;
    z-index: -1;
    filter: blur(20px);
  }
}
.ItemInfo {
  margin-top: 0.2rem;
  width: 100%;
  span {
    color: #fff;
  }
  display: flex;
  justify-content: space-around;
  .ItemInfoImg {
    width: 3rem;
    height: 3rem;
    border-radius: 0.2rem;
  }
  .creatorInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .playlist-name {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
    }
    .description {
      display: -webkit-box;
      width: 200px;
      height: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      color: #fff;
      font-size: 16px;
    }
    .creator {
      display: flex;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-right: 0.2rem;
      }
    }
  }
}

.shwoActions {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  margin-top: 0.2rem;
  span{
    color: #fff;
  }
  .iconItem {
    display: flex;
    width: 25%;
    flex-direction: column;
    align-items: center;
  }
}
</style>
