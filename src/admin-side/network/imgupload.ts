import axios from "axios";


const uploadiImgInstance = axios.create({
    baseURL: "https://api.imgbb.com/1/upload",
    params: {
        key: process.env.REACT_APP_API_KEY,
    },
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },

})
export default uploadiImgInstance;