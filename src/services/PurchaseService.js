import axios from "../ultils/axiosCustomize";

const createPurchase = (userName , phoneNum , address , customerRequest , totalPrice , productQuantity) => {
    const data = {
        userName : userName ,
        phoneNum : phoneNum ,
        address : address ,
        customerRequest : customerRequest ,
        totalPrice : totalPrice ,
        productQuantity : productQuantity
    }

    return axios.post("api/v1/purchase" , data)
}

const getTodayPurchase = () => {
    return axios.get("api/v1/purchase/today")
}

const getNotCompletePurchase = (accessToken) => {
    return axios.get("api/v1/purchase/not-complete", {
        headers : {
            Authorization : `Bearer ${accessToken}` 
        }
    })
}

const getCompletePurchase = (accessToken) => {
    return axios.get("api/v1/purchase/complete", {
        headers : {
            Authorization : `Bearer ${accessToken}` 
        }
    })
}

const updatePurchaseToComplete = (purchaseId , accessToken) => {

    return axios.post(
        `api/v1/purchase/update-complete/${purchaseId}` ,
        null,
        {
            headers : {
                Authorization : `Bearer ${accessToken}`
            }
        })
}

const getAllPurchase = () => {
    return axios.get("api/v1/purchase/all")
}


export {createPurchase , getTodayPurchase , getNotCompletePurchase , getCompletePurchase ,getAllPurchase , updatePurchaseToComplete}