import { createRouter,createWebHashHistory } from "vue-router";
import Home from "../view/Home.vue"
import ItemMusic from "../view/ItemMusic.vue"

const routes =[
  {
    path:"/",
    component:Home
  },
  {
    path:"/ItemMusic",
    component:ItemMusic
  }
]

const router = createRouter({
  routes,
  history:createWebHashHistory()
})

export default router