import { useState } from "react"
import { loginUser } from "../../../services/UserService"
import { useNavigate } from 'react-router-dom';


const AdminLogin = (props) => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
    };

    const handleLogin = async (event) => {
        event.preventDefault(); 
        if(!validateEmail(email)){
            alert('email is invalid')
            return;
        }

        if(!password){
            return;
        }

        try {
            let res = await loginUser(email, password);
            console.log(res);
            if (res.data && res.data.accessToken) {
                props.setIsAuthenticated(true);
                props.setAccessToken(res.data.accessToken)
            } else {
                alert('Email hoặc mật khẩu không chính xác');
            }
        } catch (error) {
            console.error(error);
            alert('Email hoặc mật khẩu không chính xác');
        }
    }

    return (
        <div className="container">
          
        <div className="row d-flex justify-content-center align-items-center vh-100"> 
          <div className="col-md-6">
         <form method="post">
              <h3 className="d-flex justify-content-center pb-3">Đăng nhập</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  required 
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>         

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={(event)=> handleLogin(event)}>Submit</button>
              </form>
          </div>
        </div>
      </div>
    )
}

export default AdminLogin