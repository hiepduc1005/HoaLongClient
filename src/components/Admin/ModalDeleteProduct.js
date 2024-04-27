import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom";
import { deleteProduct } from "../../services/ProductService";
import { useNavigate } from 'react-router-dom';

const ModalDeleteProduct = (props) => {

    const {productDelete} = props
    const navigate = useNavigate()

    const accessToken = useOutletContext();

    const [productId , setProductId] = useState()
    const [productName , setProductName] = useState('')
    const [productUuid , setProductUuid] = useState('')

    useEffect(() => {        
       if (productDelete) {
            setProductId(productDelete.id)
            setProductName(productDelete.name)
            setProductUuid(productDelete.guid)
        }
    },[productDelete])

    const handleDeleteProduct = async () => {
        if(!accessToken){
            navigate('/admin')
            return
        }

        let res = await deleteProduct(productId , accessToken);
        if(res.status != 200){
            alert('delete product failed')
            return
        }
        else{
            props.setCurrentPage(1)
        }
    }

    return (

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Do you want to delete {productName} id : {productId}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={() => handleDeleteProduct()} >Delete</button>
      </div>
    </div>
  </div>
</div>
    )
}

export default ModalDeleteProduct