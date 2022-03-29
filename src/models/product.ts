export default interface Product {
    id? : string | number,
    title : string,
    price : number,
    description : string,
    company : string,
    categoryId : string | number,
    photoSrc : string
}