import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../commen/logout";
import { BASE_URL } from "../commen/base_url";
import axios from "axios";

const Salesmandashboard = () => {
  const location = useLocation();
  const { checkrole } = location.state;
  // console.log("dashboard salesman ", checkrole);

  const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const emailRecipients = ["businesswork5467@gmail.com", "it@earthlink.com.pk"];

  const [formData, setFormData] = useState({
    saleDateTime: "",
    customername: "",
    contactnumber: "",
    cnic: "",
    customerEmail: "",
    customerAddress: "",
    customerCity: "",
    customerId: "",
    slotNumber: "",
    sizeInSqFt: "",
    unitNumber: "",
    floorNumber: "",
    projectName: "",
    projectDownPayment: "",
    fullPayment: "",
    totalprice: "",
    totalpriceWords: "",
    token: "",
    tokenInWords: "",
    downpaymentInWords: "",
    fullPaymentInWords: "",
    category: "",
    remark: "",
    noOfInstallment: "",
    totalInstallmentAmount: "",
    installmentPeriod: "",
    perInstallmentAmount: "",
  });

  const clearForm = () => {
    setFormData({
      saleDateTime: "",
      customername: "",
      contactnumber: "",
      cnic: "",
      customerEmail: "",
      customerAddress: "",
      customerCity: "",
      customerId: "",
      slotNumber: "",
      sizeInSqFt: "",
      unitNumber: "",
      floorNumber: "",
      projectName: "",
      projectDownPayment: "",
      fullPayment: "",
      totalprice: "",
      totalpriceWords: "",
      token: "",
      tokenInWords: "",
      downpaymentInWords: "",
      fullPaymentInWords: "",
      category: "",
      remark: "",
      noOfInstallment: "",
      totalInstallmentAmount: "",
      perInstallmentAmount: "",
    });
  };

  const getCurrentDateTime = () => {
    const current = new Date();
    const formattedDateTime = current.toLocaleString();
    return formattedDateTime;
  };

  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setFormData((prevData) => ({
        ...prevData,
        saleDateTime: getCurrentDateTime(),
      }));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
// /////////////
const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Update the state with the new form data
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));

  // If the changed field is one of the relevant fields, calculate totalInstallmentAmount
  if (["totalprice", "token", "projectDownPayment", "noOfInstallment"].includes(name)) {
    const calculatedRemainingInstallmentAmount =
      (parseFloat(formData.totalprice) - parseFloat(formData.token) - parseFloat(formData.projectDownPayment)) /
      parseFloat(formData.noOfInstallment);

    // Update the state with the calculated values
    setFormData((prevData) => ({
      ...prevData,
      totalInstallmentAmount: calculatedRemainingInstallmentAmount.toFixed(2),
      perInstallmentAmount: (
        calculatedRemainingInstallmentAmount / parseFloat(value.installmentPeriod)
      ).toFixed(2),
    }));
  } else if (name === "installmentPeriod") {
    // If the changed field is "installmentPeriod," recalculate perInstallmentAmount
    const calculatedPerInstallmentAmount =
      parseFloat(formData.totalInstallmentAmount) / parseFloat(value);

    // Update the state with the calculated value
    setFormData((prevData) => ({
      ...prevData,
      perInstallmentAmount: calculatedPerInstallmentAmount.toFixed(2),
    }));
  }
};





