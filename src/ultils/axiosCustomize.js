import axios from "axios";


const instance = axios.create({
    baseURL: 'https://hoalong.onrender.com/'
    // baseURL: 'http://localhost:8080/'
})

export default instance;