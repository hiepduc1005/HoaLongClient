import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import Header from './components/Header/Header';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer/Footer';
import NavContact from './components/NavContact';
import './responsive.css'

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header></Header>    
      </div>

      <div className='main-container'>
      <NavContact></NavContact>
        <div className='app-content'>
   
          <Outlet></Outlet>
        </div>
      </div>

      <div className='footer-container'>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
