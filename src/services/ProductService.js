import axios from "../ultils/axiosCustomize";

const getAllProduct = ()=>{
    return axios.get("api/v1/product/all");
}

const createProduct = (name  , price , description , imgData , accessToken)=>{
    const data = {
        name : name,
        category : null,
        price : price ,
        description : description,
        imgData : imgData
    }

    return axios.post(
        'api/v1/product',
         data ,
         {
            headers : {
            Authorization : `Bearer ${accessToken}`
        }
     }
 )
}

const getProductPaginate = (pageNumber , limit) => {
    return axios.get(`api/v1/product?pageNumber=${pageNumber}&limit=${limit}}`)
}


export {getAllProduct , createProduct , getProductPaginate}