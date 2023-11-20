// import React, { useState, useEffect } from "react";
// import "../style.css";
// import logoimage from "../assets/Earthlink_logo.png";
// import { useLocation, useNavigate } from "react-router-dom";
// import Logout from "../commen/logout";
// import { BASE_URL } from "../commen/base_url";
// import axios from "axios";

// const Payment = () => {
// //   const location = useLocation();
// //   const { checkrole } = location.state;
//   // console.log("dashboard salesman ", checkrole);

//   const navigate = useNavigate();
//   const [submitMessage, setSubmitMessage] = useState("");
//   const [currentDateTime, setCurrentDateTime] = useState("");
// //   const emailRecipients = ["businesswork5467@gmail.com", "it@earthlink.com.pk"];

//   const [formData, setFormData] = useState({
//     saleDateTime: "",
//     amount: "",
//     amountInWords: "",
//     customerName: "",
//     medium: "",
//     evidence: null,
   
//   });

//   const clearForm = () => {
//     setFormData({
//         saleDateTime: "",
//         amount: "",
//         amountInWords: "",
//         customerName: "",
//         medium: "",
//         evidence: null,
//     });
//   };

//   const getCurrentDateTime = () => {
//     const current = new Date();
//     const formattedDateTime = current.toLocaleString();
//     return formattedDateTime;
//   };

//   useEffect(() => {
//     // Update the date and time every second
//     const intervalId = setInterval(() => {
//       setFormData((prevData) => ({
//         ...prevData,
//         saleDateTime: getCurrentDateTime(),
//       }));
//     }, 1000);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     // Handle file changes and store the selected file
//     const file = e.target.files[0];
//     setEvidence(file);
//   };

// // ///////////////
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here

//     const currentDate = new Date();
//     const formattedDate = currentDate
//       .toISOString()
//       .replace("T", " ")
//       .replace(/\.\d{3}Z/, "");

//     const subject = `New Sale Record - ${getCurrentDateTime()}`;

//     axios
//       .post(`${BASE_URL}/saveSaleRecord`, formData)
//       .then((response) => {
//         console.log(
//           "Sale record submitted successfully from saleRord file in database"
//         );
//         // Handle any additional logic after a successful submission
//       })
//       .catch((error) => {
//         console.error("Error submitting sale record in database:", error);
//         // Handle any errors or display error messages to the user
//       });

//     setFormData({ ...formData, saleDateTime: currentDateTime });
//     console.log("Form Data:", formData);
//     setSubmitMessage(alert("Record submitted successfully in database"));

//     // /////////////////// email call kr raha
//     // axios
//     //   .post(`${BASE_URL}/send-email`, {
//     //     to: emailRecipients, // Update with recipient email
//     //     subject: subject, // Your subject line
//     //     formData: formData, // Send your form data to the server
//     //   })
//     //   .then((response) => {
//     //     // Handle the success response
//     //     console.log("email chali gai", response.data);

//     //     // Show a success alert
//     //   });
//     // //////////

//     // axios
//     //   .post(`${BASE_URL}/send-email`, formData)
//     //   // axios.post('https://check.earthlink.com.pk/submit', formData)
//     //   .then((response) => {
//     //     // Handle the success response
//     //     console.log('email chali gai',response.data);

//     //     // Show a success alert
//     //   })
//     //   .catch((error) => {
//     //     // Handle any API request error here
//     //     console.error("API request error:", error);
//     //   });
//   };

//   return (
//     <div className="home-container">
//       <header>
//         <a onClick={() => navigate(-1)}>
//           <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
//         </a>

//         <div className="Empl0yee-data">
//           {/* <div className="user">Name: {checkrole.name}</div>
//           <div className="useremail">CNIC: {checkrole.cnic}</div>
//           <div className="useremail">Contact: {checkrole.contact}</div>
//           <div className="useremail">Email: {checkrole.email}</div> */}

//           <Logout />
//         </div>
//       </header>
//       <main>
//         <div className="description">
//           <h1>Project Details</h1>
//           {/* <p>This is your SALEdashboard for your information</p> */}
//         </div>
//         {/* <div className="buttons">
//         <button>Submit</button>
//       </div> */}
//       </main>

//       <div className="your-form-container">
//         <h2>Please Enter Your Project Details</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="datetime">
//             <label style={{ paddingRight: 10 }}>Date/Time</label>
//             <input
//               type="text"
//               name="saleDateTime"
//               value={formData.saleDateTime}
//               readOnly
//             />
//           </div>
//           <div className="form-row">
//             <label>Amount (Digit)</label>
//             <input
//               type="text"
//               name="amount"
//               value={formData.amount}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-row">
//             <label>Amount in Words</label>
//             <input
//               type="text"
//               name="amountInWords"
//               value={formData.amountInWords}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="form-row">
//             <label>Customer Name</label>
//             <input
//               type="text"
//               name="customerName"
//               value={formData.customerName}
//               onChange={handleInputChange}
//             />
//           </div>


