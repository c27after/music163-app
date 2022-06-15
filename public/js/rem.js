function remSize(){
  //获取设备宽度
  let deviceWidth=document.documentElement.clientWidth || window.innerWidth
  if(deviceWidth>750){
    deviceWidth=750
  }
  if (deviceWidth<320) {
    deviceWidth=320
  }
  //750px-----1rem==100px
  //375px-----1rem==100px
  document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
  document.querySelector('body').style.fontSize=0.3+'rem'
}
remSize()
window.onresize=function(){
  remSize()
}