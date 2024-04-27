import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter ,Routes ,Route } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import Product from './components/Product/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Admin from './components/Admin/Admin';
import ProductsManage from './components/Admin/Product/ProductsManage';
import OrderManage from './components/Admin/OrdersManage/OrdersManage';
import History from './components/Admin/History/History';
import AdminLogin from './components/Admin/Login/AdminLogin';
import Cart from './components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));

const NotFound = () => {
  return (
      <div className='container alert alert-danger mt-3'>
          404.Not found current URL
      </div>
  )
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element = {<App/>}>
        <Route index element = {<HomePage/>}></Route>
        <Route path='/product' element = {<Product/>}></Route>
        <Route path='/cart' element = {<Cart/>}></Route>
      </Route>
      
      

      <Route path='/admin' element = {<Admin/>}>
        <Route path='/admin/manage-products' element = {<ProductsManage/>}></Route>
        <Route path='/admin/manage-orders' element = {<OrderManage/>}></Route>
        <Route path='/admin/manage-history' element = {<History/>}></Route>

      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
