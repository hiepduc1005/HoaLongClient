import { useEffect, useState } from 'react'
import './Cart.css'
import { deleteAllProductInCart, deleteProductInCart, getProductsInCart, getTotalPriceInCart } from '../../services/CartService'
import { getProductById } from '../../services/ProductService'
import { createPurchase } from '../../services/PurchaseService'
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
    const navigate = useNavigate();

    const [productId , setProductId] = useState()
    const [listProduct , setListProduct] = useState()
    const [quantities , setQuantities] = useState(1)
    const [totalPrice , setTotalPrice] = useState(0)

    const [userName , setUserName] = useState("")
    const [phoneNum , setPhoneNum] = useState("")
    const [address , setAddress] = useState("")
    const [customerRequest , setCustomerRequest] = useState("")
    const [productQuantity , setProductQuantity] = useState()
    
    const handleFormatCurrency = (amount) =>{
        let config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        let formatted = new Intl.NumberFormat('it-IT', config).format(amount);
        return formatted
    }

    const isVietnamesePhoneNumber = (number) => {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    }

    const handleDeleteProductInCart = async (product) => {
        let productid = product.id;
        const newData = await deleteProductInCart(+productid);
        console.log(newData)
        if(newData && newData.data){
             fetchProducts()
        }
       
    }

    const handleCreateOrder = async () => {
        if(totalPrice ===0 || !totalPrice || !productQuantity){
            alert("Bạn chưa có sản phẩm nào để mua !")
            return
        }

        if(!userName || !phoneNum || !address || !customerRequest){
            alert("Vui lòng điền đẩy đủ thông tin nguời mua")
            return
        }

        if(!isVietnamesePhoneNumber(phoneNum)){
            alert("Vui lòng nhập đúng số điện thoại")
            return
        }

        const purchase = await createPurchase(
            userName,
            phoneNum,
            address,
            customerRequest,
            totalPrice ,
            productQuantity
        );
        alert("Đơn hàng của bạn đã được gửi")
        const res = await deleteAllProductInCart();
        setUserName("")
        setPhoneNum("")
        setAddress("")
        setCustomerRequest("")
        setTotalPrice(0)
        if(res && res.data){
           fetchProducts()
        }
       
       
    }

    const fetchProducts = async () => {
        const products = await getProductsInCart();
        const price = await getTotalPriceInCart();

        if(price && price.data){
            console.log(price)
            setTotalPrice(price.data.totalPrice)
        }

        if(products && products.data){
            setProductQuantity(products.data)
        }

        const data = Object.keys(products.data);
        let quantities = [];
    
        const productList = await Promise.all(data.map(async (value , index) => {
            const res = await getProductById(+value);
            quantities.push(products.data[value]);
            return res.data;
        }));
    
        setQuantities(quantities)
        setListProduct(productList);

       

    }
    

    useEffect(()=>{
        fetchProducts()
    },[])


    return (
        <div className="cart-container">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }}  className='breadcrumb-cart' aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" onClick={() => navigate("/")} ><a>Trang chủ</a></li>
                <li class="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
             </ol>
           </nav>
           
            <div className='listitem-table'>
                <h3 style={{textAlign: 'center' , paddingBottom:'20px'}}>Giỏ Hàng</h3>
                <table className='table'>
                    <thead>
                        <tr className='table-head'>
                            <td  style={{width : '60px'}}>STT</td>
                            <td>Sản Phẩm</td>
                            <td style={{width : '160px'}}>Giá</td>
                            <td style={{width : '120px'}}>Số lượng</td>
                            <td style={{width : '160px'}}>Tổng giá</td>
                            <td style={{width : '160px'}}>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {listProduct && listProduct.map((item , index) => {
                            return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <div className='product-cartitem'>
                                        <div className='product-image'>
                                            <img src={`data:image/png;base64,${item.imgData}`} className='img-thumbnail'></img>
                                        </div> 
                                       
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                
                                <td>{handleFormatCurrency(item.price)}</td>
                                <td>
                                    <i className='ti-minus'></i>
                                    <span style={{width: '40px', display: 'inline-block' , textAlign: 'center'}}>{quantities[index]}</span>
                                    <i className='ti-plus'></i>
                                </td>
                                <td>{handleFormatCurrency(item.price * quantities[index])}</td>
                                <td className='td-icon'>
                                    <i className='ti-trash' onClick={() => handleDeleteProductInCart(item)} style={{paddingRight : '10px' , lineHeight : "80px"}}></i>
                                </td>
                            </tr>
                            )
                        })}
                      
                    </tbody>
                </table>
            </div>

            <div className='information'>
            <div className='custom-infomation'>
            <h3>THÔNG TIN KHÁCH HÀNG</h3>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Họ và tên</label>
                <input 
                    type="text"
                    class="form-control" 
                    id="inputAddress" 
                    required placeholder="Nguyễn Văn A"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    />
            </div>
           <div className="col-12" >
                <label for="inputAddress2" class="form-label">Số điện thoại</label>
                <input 
                    type="text" 
                    class="form-control" 
                    required id="inputAddress2" 
                    placeholder="123456789"
                    value={phoneNum}
                    onChange={(event) => setPhoneNum(event.target.value)}
                    />
            </div>
            <div className="col-12" >
                <label for="inputAddress2" class="form-label">Địa chỉ</label>
                <input 
                    type="text" 
                    class="form-control" 
                    required id="inputAddress2" 
                    placeholder="Hà Nội"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    />
            </div>
            <div className="col-12" >
                <label for="inputAddress2" class="form-label">Ghi chú</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="inputAddress2" 
                    placeholder="Hãy để lại yêu cầu của bạn với cửa hàng "
                    value={customerRequest}
                    onChange={(event) => setCustomerRequest(event.target.value)}
                    />
            </div>
            </div>
            <div className='cart-infomation'>
            <h3>THÔNG TIN ĐƠN HÀNG</h3>
            <table className='table'>
            <thead>

                        <tr>
                            <td >Sản phẩm</td>
                            <td >Tổng</td>
                        </tr>
                    </thead>
                    <tbody>
                    {listProduct && listProduct.map((item , index) => {
                        return (
                    <>
                        <tr>
                            <td>{item.name} x {quantities[index]}</td>
                            <td>{handleFormatCurrency(item.price * quantities[index])}</td>
                        </tr>
                    </>
                        )
            })}
                       <tr>
                            <td>Tổng đơn hàng</td>
                            <td>{handleFormatCurrency(totalPrice)}</td>
                        </tr>
                    </tbody>
            </table>
            <span style={{fontStyle:"italic" , fontSize:'14px' , opacity:'0.7' , padding:'8px'}}>Thanh toán khi nhận hàng</span>
            <div className='btn-cartsubmit'>
                <button onClick={() => handleCreateOrder()}>Đặt hàng</button>
            </div>
            </div>
           </div>
        </div>
    )
}

export default Cart