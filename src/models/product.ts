export default interface Product {
    id? : string | number,
    title : string,
    price : number,
    description : string,
    company : string,
    categoryid : string | number,
    photosrc : string
}