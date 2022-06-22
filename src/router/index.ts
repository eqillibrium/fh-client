import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import UserRoutes from './routes/user.routes'
import AdminRoutes from './routes/admin.routes'

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

export default router
