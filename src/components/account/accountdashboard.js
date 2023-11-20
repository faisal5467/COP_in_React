import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation } from "react-router-dom";
import Logout from "../commen/logout";
import { BASE_URL } from "../commen/base_url";
import axios from "axios";

const Accountdashboard = () => {
  const location = useLocation();
  const { checkrole } = location.state;
  console.log("account dashboard", checkrole);

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/payments`);
        setPayments(response.data);
        console.log("Payments fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments(); // Call the fetchPayments function
  }, []); // Empty dependency array to ensure it runs only once on mount

  // Handle payment verification
  const handleVerifyPayment = async (paymentId) => {
    try {
      // Assuming 'verified' is the status for a verified payment
      await axios.put(`${BASE_URL}/verifyPayment/${paymentId}`, { status: 'verified' });
      // Refresh payments data after verification
      const updatedPayments = payments.map((payment) =>
        payment.id === paymentId ? { ...payment, status: 'verified' } : payment
      );
      setPayments(updatedPayments);
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

    // Filter out payments with 'verified' status
    const pendingPayments = payments.filter((payment) => payment.status !== 'verified');
  return (
    <div className="home-container">
          <header>
        <a href="/accountdashboard">
          <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
        </a>

        <div className="Empl0yee-data">
          <div className="user">Name: {checkrole.name}</div>
          {/* <div className="useremail">CNIC: {checkrole.cnic}</div> */}
          <div className="useremail">Contact: {checkrole.contact}</div>
          <div className="useremail">Email: {checkrole.email}</div>
          {/* <div className="useremail">Customer ID: {checkrole.customerId}</div> */}

          <Logout />
        </div>
      </header>
  

<main>
        <div>
          <h2 style={{textAlign:'center'}}>Pending Verification (Transactions)</h2>
          <table>
            <thead>
              <tr>
                {/* <th>Customer ID</th> */}
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Medium</th>
                <th>Verification Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              
              {/* Display payment records and their status */}
              {/* {payments.map((payment) => ( */}
               {/* Display pending payments (excluding 'verified' ones) */}
               {pendingPayments.map((payment) => (
                <tr key={payment.id}>
                  {/* <td>{payment.customer_id}</td> */}
                  <td>{payment.customer_name}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.medium}</td>
                  <td>{payment.status}</td>
                  <td>
                    {/* Button to verify payment */}
                    {payment.status === 'pending' && (
                      <button onClick={() => handleVerifyPayment(payment.id)}>
                        Verify Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Accountdashboard;
