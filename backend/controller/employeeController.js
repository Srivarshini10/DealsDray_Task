const Employee = require("../model/employeeModel");

exports.getEmployee= async (req, res,next) => {
  try {
    const employees = await Employee.find().exec();
    res.status(200).json(employees);
  } catch (err) {
    next(err)
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    await Employee.create(req.body).exec();
    res.status(200).json({ 
      message: "Employee updated successfully" 
    });
  } catch (err) {
    next(err)
  }
};

exports.updateEmployee= async (req, res,next) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id,req.body,{new:true,
      runValidators:true}).exec();
    res.status(200).json({ 
      message: "Employee updated successfully" 
    });
  } catch (err) {
    next(err)
  }
};

exports.deleteEmployee=async (req, res,next) => {
  try {
    await Employee.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ 
      message: "Employee deleted successfully" 
    });
  } catch (err) {
    next(err)
  }
};
