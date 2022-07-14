import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../view/Home.vue'
import ItemMusic from '../view/ItemMusic.vue'
import Search from '../view/Search.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/ItemMusic',
    component: ItemMusic,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/video',
    component: () => import('../view/Video.vue'),
  },
  {
    path: '/mv/:id',
    name: 'mvPlay',
    component: () => import('../view/mvPlay'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
