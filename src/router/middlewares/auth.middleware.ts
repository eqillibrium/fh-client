import { ElMessage } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function auth ({ next, store }) {
  if (!store.getters['AuthModule/token']) {
    ElMessage({ type: 'error', message: 'Ошибка прав доступа. Авторизируйтесь!' })
    return next({
      name: 'Login'
    })
  }
  return next()
}
