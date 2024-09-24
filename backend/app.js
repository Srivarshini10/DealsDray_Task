
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require("cors")
const employeeRoutes=require("./routes/employeeRoutes")
const authRoutes=require("./routes/authRoutes")
const {errorHandler}=require("./middleware/errorHandle")

dotenv.config();
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database is connected");
});

const app = express();
app.use(cors({
  origin:"http://localhost:3000",
  Credentials:true, 
 }))

app.use(express.json());

app.use("/employees", employeeRoutes);
app.use("/user",authRoutes)

app.use(errorHandler)

app.listen(5000, () => {
  console.log("Server Running");
});
