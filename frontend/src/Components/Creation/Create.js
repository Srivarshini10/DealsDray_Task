import React, { useState} from "react";
import './Create.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course:"",
imageUrl: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value} = e.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData({ ...formData}); 
      }
     else {
      setError({ ...error, 
        imageUrl: "Only jpg/png files are allowed" });
    }
  };

  const nameRegex=/^[A-Za-z]+(?: [A-Za-z]+)*$/
  const mailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const navigate=useNavigate()

   async function handleSubmit(e){
    e.preventDefault();
    let valid=true;

    if (!nameRegex.test(formData.name)){
      setError({...error,name:"Invalid Name"})
      valid=false;
    }
    else if (!mailRegex.test(formData.email)){
      setError({...error,email:"Invalid Email"})
      valid=false;
    }
    
    else{
      try{
      await axios.post("http://localhost:5000/employees",formData)
      navigate('/list')
    }
  catch (err){
    console.log(err);
    
  }}
  };

  return (
    <div>
      <h2>Create Employee</h2>
    <form onSubmit={handleSubmit} className="form-container">
      <table>
      <tr className="create-container">
        <td><label>Name</label></td>
        <td><input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        /></td>
        <td>{error.name && <span className="error">{error.name}</span>}</td>
      </tr>

      <tr className="create-container">
        <td><label>Email</label></td>
        <td><input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        /></td>
        <td>{error.email && <span className="error">{error.email}</span>}</td>
      </tr>

      <tr className="create-container">
        <td><label>Mobile No</label></td>
        <td><input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        /></td>
        <td>{error.mobile && <span className="error">{error.mobile}</span>}</td>
      </tr>

      <tr className="create-container">
        <td><label>Designation</label></td>
        <td><select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select></td>
      </tr>

      <tr className="create-container">
        <td><label>Gender</label></td>
        <td><input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />{" "}
        Female</td>
        {error.gender && <span className="error">{error.gender}</span>}
      </tr>

      <tr className="create-container">
            <td><label>Course</label></td>
            <td><input
              type="checkbox"
              name="course"
              value="MCA"
              checked={formData.course.includes("MCA")}
              onChange={handleChange}
            />
            MCA
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={formData.course.includes("BCA")}
              onChange={handleChange}
            />
            BCA
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={formData.course.includes("BSC")}
              onChange={handleChange}
            />
            BSC</td>
            <td>{error.course && <span className="error">{error.course}</span>}</td>
          </tr>

      

      <tr className="create-container">
        <td><label>Img Upload</label></td>
        <td><input type="file" onChange={handleFileUpload} className="file-upload" /></td>
        <td>{error.
imageUrl && <span className="error">{error.
  imageUrl}</span>}</td>
      </tr>
      <tr className="create-container">
        <td></td>
        <td><button className='button' type="submit">Submit</button></td>
      </tr>
      
      </table>
    </form>
    
    </div>
  );
};

export default FormComponent;