import React, { useState } from 'react';
import Home from './Home';
import "./style.css"
import Header from './Header' 
import { Link } from 'react-router-dom';
import logoimage from "./assets/Earthlink_logo.png"


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = () => {
    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));

// ///////////////check
//     const checkrole = JSON.parse(localStorage.getItem('userData')).role;
// if (checkrole === 'customer') {
//   history.push('/customer-dashboard');
// } else if (checkrole === 'salesman') {
//   history.push('/salesman-dashboard');
// } else if (checkrole === 'accounts') {
//   history.push('/accounts-dashboard');
// }

  
  };

  return (
 
    <div className="App">
      
      <div >
     
          <div className='logoimage'>

          <img src={logoimage} alt="Your Logo" className="logo" />
          </div>

      <div className="loginContainer">
   
        <h1>Login </h1>

        <div className="input-container">
          <label>Username</label>
          {/* <input type="text" name="uname" required /> */}
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          {/* <input type="password" name="pass" required /> */}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {/* {renderErrorMessage("pass")} */}
        </div>


        <button className="loginBut" onClick={handleLogin}>
          {/* <p>Login</p> */}
          <Link to="/home"><p>Login</p></Link>
        </button>
        <a href="/signup" style={{alignSelf:'center'}}>Create a new account</a>
    
      </div>
    </div>
     
    </div>
  );
}

export default Login;
 {/* <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
      </form> */}