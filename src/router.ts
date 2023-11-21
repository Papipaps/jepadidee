import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import OpeningView from '@/components/views/OpeningView.vue'

export const getNavigatorPaths = () => {
  const result = {};

  routes.forEach((route) => {
    result[route.name] = route.path;
  });

  return result;
};


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: OpeningView,
    meta: {
      hideHUD: true
    }
  },
  {
    path: '/generator',
    name: "Générateur d'idée",
    component: () =>
      import(/*webpackChunkName:"generator"*/ '@/components/views/GeneratorView.vue')
  },
  {
    path: '/tagmeup',
    name: 'Tag Me Up',
    component: () => import(/*webpackChunkName:"tagmeup"*/ '@/components/views/TagMeUp.vue')
  },
  {
    path: '/daily',
    name: 'Un dessin par jour',
    component: () => import(/*webpackChunkName:"daily"*/ '@/components/views/TestView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/views/UnavailableView.vue'),
    meta: {
      hideHUD: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
