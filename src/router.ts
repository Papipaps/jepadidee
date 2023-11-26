import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import OpeningView from '@/components/views/OpeningView.vue'
import type { UserState } from './stores/user-store'
import { authGuard } from '@auth0/auth0-vue'

export enum getNavigatorPaths {
  LANDING = '/',
  GENERATOR = '/generator',
  TAG_ME_UP = '/tagmeup',
  DAILY_DRAWING = '/daily'
}

const routes: RouteRecordRaw[] = [
  {
    path: getNavigatorPaths.LANDING,
    name: 'landing',
    component: OpeningView,
    meta: {
      hideHUD: true,
      IsInNavbar: true
    }
  },
  {
    path: getNavigatorPaths.GENERATOR,
    name: "Générateur d'idée",
    component: () => import(/*webpackChunkName:"generator"*/ '@/components/views/GeneratorView.vue')
  },
  {
    path: getNavigatorPaths.TAG_ME_UP,
    name: 'Tag Me Up',
    component: () => import(/*webpackChunkName:"tagmeup"*/ '@/components/views/TagMeUp.vue')
  },
  {
    path: getNavigatorPaths.DAILY_DRAWING,
    name: 'Un Dessin par Jour',
    component: () => import(/*webpackChunkName:"daily"*/ '@/components/views/TestView.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/cb',
    name: 'authCallback',
    component: () => import(/*webpackChunkName:"auth"*/ '@/components/views/AuthLoading.vue'),
    beforeEnter: authGuard,
    meta: {
      hideHUD: true,
      IsInNavbar: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/views/UnavailableView.vue'),
    meta: {
      hideHUD: true,
      IsInNavbar: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const rawLS = localStorage.getItem('user')
  const user = JSON.parse(rawLS) as UserState
  if (!to.meta.requireAuth) {
    next()
  } else {
    if (user && user.isAuthenticated) {
      next()
    } else {
      next(from)
    }
  }
})
export default router
