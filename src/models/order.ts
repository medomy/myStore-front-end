type productsQuantities = {
    productId : string | number,
    qty : number
}
export default interface Order{
    id?: string | number,
    products_ids_qtys : Array<productsQuantities>,
    userId : string | number,
    address : string,
    totalPrice : number
}