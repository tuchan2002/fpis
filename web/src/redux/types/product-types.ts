import { IProduct } from '@/global-types'

export interface ICreateProductParams {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    productionDate: string
}

export interface IProductState {
    products: IProduct[]
    product: IProduct | null
}
