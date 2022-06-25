import { ActionContext } from 'vuex'
import { AnimalType, BidStatus, IBid } from '@/interfaces/bid.interface'
import { ElMessage } from 'element-plus'
import axios from '@/axios/request'
import { IBidState } from '@/interfaces/state.interface'

class Bid {
  private address: string
  private animalType: number
  private author: string
  private award: number
  private description: string
  private status: BidStatus
  private title: string
  private image: string | undefined;
  constructor (authorID: string, { image, title, animalType, description, address, award }: IBid) {
    this.author = authorID
    this.image = image
    this.title = title
    this.animalType = animalType === 'Собака' ? 1 : 0
    this.description = description
    this.address = address
    this.award = award
    this.status = 0
  }
}

export default {
  namespaced: true,
  root: true,
  state: {
    bids: []
  },
  mutations: {
    addBid (state: IBidState, payload: IBid) {
      state.bids.push(payload)
    },
    fillBidsList (state: IBidState, payload: IBid[]) {
      state.bids = payload
    }
  },
  actions: {
    async createBid ({ commit, getters }: ActionContext<unknown, unknown>, payload: IBid) {
      const user = getters.getUser
      const newBid = new Bid(user._id, payload)
      try {
        const { data } = await axios.post('/api/bid/create', newBid, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        commit('addBid', data)
      } catch (e) {
        console.log(e)
      }
    },

    async uploadFiles ({ commit, getters }: ActionContext<unknown, unknown>, { files }: IBid) : Promise<string | string[] | undefined> {
      try {
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQG1haWwuY29tIiwiaWF0IjoxNjU2MDU3Njk1fQ.1-1TM6TMN_p_XeiPYKw7GlVjdmLC0HziQb1Q92Dcw6A'
        const formData = new FormData()
        if (!files) {
          return ''
        }
        if (!files[0].raw) {
          return ''
        }
        formData.append('files', files[0].raw)
        const { data } = await axios.post('/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token
          }
        })
        return data
      } catch (e) {
        if (e instanceof Error) {
          console.log(e)
        }
      }
    },

    async fetchBids ({ commit }: ActionContext<unknown, unknown>): Promise<void> {
      try {
        const { data } = await axios.get('/api/bid/fetch')
        commit('fillBidsList', data)
      } catch (e) {

      }
    }
  },

  getters: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getBidsList (state: IBidState) {
      return state.bids
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getUser (_, __, ___, rootGetters) {
      return rootGetters['AuthModule/user']
    }
  }
}
