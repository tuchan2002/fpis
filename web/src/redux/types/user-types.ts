import { IUser } from '@/global-types'

export interface UserState {
    users: IUser[]
    user: IUser | null
}
