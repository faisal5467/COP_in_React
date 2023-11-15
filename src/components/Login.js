import React, { useState } from "react";
import Home from "./Home";
import "./style.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./commen/base_url";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Please fill the fields.");
        return; // Stop further execution
      }

      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      console.log("ye res", response.data);
      const checkrole = response.data;

      // Email matches, check the role
      if (checkrole.role === "customer") {
        navigate(`/customerdashboard`, {
          state: { checkrole },
        });
      } else if (checkrole.role === "salesman") {
        navigate(`/salesmandashboard`, {
          state: { checkrole },
        });
        console.log("mera user", checkrole);
      } else if (checkrole.role === "accounts") {
        navigate(`/accountdashboard`, {
          state: { checkrole },
        });
      }
    } catch (error) {
      // Handle login failure, show an error message, etc.
      setError(error.response ? error.response.data.error : "Unknown error");
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
            {error && <p style={{ textAlign: "center" }}>{error}</p>}
            <button className="loginBut" type="submit">
              <p>Login</p>
            </button>
          </form>

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
