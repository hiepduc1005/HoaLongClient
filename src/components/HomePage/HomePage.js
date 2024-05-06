import imgHeader from "../../assets/img/rIEIMS4jPRFa3hkfYoyS8OL5j3kYrXVR6d9fHx93.jpeg"
import './HomePage.css'
import nemChua from "../../assets/img/nemchua.jpeg"
import { getAllProduct } from "../../services/ProductService"
import { useEffect, useState } from "react"
import CartModal from "../Cart/CartModal"

const HomePage = (props)=>{

    const [listProducts , setListProducts] = useState([]);
    const [show , setShow]  = useState(false)
    const [productCart , setProductCart] = useState({})

    useEffect(() =>{
        fetchProducts()
       
    },[])

    const fetchProducts = async () =>{
        let res = await getAllProduct();
        console.log(res);
        setListProducts(res.data)
       
    }

    const handleClickBy = (item) =>{
        setShow(true)
        setProductCart(item)
    }

    const handleFormatCurrency = (amount) =>{
        let config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        let formatted = new Intl.NumberFormat('it-IT', config).format(amount);
        return formatted
    }

    return(
        <div className="homepage-container">
           <div className="image-header">
            <img src={imgHeader}></img>
           </div>

           <div className="box-product">
                <div className="text-introduce">
                    <p>
                        Thương hiệu Ước Lễ gia truyền Hồng Chiến với bề dày truyền thống lâu đời từ năm 1989 từ lâu đã là địa chỉ uy tín trên bản đồ ẩm thực đất Hà Thành. Với các sản phẩm chính gốc Ước Lễ gia truyền như Nem Chua, Nem Chua Rán, Nem Chua Nướng, Giò Lụa, Giò Tai, Giò Bò ... Xem thêm
                    </p>
                </div>

                <div className="title">
                    SẢN PHẨM NỔI BẬT
                </div>

            <div className="list-item">
                {listProducts && listProducts.map((item , index) =>{
                        return (
                              <div className="item" key={`list-product-${index}`}>
                    <div className="image-product">
                        <img className="img-thumbnail" src={`data:image/png;base64,${item.imgData}`}></img>
                    </div>
                   
                    <a className="product-name">{item.name}</a>
                    <span className="price">{handleFormatCurrency(item.price)}</span>
                    <p className="product-description">{item.description}</p>
                    <div className="action">
                        <a className="product-detail">Thông tin sản phẩm</a>
                        <button className="order" onClick={() => handleClickBy(item)}>Đặt hàng</button>
                    </div>
                </div>
                        )
                    })}
              
               
            </div>
           </div>

           <div></div>

           <CartModal
           show={show}
           setShow={setShow}
           productCart={productCart}
           ></CartModal>
        </div>
    )
}

export default HomePage