//           <div className="form-row">
//           <label>Evidence:</label>
//         <input type="file" onChange={handleFileChange} />
//           </div>
          

//           <div className="form-row">
//             <label>Medium *</label>
//             <div>
//               <select
//                 name="medium"
//                 value={formData.medium}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Medium</option>
//                 <option value="Bank">Bank</option>
//                 <option value="Bank">EasyPaisa</option>
//               </select>
//             </div>
//           </div>
      

//           <div className="form-buttons">
//             <button type="button" onClick={clearForm}>
//               Clear Form
//             </button>
//             <button type="button" onClick={() => navigate(-1)}>
//               Cancel Form
//             </button>
//             <button type="submit">Submit Form</button>
//           </div>
//         </form>
//         {submitMessage && <p>{submitMessage}</p>}
//       </div>
//     </div>
//   );
// };

// export default Payment;



import React, { useState, useEffect } from "react";
import "../style.css";
import logoimage from "../assets/Earthlink_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../commen/logout";
import { BASE_URL } from "../commen/base_url";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    saleDateTime: "",
    amount: "",
    amount_in_words: "",
    customer_name: "",
    medium: "",
    evidence_path: null,
  });

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

  const getCurrentDateTime = () => {
    const current = new Date();
    const formattedDateTime = current.toLocaleString();
    return formattedDateTime;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   // Handle file changes and store the selected file
  //   const file = e.target.files[0];
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     evidence_path: file,
  //   }));
  // };

  const [errorMessage, setErrorMessage] = useState('');
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    // Check if a file is selected
    if (!file) {
      setFormData((prevData) => ({
        ...prevData,
        evidence_path: null, // Reset evidence_path if no file is selected
      }));
      return;
    }
  
    // Check if the file type is allowed (image or PDF)
    if (!isFileTypeAllowed(file)) {
      setErrorMessage('Invalid file type. Please upload an image or a PDF.');
      setFormData((prevData) => ({
        ...prevData,
        evidence_path: null, // Reset evidence_path if file type is not allowed
      }));
      return;
    }
  
    // Reset error message and update selected file
    setErrorMessage('');
    setFormData((prevData) => ({
      ...prevData,
      evidence_path: file,
    }));
  };
  
  const isFileTypeAllowed = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    return allowedTypes.includes(file.type);
  };

  const clearForm = () => {
    setFormData({
      // saleDateTime: getCurrentDateTime(),
      saleDateTime: "",
      amount: "",
      amount_in_words: "",
      customer_name: "",
      medium: "",
      evidence_path: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData to send files
      const formDataToSend = new FormData();
      formDataToSend.append("saleDateTime", formData.saleDateTime);
      formDataToSend.append("amount", formData.amount);
      formDataToSend.append("amount_in_words", formData.amount_in_words);
      formDataToSend.append("customer_name", formData.customer_name);
      formDataToSend.append("medium", formData.medium);
      formDataToSend.append("evidence_path", formData.evidence_path);

      // Make a POST request to your server endpoint
      const response = await axios.post(
        `${BASE_URL}/savePaymentRecord`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle success, e.g., show a success message or redirect
      console.log("Payment submitted successfully:", response.data);
      setSubmitMessage("Record submitted successfully in database");
    } catch (error) {
      // Handle errors, e.g., show an error message to the user
      console.error("Error submitting payment:", error.response.data);
      setSubmitMessage("Error submitting payment");
    }
  };

  return  (
        <div className="home-container">
          <header>
            <a onClick={() => navigate(-1)}>
              <img src={logoimage} alt="Your Logo" className="dashboard-logo" />
            </a>
    
            <div className="Empl0yee-data">
              {/* <div className="user">Name: {checkrole.name}</div>
              <div className="useremail">CNIC: {checkrole.cnic}</div>
              <div className="useremail">Contact: {checkrole.contact}</div>
              <div className="useremail">Email: {checkrole.email}</div> */}
    
              <Logout />
            </div>
          </header>
          <main>
            <div className="description">
              <h1>Project Details</h1>
              {/* <p>This is your SALEdashboard for your information</p> */}
            </div>
            {/* <div className="buttons">
            <button>Submit</button>
          </div> */}
          </main>
    
          <div className="your-form-container">
            <h2>Please Enter Your Project Details</h2>
    
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
                <label>Amount (Digit)</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Amount in Words</label>
                <input
                  type="text"
                  name="amount_in_words"
                  value={formData.amount_in_words}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleInputChange}
                />
              </div>
    
    
              <div className="form-row">
              <label>Evidence:</label>
            <input type="file" onChange={handleFileChange} />
              </div>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
              <div className="form-row">
                <label>Medium *</label>
                <div>
                  <select
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Medium</option>
                    <option value="Bank">Bank</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="jazzcash">Jazzcash</option>
                  </select>
                </div>
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

export default Payment;
