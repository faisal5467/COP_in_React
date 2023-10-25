import React, { useState } from "react";
import Home from "./Home";
import "./style.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";
import { useNavigate } from "react-router-dom";

function Login() {
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //   const handleLogin = () => {
  //     const user = { username, password };
  //     localStorage.setItem('user', JSON.stringify(user));
  //  };
  // ///////////////check
  //     const checkrole = JSON.parse(localStorage.getItem('userData')).role;
  // if (checkrole === 'customer') {
  //   history.push('/customer-dashboard');
  // } else if (checkrole === 'salesman') {
  //   history.push('/salesman-dashboard');
  // } else if (checkrole === 'accounts') {
  //   history.push('/accounts-dashboard');
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  // const checkrole = JSON.parse(localStorage.getItem('userData')).role;
  const handleLogin = () => {
    // Get the role and email from localStorage
    const checkrole = JSON.parse(localStorage.getItem("userData"));
    console.log("user data is ", checkrole);
    if (checkrole) {
      const {
        role,
        email: storedEmail,
        password: storedPassword,
        name,
      } = checkrole;

      if (email.trim() === "" || password.trim() === "") {
        alert("Please fill in both email and password fields.");
        return; // Stop further execution
      }
      if (email === storedEmail && password === storedPassword) {
        // Email matches, check the role
        if (role === "customer") {
          // navigate('/customerdashboard');
          navigate(`/customerdashboard`, {
            state: { name, email },
          });
        } else if (role === "salesman") {
          // navigate('/salesmandashboard');
          navigate(`/salesmandashboard`, {
            state: { name, email },
          });
          console.log("mera user", checkrole);
        } else if (role === "accounts") {
          // navigate('/accountdashboard');
          navigate(`/accountdashboard`, {
            state: { name, email },
          });
        }
      } else {
        // Email doesn't match the one stored in localStorage
        alert("Invalid email and password");
      }
    } else {
      // User not found in localStorage
      alert("User not found. Please register.");
    }
  };

  return (
    <div className="App">
      {/* /////////////////start from this  */}
      {/* <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {validationError && <p>{validationError}</p>}
      <a href="/signup" style={{alignSelf:'center'}}>Create a new account</a>
    </div> */}

      {/* /////////////////////end on this  */}
      <div>
        <div className="logoimage">
          <img src={logoimage} alt="Your Logo" className="logo" />
        </div>

        <div className="loginContainer">
          <h1>Login </h1>
          {/* /////////////// */}
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="loginBut" type="submit">
              <p>Login</p>
            </button>
          </form>
          {validationError && <p>{validationError}</p>}
          <a href="/signup" style={{ alignSelf: "center" }}>
            Create a new account
          </a>
          {/* ///////////// */}
          {/* <div className="input-container">
          <label>Username</label>
       
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
         
        </div>
        <div className="input-container">
          <label>Password </label>
        
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
 
        </div> */}

          {/* <button className="loginBut" onClick={() => { handleLogin(); navigate('/home'); }}>
          <p>Login</p>
        </button>
        <a href="/signup" style={{alignSelf:'center'}}>Create a new account</a>
     */}
        </div>
      </div>
    </div>
  );
}

export default Login;
{
  /* <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
      </form> */
}
