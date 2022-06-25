import { RouteRecordRaw } from 'vue-router'
import HomeView from '../../views/HomeView.vue'
import auth from '@/router/middlewares/auth.middleware'

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
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'main'
      },
      component: () => import('@/views/RegisterView.vue')
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
      path: '/bid/create',
      name: 'CreateBid',
      meta: {
        layout: 'main',
        middleware: [
          auth
        ]
      },
      component: () => import('@/views/CreateBidView.vue')
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
        layout: 'main',
        middleware: [
          auth
        ]
      },
      component: () => import('@/views/ProfileView.vue')
    }
  ]
}
