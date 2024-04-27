import { useEffect, useState } from 'react';
import './ProductsManage.css'
import ReactPaginate from 'react-paginate';
import { useOutletContext } from "react-router-dom";
import { createProduct, getAllProduct, getNumberOfPageByProducts, getProductPaginate } from '../../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import ModalUpdateProduct from '../ModalUpdateProduct';
import ModalDeleteProduct from '../ModalDeleteProduct';


const ProductsManage = (props) => {
    const [imgData , setImgData] = useState('')
    const [limit , setLimit] = useState(5)
    const [page , setPage] = useState(1)

    const [productName , setProductName] = useState('')
    const [productDescription , setProductDescription] = useState('')
    const [productPrice , setProductPrice] = useState()

    const [numberOfPage , setNumberOfPage] = useState(1)
    const [productsList , setProductsList] = useState([])
    const [currentPage , setCurrentPage] = useState(1)

    const [productUpdate , setProductUpdate] = useState()
    const [productDelete , setProductDelete] = useState()

    const accessToken = useOutletContext();
    const navigate = useNavigate();

    const toBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImgData(reader.result.split(',')[1]);
        }
    }

    useEffect(() => {
        fetchProduct()
    },[currentPage])

    const fetchProduct = async () => {
        const pageNum = await getNumberOfPageByProducts(limit);
        setNumberOfPage(pageNum.data)

        const products = await getProductPaginate(currentPage , limit)
        setProductsList(products.data)
    }

    const handleSaveProduct = async () => {
        if(!accessToken){
            navigate('/admin')
            return;
        }

        if(!productName || !productPrice || !productDescription || !imgData){
            alert("Tạo sản phẩm không thành công , hãy nhập đầy đủ thông tin")
            return
        }
        const res = await createProduct(productName,productPrice,productDescription,imgData,accessToken);
        if(!res.data && res.status !== 200){
            alert('Create product failed!')
        }
        else {
            alert('Create product success!')
            fetchProduct();
            setProductName('')
            setProductDescription('')
            setProductPrice()
            setImgData('')

            setCurrentPage(1)
        }
    }

    const handlePageClick = (event) =>{
       setCurrentPage(+event.selected+1)
    } 


    return (
        <div className="product-manage">
            <div className='add-product'>
                <h2>Add product</h2>
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
                   <label for="formFile" class="btn btn-success file-btn d-flex justify-content-around">Add Product Image</label>
                   <input
                        hidden
                        class="form-control" 
                        required
                        type="file" 
                        id="formFile" 
                        onChange={(event) => toBase64(event.target.files[0])}
                        />
                    {imgData ? <img  src={`data:image/png;base64,${imgData}`} class="img-fluid mt-3"></img> : <div></div>}
                   
                </div>
                <div class="mb-3">
                   <button className="btn btn-success" onClick={()=> handleSaveProduct()}>Save</button>
                </div>
            </div>
            
            <div className='table-products'>
            <h2 className='title'>Products</h2>
            <table className="table table-hover table-bordered mt-3">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                  {productsList && productsList.map((item , index) => {
                    return (
                         <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button 
                                type="button" 
                                class="btn btn-warning" 
                                data-bs-toggle="modal" 
                                data-bs-target="#staticBackdropUpdate"
                                onClick={() => setProductUpdate(item)}
                            >
                                Edit
                            </button>   

                            <button 
                                type="button"
                                class="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => setProductDelete(item)}
                            >
                                Delete
                            </button> 
                            </td>
                        </tr> 
                     )
                  })}  
                        
            
            </tbody>
        </table>
        <div className='user-pagination'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={3}
                    pageCount={numberOfPage}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    // forcePage={props.currentPage - 1}
                />
            </div>
            <ModalUpdateProduct
                productUpdate={productUpdate}
                setCurrentPage={setCurrentPage}
            />

            <ModalDeleteProduct
                productDelete={productDelete}
                setCurrentPage={setCurrentPage}
            />
            </div>
        </div>
    )
}

export default ProductsManage