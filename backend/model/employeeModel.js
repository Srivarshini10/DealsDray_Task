const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender:{type: String, required: true},
  course:{type: String, required: true},
imageUrl: { type: String,default:"https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1727104487~exp=1727108087~hmac=b74a80d4b5850d76bf49b833ab425a5fe1a0f10be73f5f0af04b29e2c4f06a29&w=740"}, 
});

const Employee = mongoose.model("employeeList", employeeSchema,"employeeList");

module.exports = Employee;