// ///////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here

    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .replace("T", " ")
      .replace(/\.\d{3}Z/, "");

    const subject = `New Sale Record - ${getCurrentDateTime()}`;

    axios
      .post(`${BASE_URL}/saveSaleRecord`, formData)
      .then((response) => {
        console.log(
          "Sale record submitted successfully from saleRord file in database"
        );
        // Handle any additional logic after a successful submission
      })
      .catch((error) => {
        console.error("Error submitting sale record in database:", error);
        // Handle any errors or display error messages to the user
      });

    setFormData({ ...formData, saleDateTime: currentDateTime });
    console.log("Form Data:", formData);
    setSubmitMessage(alert("Record submitted successfully in database"));

    // /////////////////// email call kr raha
    // axios
    //   .post(`${BASE_URL}/send-email`, {
    //     to: emailRecipients, // Update with recipient email
    //     subject: subject, // Your subject line
    //     formData: formData, // Send your form data to the server
    //   })
    //   .then((response) => {
    //     // Handle the success response
    //     console.log("email chali gai", response.data);

    //     // Show a success alert
    //   });
    // //////////

    // axios
    //   .post(`${BASE_URL}/send-email`, formData)
    //   // axios.post('https://check.earthlink.com.pk/submit', formData)
    //   .then((response) => {
    //     // Handle the success response
    //     console.log('email chali gai',response.data);

    //     // Show a success alert
    //   })
    //   .catch((error) => {
    //     // Handle any API request error here
    //     console.error("API request error:", error);
    //   });
  };

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
      <p>Total Installment Amount: {formData.totalInstallmentAmount}</p>
      <main>
        <div className="description">
          <h1>Sale Record</h1>
          {/* <p>This is your SALEdashboard for your information</p> */}
        </div>
        {/* <div className="buttons">
        <button>Submit</button>
      </div> */}
      </main>

      <div className="your-form-container">
        <h2>Please Enter The Sale Record</h2>

        <form onSubmit={handleSubmit}>
          <div className="datetime">
            <label style={{ paddingRight: 10 }}>Date/Time</label>
            <input
              type="text"
              name="saleDateTime"
              value={formData.saleDateTime}
              readOnly
            />
          </div>
          <div className="form-row">
            <label>Customer Name</label>
            <input
              type="text"
              name="customername"
              value={formData.customername}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Contact Number</label>
            <input
              type="text"
              name="contactnumber"
              value={formData.contactnumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>CNIC / Passport *</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-row">
            <label>Contact Email</label>
            <input
              type="text"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Address</label>
            <input
              type="text"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>City</label>
            <input
              type="text"
              name="customerCity"
              value={formData.customerCity}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Customer ID *</label>
            <input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Project Name *</label>
            <div>
              <select
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
              >
                <option value="">Select Project</option>
                <option value="PIANO BY THE GRANDE">PIANO BY THE GRANDE</option>
                <option value="THE GRANDE PRIVE">THE GRANDE PRIVE</option>
              </select>
            </div>
          </div>
          {/* <div className="form-row">
            <label>Manager Employee ID * </label>
            <input
              type="text"
              name="managerEmpid"
              value={formData.managerEmpid}
              onChange={handleInputChange}
              required
            />
          </div> */}

          {/* Conditionally render fields based on COP Type */}

          <div className="form-row">
            <label>Floor Number</label>
            <input
              type="text"
              name="floorNumber"
              value={formData.floorNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Unit Number</label>
            <input
              type="text"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Slot Number</label>
            <input
              type="text"
              name="slotNumber"
              value={formData.slotNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Size (sq. ft)</label>
            <input
              type="text"
              name="sizeInSqFt"
              value={formData.sizeInSqFt}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Gategory *</label>
            <div>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="Semi-Corner">Semi-Corner</option>
                <option value="Corner">Corner</option>
              </select>
            </div>
          </div>

          {/* <div className="form-row">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
            />
          </div> */}

          <div className="form-row">
            <label>Total Price</label>
            <input
              type="text"
              name="totalprice"
              value={formData.totalprice}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Total Price (Words)</label>
            <input
              type="text"
              name="totalpriceWords"
              value={formData.totalpriceWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Token</label>
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Token in Words</label>
            <input
              type="text"
              name="tokenInWords"
              value={formData.tokenInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Down Payment</label>
            <input
              type="text"
              name="projectDownPayment"
              value={formData.projectDownPayment}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Down Payment in Words</label>
            <input
              type="text"
              name="downpaymentInWords"
              value={formData.downpaymentInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Full Payment</label>
            <input
              type="text"
              name="fullPayment"
              value={formData.fullPayment}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>Full Payment in Words</label>
            <input
              type="text"
              name="fullPaymentInWords"
              value={formData.fullPaymentInWords}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Remarks</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <label>No of Installment</label>
            <input
              type="text"
              name="noOfInstallment"
              value={formData.noOfInstallment}
              onChange={handleInputChange}
            />
          </div>

          
          <div className="form-row">
            <label>Total Installment Amount</label>
            {/* <input
              type="text"
              name="totalInstallmentAmount"
              value={formData.totalInstallmentAmount}         
              onChange={handleInputChange}
            /> */}
             <input
              // type="text"
              name="totalInstallmentAmount"
              value={formData.totalInstallmentAmount}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Installment Period</label>
            <div>
              <select
                name="installmentPeriod"
                value={formData.installmentPeriod}
                onChange={handleInputChange}
              >
                <option value="">Select Installment Period</option>
                <option value="1-month">1 months</option>
                <option value="2-month">2 months</option>
                <option value="3-month">3 months</option>
                <option value="4-month">4 months</option>
                <option value="5-month">5 months</option>
                <option value="6-month">6 months</option>
                <option value="7-month">7 months</option>
                <option value="8-month">8 months</option>
                <option value="9-month">9 months</option>
                <option value="10-month">10 months</option>
                <option value="11-month">11 months</option>
                <option value="12-month">12 months</option>
                <option value="13-month">13 months</option>
                <option value="14-month">14 months</option>
                <option value="15-month">15 months</option>
                <option value="16-month">16 months</option>
                <option value="17-month">17 months</option>
                <option value="18-month">18 months</option>
                <option value="19-month">19 months</option>
                <option value="20-month">20 months</option>
                <option value="21-month">21 months</option>
                <option value="22-month">22 months</option>
                <option value="23-month">23 months</option>
                <option value="24-month">24 months</option>
               
              </select>
            </div>
          </div>
          <div className="form-row">
            <label>Per Installment Ammount</label>
            <input
              type="text"
              name="perInstallmentAmount"
              value={formData.perInstallmentAmount}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={clearForm}>
              Clear Form
            </button>
            <button type="button" onClick={() => navigate(-1)}>
              Cancel Form
            </button>
            <button type="submit">Submit Form</button>
          </div>
        </form>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
};

export default Salesmandashboard;
