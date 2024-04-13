import AdminSidebar from "./Sidebar/AdminSidebar"
import { Outlet } from "react-router-dom";
import './Admin.css'
import { useState } from "react";
import AdminLogin from "./Login/AdminLogin";

const Admin = (props) => {

    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [accessToken , setAccessToken] = useState('')

    return (
        isAuthenticated ?  

        <div className='admin-container'>
            <div className='admin-sidebar'>
                <AdminSidebar></AdminSidebar>
            </div>
            <div className='admin-content'>
                <Outlet context={accessToken}></Outlet>
            </div>
        </div>

        : 
        <AdminLogin 
          setIsAuthenticated = {setIsAuthenticated}
          setAccessToken = {setAccessToken}
        /> 
    )
}


export default Admin