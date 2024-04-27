import axios from "../ultils/axiosCustomize";

const getAllProduct = ()=>{
    return axios.get("api/v1/product/all");
}

const getProductById = (productId) => {
    return axios.get(`api/v1/product/${productId}`)
}

const createProduct = (name  , price , description , imgData , accessToken)=>{
    const data = {
        name : name,
        category : null,
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
    return axios.get(`api/v1/product?pageNumber=${pageNumber}&limit=${limit}`)
}


const getNumberOfPageByProducts = (limit) => {
    return axios.get(`api/v1/product/all/pages?limit=${limit}`)
}

const updateProduct = (id , name , price , description , imgData , accessToken) => {
    const data = {
        id : id ,
        name : name,
        category : null,
        price : price ,
        description : description,
        imgData : imgData
    }

    return axios.put(
        'api/v1/product' ,
        data ,
    {
       headers : {
       Authorization : `Bearer ${accessToken}`
      }
    })
}

const deleteProduct = (id , accessToken) => {

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    return axios.delete(`api/v1/product/${id}`, {headers})
}

export {getAllProduct , getProductById , createProduct , getProductPaginate , getNumberOfPageByProducts , updateProduct , deleteProduct}