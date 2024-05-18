import './Header.css'
import { useNavigate } from 'react-router-dom';
import "../../assets/icon/themify-icons/themify-icons.css"
import {useEffect, useState } from "react";
import {getProductsInCart, getTotalPriceInCart } from '../../services/CartService'
import { getProductById } from '../../services/ProductService'

const Header = (props) => {
  const navigate = useNavigate()

  const {check} = props

  const [show, setShow] = useState(false)
  const [listProduct , setListProduct] = useState([])
  const [quantitiesProduct , setQuantitiesProduct] = useState()
  const [totalPrice , setTotalPrice] = useState(0)

  const handleFormatCurrency = (amount) =>{
    let config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
    let formatted = new Intl.NumberFormat('it-IT', config).format(amount);
    return formatted
}

  const fetchProducts = async () => {
    const products = await getProductsInCart();
    const price = await getTotalPriceInCart();


    if(price && price.data){
        setTotalPrice(price.data.totalPrice)
    }

    if(products && products.data){
        setQuantitiesProduct(products.data)
        const data = Object.keys(products.data);
        
        const productList = await Promise.all(data.map(async (value , index) => {
        const res = await getProductById(+value);
        if(res.data){
            return res.data;
        }
    }));

    setListProduct(productList);

    } 
 }


useEffect(()=>{
    fetchProducts()
},[check])

  

  const handleToggle = () => {                                                                              
      setShow(!show);
  }

  const handleMenuClick = () => {
      setShow(false);
  }

  return (
      <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid header-title">
                  <a className="navbar-brand" onClick={() => navigate('/')}>HOA LONG</a>
                  <button onClick={handleToggle} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className={`collapse navbar-collapse ${show === false ? "" : "show"}`} >
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <a className="nav-link white" aria-current="page" onClick={() => { navigate('/'); handleMenuClick(); }}>Trang chủ</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link white" onClick={() => { navigate('/product'); handleMenuClick(); }}>Sản phẩm</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link white" onClick={() => { navigate('/about-us'); handleMenuClick(); }}>Về chúng tôi</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link white" onClick={handleToggle} href="#contact">Liên hệ</a>
                          </li>
                      </ul>
                      <form className="d-flex cart-icon-container" onClick={() => {navigate('/cart'); handleToggle()}}>
                          <i className="ti-shopping-cart white icon-cart" ></i>
                          <div className="icon-cart__product-number">{listProduct.length}</div>
                          <div className="cart-list-products">
                            <span className="cart-list-products__header">
                                Có {listProduct.length} sản phẩm trong giỏ hàng
                            </span>
                            <ul className="cart-list-products__list">
                            {listProduct && listProduct.map((item , index)=> {
                                return (
                                    <li className="cart-list-products__item" key={`cartproduct${item.id}`}>                       
                                    <img className="cart-list-products__item-image" src={`data:image/png;base64,${item.imgData}`}></img> 
                                    <div className="cart-list-products__item-info">
                                        <span className="item-info__name-and__quantity">{item.name} x {quantitiesProduct[item.id]}</span>
                                        <span className="item-info__price">Giá thành phần: {handleFormatCurrency(item.price)}</span>
                                    </div>
                                </li>
                                )
                            })}
                                
                            </ul>
                            <div className="cart-list-products__footer">
                                <div className="cart-list-products__footer-price">Tổng đơn hàng: {handleFormatCurrency(totalPrice)}</div>
                                <div className="cart-list-products__footer-btn">
                                    <a onClick={()=> navigate("/cart")}>XEM GIỎ HÀNG</a>
                                </div>
                            </div>
                          </div>
                      </form>
                  </div>
              </div>
          </nav>
      </>
  )
}

export default Header;