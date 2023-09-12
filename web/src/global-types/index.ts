export interface IHistoryItem {
    timestamp: string
    action: string
    details: string
    date: string
}
interface IProductMap {
    [key: string]: string | IHistoryItem[]
}
export interface IProduct extends IProductMap {
    productID: string
    model: string
    description: string
    manufactoryEmail: string
    retailerEmail: string
    customerEmail: string
    history: IHistoryItem[]
}

export interface IUser {
    id: number
    email: string
    location: string
    name: string
    phone_number: string
    role: number
}
