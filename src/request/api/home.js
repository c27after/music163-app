import service from "../request";

//获取轮播图数据
export function getBanner(){
  return service({
    method:"Get",
    url:"/banner?type=2"
  })
}
//获取歌单
export function getMisicList(){
  return service({
    method:"Get",
    url:"/personalized?limit=10"
  })
}