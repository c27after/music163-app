import { Swipe, SwipeItem, Icon ,Popup } from 'vant'

let plugins = [Swipe, SwipeItem, Icon,Popup]

export default function getVant(app){
  plugins.forEach((item)=>{
    return app.use(item)
  })
}