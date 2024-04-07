import logo from "../../assets/img/th.jpg"
import './Header.css'
import { useNavigate } from 'react-router-dom';
import "../../assets/icon/themify-icons/themify-icons.css"
const Header = () => {

    const navigate = useNavigate()

    return (
        <div className="header">
            <div className="container">
                <div className="logo" onClick={()=>navigate("/")}>
                     <img src={logo} ></img>
                </div>

                <div className="navbar">
                    <ul className="nav-menu">
                        <li onClick={()=>navigate("/")}><a >TRANG CHỦ</a></li>
                        <li onClick={()=>navigate("/product")}><a >SẢN PHẨM</a></li>
                        <li onClick={()=>navigate("/about")}><a >GIỚI THIỆU</a></li>
                        <li onClick={()=>navigate("/contact")}><a >LIÊN HỆ</a></li>
                    </ul>
                </div>
                <div className="cart-icon">
                    <i className="ti-shopping-cart"></i>
                </div>
            </div>
            
        </div>
    )
}

export default Header