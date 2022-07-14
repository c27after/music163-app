<template>
<!-- 视频区域 -->
  <div>
    <video
      preload
      muted="true"
      controls
      autoplay
      name="meida"
      :src="url"
    ></video>
  </div>
<!-- 作者，简历区 -->
  <div class="InfoD">
    <div class="letf">
      <div class="artists" v-for="(item, i) in data.artists" :key="i">
        <img :src="item.img1v1Url" alt="" />
        <span style="margin-left: 5px">{{ item.name }}</span>
      </div>
    </div>
    <div class="right">
      <span>发布日期：{{ data.publishTime }}</span>
    </div>
  </div>
  <div class="desc">
    &nbsp;&nbsp;<span v-if="data.desc">简介：{{ data.desc }}</span>
    <span v-else>暂无简介</span>
  </div>
  <!-- 操作按钮区 -->
  <div class="mvInfo">
    <div class="box">
      <van-icon name="chat-o" size="24" />
      <span>{{ commentCount }}</span>
    </div>
    <div class="box">
      <van-icon name="like-o" size="24" />
      <span>{{ likedCount }}</span>
    </div>
    <div class="box">
      <van-icon name="star-o" size="24" />
      <span class="star">收藏</span>
    </div>
    <div class="box">
      <van-icon name="share-o" size="24" />
      <span>{{ shareCount }}</span>
    </div>
  </div>
  <!-- 骨架屏 -->
  
  <div class="commentBox" v-if="comments&&comments.length>0">
    <h4 v-show="hotComment&&hotComment.length>0">精彩热评</h4>
    <div class="hot">
      <div class="hotComment" v-for="comm in hotComment" :key="comm.commentId">
        <div class="hcTop">
          <img :src="comm.user.avatarUrl" alt="" />
          <div class="commUser">
            <span>{{ comm.user.nickname }}</span>
            <span>{{ comm.timeStr }}</span>
          </div>
        </div>
        <div class="hcomment">
          <span>{{ comm.content }}</span>
        </div>
        <span class="good"
          ><van-icon name="good-job-o" size="15" />{{ comm.likedCount }}</span
        ><span style="font-size: 14px; margin-left: 15px">回复</span>
      </div>
    </div>
    <div class="ncomment">
      <h4>最新评论</h4>
      <div class="hotComment" v-for="comm in comments" :key="comm.commentId">
        <div class="hcTop">
          <img :src="comm.user.avatarUrl" alt="" />
          <div class="commUser">
            <span>{{ comm.user.nickname }}</span>
            <span>{{ comm.timeStr }}</span>
          </div>
        </div>
        <div class="hcomment">
          <span>{{ comm.content }}</span>
        </div>
        <span class="good"
          ><van-icon name="good-job-o" size="15" />{{ comm.likedCount }}</span
        ><span style="font-size: 14px; margin-left: 15px">回复</span>
      </div>
    </div>
  </div>
  <Skeleton v-else/>
</template>

<script>
import Skeleton from '../../components/video/Skeleton'
import { useRoute } from 'vue-router'
import { onBeforeMount, reactive, ref, toRefs } from 'vue'
import {
  getVideoItem,
  getVideoInfo,
  getVideoComment,
} from '../../request/api/video'
import Skeleton1 from './Skeleton.vue'
// import { videoPlay } from 'vue3-video-play'
export default {
    name: "VideoDetail",
    props: {
        data: {
            type: Object,
        },
    },
    setup(props) {
        const route = useRoute();
        let url = ref("");
        let mvInfo = reactive({
            commentCount: "",
            likedCount: "",
            shareCount: "",
            hotComment: [],
            comments: []
        });
        console.log(props.data);
        onBeforeMount(async () => {
            //获取mv播放地址
            let res = await getVideoItem(route.params.id);
            url.value = res.data.data.url;
            //获取点赞等信息
            let info = await getVideoInfo(route.params.id);
            mvInfo.commentCount = info.data.commentCount;
            mvInfo.likedCount = info.data.likedCount;
            mvInfo.shareCount = info.data.shareCount;
            //获取mv评论
            let { data } = await getVideoComment(route.params.id);
            mvInfo.hotComment = data.hotComments;
            mvInfo.comments = data.comments;
            console.log(data);
        });
        return {
            url,
            ...toRefs(mvInfo),
        };
    },
    components: { Skeleton1 }
}
</script>

<style lang="less" scoped>
video {
  width: 100%;
}
.mvInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 5px;
  margin-top: 10px;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .star {
      font-size: 14px;
    }
  }
}
.artists {
  display: flex;
  align-items: flex-end;
}
.artists img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.InfoD {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 10px;
  font-size: 13px;
  .letf {
    display: flex;
    align-items: center;
  }
}
.desc {
  margin: 5px 5px;
  display: -webkit-box;
  width: 375px;
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  font-size: 14px;
  color: gray;
}
.hotComment {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.hotComment img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.hcTop {
  display: flex;
  .commUser {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 13px;
    color: gray;
    margin-left: 5px;
  }
}
.commentBox {
  margin: 10px 5px;
  .hcomment {
    margin: 5px 0;
    margin-left: 35px;
    font-size: 14px;
  }
}
.good {
  font-size: 15px;
  margin-left: 35px;
}
</style>
