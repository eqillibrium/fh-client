import { IUser } from '@/interfaces/user.interface'
import { IBid } from '@/interfaces/bid.interface'

export interface IAuthState {
  user: IUser
}

export interface IBidState {
  bids: IBid[]
}
