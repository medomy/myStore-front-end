export default interface User {
    id?: string | number,
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    country: string,
    mobilephone: string | number,
    photourl: string
}