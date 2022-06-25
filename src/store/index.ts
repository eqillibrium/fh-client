import { createLogger, createStore } from 'vuex'
import AuthModule from '@/store/modules/auth.module'
import BidModule from '@/store/modules/bid.module'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    AuthModule,
    BidModule
  }
})
