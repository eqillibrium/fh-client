import { RouteRecordRaw } from 'vue-router'

export default function (): Array<RouteRecordRaw> {
  return [
    {
      path: '/admin',
      name: 'AdminHome',
      component: () => import('@/views/admin/AdminHomeView.vue'),
      meta: {
        layout: 'admin'
      }
    },
    {
      path: '/admin/bids',
      name: 'BidsView',
      component: () => import('@/views/admin/BidsView.vue'),
      meta: {
        layout: 'admin'
      }
    },
    {
      path: '/admin/users',
      name: 'UsersView',
      component: () => import('@/views/admin/UsersView.vue'),
      meta: {
        layout: 'admin'
      }
    }
  ]
}
