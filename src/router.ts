import { createRouter, createWebHistory } from 'vue-router'
import OpeningView from '@/components/views/OpeningView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: OpeningView,
      meta: {
        hideNavbar: true
      }
    },
    {
      path: '/generator',
      name: 'generator',
      component: () =>
        import(/*webpackChunkName:"generator"*/ '@/components/views/GeneratorView.vue')
    },
    {
      path: '/tagmeup',
      name: 'tagmeup',
      component: () =>
        import(/*webpackChunkName:"tagmeup"*/ '@/components/views/TagMeUp.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/components/views/UnavailableView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
