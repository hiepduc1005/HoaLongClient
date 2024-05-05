import axios from "axios";


const instance = axios.create({
    baseURL: 'https://hoalong-github-io.onrender.com/'
})

export default instance;