import { RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'

export default function ():Array<RouteRecordRaw> {
  return [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        layout: 'main'
      }
    },
    {
      path: '/auth',
      name: 'Auth',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/AuthView.vue')
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/bid/:id',
      name: 'Bid',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/BidView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/ProfileView.vue')
    }
  ]
}
