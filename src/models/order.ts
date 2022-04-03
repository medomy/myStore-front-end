import { Status } from "./enums/status"

export type productsQuantities = {
    productId : string | number,
    qty : number
}
export interface Order{
    id?: string | number,
    products_ids_qtys : Array<productsQuantities>,
    userid : string | number,
    address : string,
    totalprice : number,
    status : Status
}