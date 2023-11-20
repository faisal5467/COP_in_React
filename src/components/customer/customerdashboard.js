import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../commen/logout";
import axios from "axios";
import { BASE_URL } from "../commen/base_url";
import moment from 'moment-timezone';

const Customerdashboard = () => {
  const location = useLocation();
  const { checkrole } = location.state;
  // console.log("dashboard customer", checkrole);
  const navigate = useNavigate();
  // const response = await axios.get(`${BASE_URL}/saveSaleRecord`); // Update the API endpoint
  // setSalesRecords(response.data);
  // console.log('aa gya sale record', response)
  const [showTable, setShowTable] = useState(false);
  const handleSurchargeButtonClick = () => {
    // Toggle the state to show or hide the table
    setShowTable(!showTable);
  };

  const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/salesrecords?customerId=${checkrole.customerId}`); // Update the API endpoint
        setSalesRecords(response.data);
        // console.log("aa gya sale record", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log("single sale record", salesRecords);
  // ///////////////////////// get installment data
  const [installments, setInstallments] = useState([]);

  // useEffect(() => {
  //   // Fetch installment details based on customerId
  //   const fetchInstallments = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/installments/${checkrole.customerId}`);
  //       setInstallments(response.data);
  //       console.log('Installment details:', response.data);
  //     } catch (error) {
  //       console.error('Error fetching installment details:', error);
  //     }
  //   };

  //   fetchInstallments();
  // }, []); // Trigger the fetch when customerId changes
// //////////////////////////

useEffect(() => {
  const fetchInstallments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/installments/${checkrole.customerId}`);
      const formattedInstallments = response.data.map((installment) => ({
        ...installment,
        due_date: moment(installment.due_date).tz('Asia/Karachi').format('YYYY-MM-DD'), //.format('YYYY-MM-DD HH:mm:ss'),
        paid_on: installment.paid_on ? moment(installment.paid_on).tz('Asia/Karachi').format('YYYY-MM-DD') : null,
      }));
      setInstallments(formattedInstallments);
      console.log('Installment details:', formattedInstallments);
    } catch (error) {
      console.error('Error fetching installment details:', error);
    }
  };

  fetchInstallments();
}, []);

  return (
    <div className="home-container">
      <header>
        <a href="/customerdashboard">
          <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
        </a>

        <div className="Empl0yee-data">
          <div className="user">Name: {checkrole.name}</div>
          <div className="useremail">CNIC: {checkrole.cnic}</div>
          <div className="useremail">Contact: {checkrole.contact}</div>
          <div className="useremail">Email: {checkrole.email}</div>
          <div className="useremail">Customer ID: {checkrole.customerId}</div>

          <Logout />
        </div>
      </header>

      <main>
        <div className="buttons">
          <button onClick={handleSurchargeButtonClick}>
            Account /<br></br>
            Surcharge Statement
          </button>
          <button>
            Discount /<br></br>
            Rent Statement
          </button>
          <button onClick={() => navigate("/payment")}>
            Payment /<br></br>
            Statement
          </button>
          <div className="description">
          {/* <h1>Welcome to Earthlink</h1> */}
          {/* <p>This is customer for your information</p> */}
        </div>
        </div>

        <div className="Project-detials">
        <p>Projecteeeee: {salesRecords.projectName}</p>
        {salesRecords.map((record) => (
          <div key={record.id}>
            <p>Project: {record.projectName}</p>
            <p>Floor: {record.floorNumber}</p>
            <p>Unit: {record.unitNumber}</p>
            <p> Category: {record.category}</p>
            <p> Size: {record.sizeInSqFt}</p>
          </div>
        ))}
        </div>
   
      </main>

         
        {/* /////////////////////////////////////////////// */}
       
       

        {/* ////////////////////////////////////// */}
        {showTable && (
      <div className="project-table">
        {/* {projectData.length > 0 ? ( */}
        <div className="description">
          <h1>Account / Surcharge Statement</h1>
        </div>
        {/* <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>CNIC/PASSPORT</th>
              <th>Down Payment</th>
              <th>Full Payment</th>
              <th>No of Installment</th>
              <th>Total Installment Amount</th>
              <th>Installment Peroid</th>
              <th>Per Installment Amount</th>
            </tr>
          </thead>
          <tbody>
            {salesRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.saleDateTime}</td>
                <td>{record.cnic}</td>
                <td>{record.projectDownPayment}</td>
                <td>{record.fullPayment}</td>
                <td>{record.noOfInstallment}</td>
                <td>{record.totalInstallmentAmount}</td>
                <td>{record.installmentPeriod}</td>
                <td>{record.perInstallmentAmount}</td>

              </tr>
            ))}
          </tbody>
        </table> */}
   {/* ////////////////////////////////////// */}

   <div>
      {/* <h2>Installment Details</h2> */}
      <table>
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Description</th>
            <th>Due Amount</th>
            <th>Amount Received</th>
            <th>Pain On</th>
            <th>Surcharge</th>
            <th>Balance Amount</th>
            <th>Payment Details</th>
            {/* Add more columns based on your Installment table */}
          </tr>
        </thead>
        <tbody>
          {installments.map((installment) => (
            <tr key={installment.id}>
              <td>{installment.due_date}</td>
              <td>{installment.description}</td>
              <td>{installment.due_amount}</td>
              <td>{installment.amount_received}</td>
              <td>{installment.paid_on}</td>  
              <td>{installment.surcharge}</td>  
              <td>{installment.balance_amount}</td>  
              <td>{installment.payment_medium}</td>  
              {/* Add more cells based on your Installment table */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

{/* /////////////////////////////////////// */}
        <footer>
          <h3 style={{textAlign:'center'}}>Term: </h3>
        </footer>
      </div>
       )}

      
    </div>
  );
};

export default Customerdashboard;
