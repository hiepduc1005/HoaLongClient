import axios from "axios";


const instance = axios.create({
    baseURL: 'https://hoalong.onrender.com/'
})

export default instance;