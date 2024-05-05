import { useEffect, useState } from "react"
import { updateProduct } from "../../services/ProductService"
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import * as bootstrap from 'bootstrap';


const ModalUpdateProduct = (props) => {
    const navigate = useNavigate()

    const {productUpdate} = props

    const accessToken = useOutletContext();

    const [imgData , setImgData] = useState('')
    const [productName , setProductName] = useState('')
    const [productDescription , setProductDescription] = useState('')
    const [productPrice , setProductPrice] = useState()
    const [productId , setProductId] = useState()


    const toBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImgData(reader.result.split(',')[1]);
        }
    }

    useEffect(()=> {
       if(productUpdate){
         setImgData(productUpdate.imgData)
         setProductName(productUpdate.name)
         setProductDescription(productUpdate.description)
         setProductPrice(productUpdate.price)
         setProductId(productUpdate.id)
       }
    },[productUpdate])


    const handleUpdateProduct = async () => {

        if(!accessToken){
            navigate('/admin')
            return
        }
        let res = await updateProduct(productId,productName,productPrice,productDescription,imgData,accessToken)

        if(res && res.data){
            props.setCurrentPage(1)
           
        }

        
    }

  


    return (

<div class="modal fade"  id="staticBackdropUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Product</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-floating mb-3">
            <input 
                    type="text" 
                    required
                    class="form-control" 
                    id="floatingInput" 
                    placeholder="Name" 
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    />
            <label for="floatingInput">Product name</label>
        </div>
        <div class="form-floating mb-3">
            <input 
                type="text"
                required
                class="form-control" 
                id="floatingInput" 
                placeholder="Price"
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                />
            <label for="floatingInput">Price</label>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea 
                class="form-control" 
                required
                id="exampleFormControlTextarea1" 
                rows="3"
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
                ></textarea>
        </div>
        <div class="mb-3 ">
            <label for="formFile1" class="btn btn-success file-btn d-flex justify-content-around">Add Product Image</label>
            <input
                hidden
                class="form-control" 
                required
                type="file" 
                id="formFile1" 
                onChange={(event) => toBase64(event.target.files[0])}
                />
            {imgData ? <img  src={`data:image/png;base64,${imgData}`} class="img-fluid mt-3"></img> : <div></div>}
            
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick = {()=> handleUpdateProduct()}>Update</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ModalUpdateProduct