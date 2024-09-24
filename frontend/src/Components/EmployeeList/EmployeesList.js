import React, { useState ,useEffect} from 'react';
import './EmployeeList.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [cursrch,setCursrch]=useState("")
  const [updatedEmployee, setUpdatedEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

    function onSrch(event){
      setCursrch(event.target.value)
      console.log(cursrch);
      
    }


  async function handleEdit (id) {
    const confirm = window.confirm("Are you sure you want to edit this employee?");
    if (confirm) {
      const response = await axios.patch(`http://localhost:5000/employees/${id}`, updatedEmployee);
      const update = response.data;
      setEmployees(employees.map((employee) => employee.id === id ? update : employee));
    }
  };

  async function handleDelete (id) {
    await axios.delete(`http://localhost:5000/employees/${id}`)
  };

  
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      const employeeData= response.data;
      if(cursrch===''){
      setEmployees(employeeData);
      console.log(employees.course[0]);
      
      }
      else{
        const match=employeeData.filter(item=>item.name.includes(cursrch))
        setEmployees(match)
        console.log(employees);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="employee-list-container">
      <div className="header">
    <div className="nav">
      <span>Logo</span>
      <span>Home</span>
      <span><Link to={'/dash/list'} style={{textDecoration:'none',color:'black'}}>Employee List</Link></span>
    </div>
    <div className="user-info">
      <span>Hukum-Gupta</span>
      <span className="logout">Logout</span>
    </div>
  </div>
      
      <div className="actions">
        <p>Total Count :<span>{employees.length}</span></p>
        <button className="create-btn"><Link to='/create'  style={{textDecoration:'none',color:'white'}}>Create Employee</Link></button>
      </div>
      <div className='search-bar'>
        <label>Search</label>
      <input type="search" placeholder="Enter Search Keyword" onChange={onSrch}/>
      </div>
      <table className="employee-table" >
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee._id}</td>
              <td><img src="placeholder.jpg" alt="profile" className="profile-img" /></td>
              <td>{employee.name}</td>
              <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course}</td>
              <td>23-09-24</td>
              <td className='action-edit'>
                <button onClick={() =>
                    handleEdit(employee._id)
                  }
                className="edit-btn">Edit</button>
                <span>-</span>
                <button onClick={() => handleDelete(employee._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;


