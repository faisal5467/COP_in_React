import React, {useState, useEffect} from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation } from "react-router-dom";
import Logout from "../commen/logout";
import axios from "axios";
import { BASE_URL } from "../commen/base_url";


const Customerdashboard = () => {
  const location = useLocation();
  const { checkrole } = location.state;
  console.log("dashboard customer", checkrole);

  // const response = await axios.get(`${BASE_URL}/saveSaleRecord`); // Update the API endpoint
  // setSalesRecords(response.data);
  // console.log('aa gya sale record', response)

    const [salesRecords, setSalesRecords] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/salesrecords`); // Update the API endpoint
        setSalesRecords(response.data);
        console.log('aa gya sale record', response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <header>
        <a href="/salesmandashboard">
          <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
        </a>

        <div className="Empl0yee-data">
          <div className="user">Name: {checkrole.name}</div>
          <div className="useremail">CNIC: {checkrole.cnic}</div>
          <div className="useremail">Contact: {checkrole.contact}</div>
          <div className="useremail">Email: {checkrole.email}</div>

          <Logout />
        </div>
      </header>

      <main>
        <div className="buttons">
          <button>
            Account /<br></br>
            Surcharge Statement
          </button>
          <button>
            Discount /<br></br>
            Rent Statement
          </button>
          <button>
            Payment /<br></br>
            Statement
          </button>
        </div>

        <div className="description">
          <h1>Welcome to Earthlink</h1>
          <p>This is customer for your information</p>
        </div>
{/* /////////////////////////////////////////////// */}

<div className="project-table">
      {/* {projectData.length > 0 ? ( */}
      <table>
      <thead>
          <tr>
            <th>Date/Time</th>
            <th>Customer Name</th>
            <th>Contact Number</th>
            <th>Sale Date Time</th>
          </tr>
        </thead>
        <tbody>
          {salesRecords.map((record) => (
            <tr key={record.id}>
              {/* <td>{record.id}</td> */}
              <td>{record.saleDateTime}</td>
              <td>{record.customername}</td>
              <td>{record.contactnumber}</td>
              {/* Add other table cells for your fields */}
              <td>{record.saleDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <button className="SignupBut" onClick={()=>navigate('/salerecord')}>Submit</button> */}
      {/* ) : (
        <p>Loading project details...</p>
      )} */}

      <footer>
        <h1>Term: </h1>
      </footer>
    </div>
{/* ////////////////////////////////////// */}
  
      </main>
    </div>
  );
};

export default Customerdashboard;
