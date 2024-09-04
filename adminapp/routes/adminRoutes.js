const express = require('express');
const admin = require("../controller/adminController");
const login = require("../../employee_app/controller/employeeController");
const { isAdmin } = require("../../middlewares/authUser");

let adminRouter = express.Router();

adminRouter.post("/login", isAdmin, login.employeeLogin);
adminRouter.get("/empattendance", admin.empAttendence);
adminRouter.patch("/leavestatus/:id",admin.empLeavePermit);

module.exports = adminRouter;
