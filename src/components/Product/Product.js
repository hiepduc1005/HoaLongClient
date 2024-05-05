import './Product.css'
import { useNavigate } from 'react-router-dom';
import productimg from '../../assets/img/ppCUZQXxwt1RezM5Df4RdWM2yNtfpDSf6YciuJFu.jpeg'
import { getAllProduct } from '../../services/ProductService';
import { useEffect, useState } from 'react';

const Product = (props) => {

    const navigate = useNavigate();

    const [listProducts , setListProduct] = useState([])

    const handleFormatCurrency = (amount) =>{
        let config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        let formatted = new Intl.NumberFormat('it-IT', config).format(amount);
        return formatted
    }

    const fetchProducts = async () => {
        const res = await getAllProduct();
        if(res && res.data){
            setListProduct(res.data)
        }
        
    }

    useEffect(()=>{
    fetchProducts()
    },[])

    return (
        <div className="product-container">
            <nav aria-label="breadcrumb" style={{ '--bs-breadcrumb-divider': "'>'" }} className='nav-breadcrumb'>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a onClick={() => navigate("/")}>Trang chủ</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Sản phẩm</li>
                </ol>
            </nav>
            <div className='product-title'>SẢN PHẨM</div>
            <p>Có nhiều loại Nem Chua như Nem Chua Thanh Hoá, Nem Chua Vĩnh Yên, Nem Thủ Đức, hay Nem Vung… với những hương vị rất khác nhau; tuy nhiên Nem Chua được sản xuất tại cơ sở Nem Chua Hoa Long lại có một sức hấp dẫn rất đặc trưng bởi bí quyết gia truyền được gìn giữ bao nhiêu năm nay. Nem Chua Hồng Chiến được gói kín bằng lá chuối hột, qua quá trình ủ lên men tự nhiên nhờ chất xúc tác của thính gạo và bì lợn thông qua quá trình kiểm tra nghiêm ngặt sẽ tạo nên một hương vị rất riêng cho sản phẩm của nhà hàng. Khi mở lớp lá chuối ra ruột nem [...]</p>
            <div className='list-item'>
            {listProducts && listProducts.map((item , index) => {
                return (
                     <div className='product-item'>
                   <a className='thumbnail'>
                       <img src={`data:image/png;base64,${item.imgData}`}></img>
                   </a>
                   <div className='product-info'>
                       <h3 className='name'>{item.name}</h3>
                       <span className='product-price'>{handleFormatCurrency(item.price)}</span>
                       <p className='product-des'>{item.description}
                       </p>
                       <div className='btn-info'>
                        <button>Thông tin sản phẩm</button>
                       </div>
                       
                   </div>
                </div>  
                )
            })}
                
                
            </div>
        </div>
    )
}

export default Product