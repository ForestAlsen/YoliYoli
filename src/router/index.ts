
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  //   {path:'/login',
  //   component:Login,
  // },
  {path:'/',component:()=>import('@/views/Home.vue')},
  ],
})

export default router
