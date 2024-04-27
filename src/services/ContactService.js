import axios from "../ultils/axiosCustomize";


const createContact = (userName , phoneNum , contactContent) => {
    const data = {
        userName : userName ,
        phoneNum : phoneNum , 
        contactContent : contactContent
    }

    return  axios.post(
        'api/v1/contact',
         data
 )
}

export {createContact}