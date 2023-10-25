import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logoimage from "./assets/Earthlink_logo.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const initialFormData ={
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the formData to your backend.
    console.log("Form data submitted:", formData);
    localStorage.setItem('userData', JSON.stringify(formData));
    navigate('/')
// Redirect to the dashboard based on the selected role
// const checkrole = formData.role;
// if (checkrole === 'customer') {
//   history.push('/customer-dashboard');
// } else if (checkrole === 'salesman') {
//   history.push('/salesman-dashboard');
// } else if (checkrole === 'accounts') {
//   history.push('/accounts-dashboard');
// }

    setFormData({ ...initialFormData });
  };
 

  return (
    <div className="App">
      <div>
        <div className="logoimage">
          <img src={logoimage} alt="Your Logo" className="logo" />
        </div>

        <div className="SignupContainer">
          <h1>Sign Up</h1>
         

          {/* ///////////////// */}
          <form onSubmit={handleSubmit} >
            <div className="input-container">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-container">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
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
            <button type="submit">Sign Up</button>
            {/* <button onClick={()=>{navigate('/')}} type="submit">Sign Up</button> */}
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

