import logo from "../../assets/img/th.jpg"
import './Header.css'
import { useNavigate } from 'react-router-dom';
import "../../assets/icon/themify-icons/themify-icons.css"
const Header = () => {

    const navigate = useNavigate()

    return (
    <>
    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
  <div className="container-fluid header-title">
    <a className="navbar-brand" onClick={()=> navigate('/')}>HOA LONG</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item ">
          <a className="nav-link white" aria-current="page" onClick={()=> navigate('/')}>Trang chủ</a>
        </li>
        <li className="nav-item">
          <a className="nav-link white" onClick={()=> navigate('/product')}>Sản phẩm</a>
        </li>
        <li className="nav-item">
          <a className="nav-link white" onClick={()=> navigate('/about-us')}>Về chúng tôi</a>
        </li>
        <li className="nav-item">
          <a className="nav-link white" href="#contact">Liên hệ</a>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item white" href="#">Action</a></li>
            <li><a className="dropdown-item white" href="#">Another action</a></li>
            <li><hr className="dropdown-divider white"/></li>
            <li><a className="dropdown-item white" href="#">Something else here</a></li>
          </ul>
        </li> */}
      
      </ul>
      <form className="d-flex">
        <i className="ti-shopping-cart white icon-cart" onClick={()=> navigate('/cart')}></i>
      </form>
    </div>
  </div>
</nav>
    </>
    )
}

export default Header