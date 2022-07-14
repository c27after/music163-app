import server from '../request'

export function getAllVideo() {
  return server({
    methods: 'GET',
    url: `/top/mv?limit=10`,
  })
}
//获取具体mv
export function getVideoItem(id) {
  return server({
    methods: 'GET',
    url: `/mv/url?id=${id}`,
  })
}
//获取mv点赞数评论数
export function getVideoInfo(id) {
  return server({
    methods: 'GET',
    url: `/mv/detail/info?mvid=${id}`,
  })
}
//获取mv信息
export function getVideoInfoDetail(id) {
  return server({
    methods: 'GET',
    url: `/mv/detail?mvid=${id}`,
  })
}
//获取mv评论
export function getVideoComment(id) {
  return server({
    methods: 'GET',
    url: `/comment/mv?id=${id}`,
  })
}
