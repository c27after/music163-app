import service from "../request";

export function getMusicItemList(data){
  return service({
    method:"Get",
    url:`/playlist/detail?id=${data}`
  })
}
//获取歌单歌曲
export function getMusicItemListDetail(data){
  return service({
    method:"Get",
    url:`/playlist/track/all?id=${data}&limit=20&offset=0`
  })
}
//获取歌词/lyric?id=33894312
export function getMusicLyric(data){
  return service({
    method:"Get",
    url:`/lyric?id=${data}`
  })
}