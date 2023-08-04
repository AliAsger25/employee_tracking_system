const express = require('express');
const employee = require("../controller/employeeController");
const {registerEmployeeVal,loginEmployeeVal, forgetPasswordVal} =
 require('../validations/employee/empDatavalidate');
const authToken = require('../middlewares/authToken');

let employeeRouter = express.Router();

employeeRouter.post("/create",registerEmployeeVal,employee.createEmployee);
employeeRouter.post("/login",loginEmployeeVal,employee.employeeLogin);
employeeRouter.post("/sendmail", employee.sendMailToResetPass);
employeeRouter.post("/forgetpassword/:id/:token",forgetPasswordVal,
employee.forgetPasswordReset);

module.exports = employeeRouter;