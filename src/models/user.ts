export default interface User {
    id?: string | number,
    userName: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string,
    country: string,
    mobilePhone: string | number,
    photoUrl: string
}