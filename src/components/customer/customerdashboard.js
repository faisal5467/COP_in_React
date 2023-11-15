import React from "react";
import "../style.css"
import logoimage from "../assets/Earthlink_logo.png"
import { useLocation } from 'react-router-dom';
import Logout from "../commen/logout";

const Customerdashboard = () => {
    const location = useLocation();
    const { checkrole } = location.state;
    console.log('dashboard ', checkrole)

return(
    <div className="home-container">

<header>
    <a href="/salesmandashboard">
    <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
</a>
   
    <div className="Empl0yee-data">
    
      <div className="user">Name:   {checkrole.name}</div>
      <div className="useremail">CNIC:  {checkrole.cnic}</div>
      <div className="useremail">Contact:  {checkrole.contact}</div>
      <div className="useremail">Email:  {checkrole.email}</div>
      
      <Logout/>
      </div>
    </header>

    <main>
   
      <div className="buttons">
        <button>Account /<br></br>
           Surcharge Statement</button>
        <button>Discount /<br></br>
           Rent Statement</button>
        <button>Payment /<br></br>
        Statement</button>

      </div>

      <div className="description">
        <h1>Welcome to Earthlink</h1>
        <p>This is customer for your information</p>
      </div>
    </main>
  </div>


 );
}

export default Customerdashboard;




   