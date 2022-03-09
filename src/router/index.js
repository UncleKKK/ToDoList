import { createRouter, createWebHistory } from 'vue-router'
import { get_storage_for_token } from '@/utils/storage'

/** 自动加载其他路由模块 */
const files = require.context('.', true, /\.ts$/)
const modules = []
files.keys().forEach((key) => {
  if (key === './index.ts') return
  modules.push(files(key).default)
})
const routes= [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView/Home.vue'),
  },
  {
    path: '/pin',
    name: 'Pin',
    component: () => import('@/views/Pin/Pin.vue'),
  },
  {
    path: '/user',
    name: 'UserInfo',
    component: () => import('@/views/UserInfo/UserInfo.vue'),
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History/History.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'UNCLE_K__TODOLIST'
  if(!get_storage_for_token() && to.path !== '/login'){
    next({path: '/login',query:{ redirect:to.fullPath },replace: true})
  }else{
    next()
  }
})

export default router
