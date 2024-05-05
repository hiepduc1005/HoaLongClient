import logo from "../../assets/img/th.jpg"
import './Header.css'
import { useNavigate } from 'react-router-dom';
import "../../assets/icon/themify-icons/themify-icons.css"
import { useState } from "react";
import { waitFor } from "@testing-library/react";
const Header = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

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
                      <form className="d-flex">
                          <i className="ti-shopping-cart white icon-cart" onClick={() => {navigate('/cart'); handleToggle()}}></i>
                      </form>
                  </div>
              </div>
          </nav>
      </>
  )
}

export default Header;