const employeeSchema = require("../model/employeeSchema");
const bcrypt = require('bcrypt');
const logger = require("../utils/empLogger")
const path = require("path");
const { transporter } = require("../services/sendMail");
const jwt = require("jsonwebtoken");
const authService = require("../services/authService");


module.exports = {
  createEmployee: async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const employeeData = new employeeSchema(req.body);
    try {
      let isEmployeeExist = await authService.isEmployeeExist(req.body.empEmail);
      if (isEmployeeExist) {
        logger.log("error", "Employee is already registered with this email!");
        res.status(409).json({
          success: false,
          message: "User already exists with the same email!!"
        })
      }
      else {
        if (employeeData.empGender === "Male") {
          const filePath = path.join(__dirname, '..', 'uploads/male.png')
          employeeData.empProfilePic = filePath;
        } else {
          const filePath = path.join(__dirname, '..', 'uploads/female.png')
          employeeData.empProfilePic = filePath;
        }
        employeeData.empPassword = await bcrypt.hash(req.body.empPassword, salt);
        const employee = await employeeData.save();
        logger.log("info", "Employee successfully registered.");
        res.status(201).json({
          success: true,
          message: "Employee successfully registered.",
          employee: employee,
        });
      }
    } catch (err) {
      res.status(500).json({
        sucess: false,
        message: `Error occured ${err.message}`
      });
    }
  },

  employeeLogin: async (req, res) => {
    const { empEmail, empPassword } = req.body;
    try {
      let { value, token } = await authService.validateEmployee(empEmail, empPassword);
      if (value) {
        logger.log("info", "Employee login successfull ");
        res.status(200).json({
          success: true,
          message: "Employee Login successfull.",
          accessToken: token
        })
      } else {
        logger.log("error", "Enter valid email or password!!")
        res.status(401).json({
          success: false,
          message: "Enter valid email or password",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  sendMailToResetPass: async (req, res) => {
    const { empEmail } = req.body;
    try {
      let { token, empData } = await authService.validateEmployee(empEmail);
      if (empData) {
        const link = `http://127.0.0.1:3000/user/reset-password/${empData._id}/${token}`;
        let info = await transporter.sendMail({
          from: "aliasger102002@gmail.com",
          to: empEmail,
          subject: "Email for user reset Password",
          html: `<a href=${link}>Click here to reset your password`,
        });
        logger.log("info", "Mail sent successfully");
        res.status(200).json({
          success: true,
          message: "Mail sent successfully.",
          accessToken: token,
          employeeId: empData._id
        })
      } else {
        logger.log("error", "Enter valid email!!")
        res.status(401).json({
          success: false,
          message: "Enter valid email.",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Error occur ${error.message}`,
      });
    }
  },

  forgetPasswordReset: async (req, res) => {
    const { id, token } = req.params;
    let { newPassword, confirmPassword } = req.body;
    try {
      const checkEmployee = await employeeSchema.findById(id);
      if (checkEmployee != null) {
        const secret = checkEmployee._id + process.env.SECRET_KEY;
        jwt.verify(token, secret);
        if (newPassword === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
          await employeeSchema.findByIdAndUpdate(checkEmployee._id, {
            $set: { empPassword: bcryptPassword },
          });
          logger.log("info", "Password updated successfully ")
          res.status(200).json({
            success: true,
            message: "Password updated successfully ✔",
          });
        } else {
          logger.log("error", "Password and confirm password do not match!!")
          res.status(400).json({
            success: false,
            error: "Password and confirm password do not match!!"
          });
        }
      } else {
        logger.log("error", "Employee not found!!")
        res.status(404).json({
          success: false,
          error: "Employee not found!!",
        });
      }
    } catch (err) {
      logger.log("error", err.message);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
}
