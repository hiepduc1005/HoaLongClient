import axios from "../ultils/axiosCustomize";

const getProductsInCart = () => {
    return axios.get("api/v1/cart/products" , { withCredentials: true })
}

const getTotalPriceInCart = () =>{
    return axios.get("api/v1/cart/total-price" , { withCredentials: true })
}

const addProductToCart = (productId , quantity) => {

    const requestData = {
        productId : productId,
        quantity : quantity
    }

    return axios.post(`api/v1/cart/add` , requestData , { withCredentials: true })
}

const deleteProductInCart = (productId) =>{

    const requestData = {
        productId : productId
    }

    return axios.post(`api/v1/cart/delete` , requestData , { withCredentials: true })

}

const deleteAllProductInCart = () => {
    return axios.post(`api/v1/cart/delete/all` , null , { withCredentials: true });
}

const updateProductQuantityInCart = (productId , quantity) => {
    const requestData = {
        productId : productId,
        quantity : quantity
    }

    return axios.post('api/v1/cart/update_quantity', requestData , { withCredentials: true } )
}


export {getProductsInCart , addProductToCart , deleteProductInCart , getTotalPriceInCart , deleteAllProductInCart , updateProductQuantityInCart}