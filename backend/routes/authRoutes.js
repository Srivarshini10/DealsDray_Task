const express = require("express");
const {getUser} = require("../controller/authController");

const router = express.Router();

router.get("/",getUser)

module.exports=router;