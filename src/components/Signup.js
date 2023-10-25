import React, { useState } from "react";

import "./style.css";

import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  ///////////////////////////////////////////////

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the formData to your backend.
    console.log("Form data submitted:", formData);
  };
  // ////////////////////////////////////////////
  const handleSignup = () => {
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className="App">
      <div>
        <div className="logoimage">
          <img src={logoimage} alt="Your Logo" className="logo" />
        </div>

        <div className="SignupContainer">
          <h1>Sign Up</h1>
          {/* <div className="input-container">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password </label>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />          
          </div>
          <button className="SignupBut" onClick={handleSignup}>        
            <Link to="/">
              <p>Signup</p>
            </Link>
          </button>
          <a href="/" style={{ alignSelf: "center" }}>
            Have an account
          </a> */}

          {/* ///////////////// */}
          <form onSubmit={handleSubmit} >
            <div className="input-container">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Select Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="customer">Customer</option>
                <option value="salesman">Salesman</option>
                <option value="accounts">Accounts</option>
              </select>
            </div>
            <button type="submit">Register</button>
            <a href="/" style={{ alignSelf: "center" }}>
            Have an account
          </a>
          </form>
          {/* ///////////////// */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
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
        <button onClick={handleSignup}>Signup</button>
      </form> */
}
