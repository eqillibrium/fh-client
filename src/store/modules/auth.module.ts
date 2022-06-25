import axios from '@/axios/request'
import { ActionContext } from 'vuex'
import { AxiosError } from 'axios'
import { IAuthState } from '@/interfaces/state.interface'
import { IUser } from '@/interfaces/user.interface'

export default {
  namespaced: true,
  root: true,
  state: {
    user: {
      _id: '',
      name: '',
      email: '',
      password: '',
      passwordHash: '',
      token: '',
      isAdmin: ''
    }
  },

  mutations: {
    setUser (state: IAuthState, { _id, name, email, passwordHash, isAdmin }: IUser) {
      state.user._id = _id
      state.user.name = name
      state.user.email = email
      state.user.passwordHash = passwordHash
      state.user.isAdmin = isAdmin
    },
    setToken (state:IAuthState, token: string) {
      state.user.token = token
    },
    clearToken (state:IAuthState) {
      state.user.token = ''
    }
  },

  actions: {
    async register ({
      commit,
      dispatch
    }: ActionContext<IAuthState, any>, {
      name,
      email,
      password
    }: IUser): Promise<void> {
      try {
        const { data } = await axios.post('/api/auth/register', {
          name,
          email,
          password
        })

        await dispatch('login', { email, password })
      } catch (e) {
        const error = e as AxiosError
        console.log(error.response?.data)
      }
    },

    async login ({ commit }: ActionContext<IAuthState, any>, {
      email,
      password
    }: IUser) {
      try {
        const { data } = await axios.post('/api/auth/login', {
          email,
          password
        })
        commit('setUser', data)
        commit('setToken', data.access_token)
      } catch (e) {
        const error = e as AxiosError
        console.log(error.response?.data)
      }
    },

    logout ({ commit }: ActionContext<IAuthState, any>) {
      commit('clearToken')
    }
  },

  getters: {
    token (state: IAuthState) {
      return !!state.user.token
    },
    isAdmin (state: IAuthState) {
      return state.user.isAdmin
    },
    user (state: IAuthState) {
      return state.user
    }
  }
}
