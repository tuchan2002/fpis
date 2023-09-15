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
    displayName: string
    email: string
    uid: string
    photoURL: string
    role: number
}
