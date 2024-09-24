const express = require("express");
const { getEmployee, updateEmployee, deleteEmployee, createEmployee } = require("../controller/employeeController");

const router = express.Router()

router.get("/", getEmployee)
router.post("/", createEmployee)
router.patch("/:id", updateEmployee)
router.delete("/:id", deleteEmployee)

module.exports = router;