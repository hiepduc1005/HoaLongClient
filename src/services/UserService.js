import axios from "../ultils/axiosCustomize";

const loginUser = (username , password) =>{
    const data = {
        email : username,
        password : password
    }

    return axios.post("api/v1/auth/login",data)
}

export {loginUser}