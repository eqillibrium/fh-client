import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import UserRoutes from './routes/user.routes'
import AdminRoutes from './routes/admin.routes'
import middlewarePipeline from './middleware.pipeline'

const userRoutes = UserRoutes()
const adminRoutes = AdminRoutes()

const routes: Array<RouteRecordRaw> = [
  ...userRoutes,
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
