import { IUser } from '@/global-types'

export interface AuthState {
    token: string
    user: IUser | null
}

export interface IRegisterParams {
    userData: {
        name: string
        email: string
        password: string
        phone_number: string
        location: string
        role: number
    }
    accessToken: string
}

export interface ILoginParams {
    email: string
    password: string
}
