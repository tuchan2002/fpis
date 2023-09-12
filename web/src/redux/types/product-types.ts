import { IProduct } from '@/global-types'

export interface ICreateProductParams {
    body: {
        productID: string
        model: string
        description: string
    }
    accessToken: string
}

export interface IProductState {
    products: IProduct[]
    product: IProduct | null
}
