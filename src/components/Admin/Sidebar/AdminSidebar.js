import './AdminSidebar.css'
import "../../../assets/icon/themify-icons/themify-icons.css"
import { useNavigate } from 'react-router-dom';


const AdminSidebar = (props) => {

    const navigate = useNavigate();

    return (
        <div className='admin-sidebar'>
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' , height: '100%'}}>
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className='fs-4'>Hoa Long</span>
            </a>
            <hr></hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li className='nav-item'>
                    <a className='nav-link active' aria-current="page" onClick={() => navigate('/admin')}>
                        <i className='ti-home mx-2'></i>
                        Home</a>
                </li>
                <li>
                    <a class="nav-link text-white" onClick={() => navigate('/admin/manage-products')}>
                      Products
                    </a>
                </li>
                <li>
                    <a class="nav-link text-white" onClick={() => navigate('/admin/manage-orders')} >
                        Orders
                    </a>
                </li>
                <li>
                    <a class="nav-link text-white" onClick={() => navigate('/admin/manage-history')}>
                        History
                    </a>
                </li>
            </ul>
            
            <hr></hr>
            <a class="d-flex align-items-center text-white text-decoration-none ">Sign out</a>
        </div>
        </div>
    )
}

export default AdminSidebar