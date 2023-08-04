const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empName: {
        type: String,
        require: true,
    },
    empEmail: {
        type: String,
        require: true,
    },
    empPassword:{
        type: String,
       require: true,
    },
    empCity:{
        type: String,
        require: true,
    },
    empAddress:{
        type: String,
        require: true,
        default: "",
    },
    empPhoneNo:{
        type: Number,
        require: true,
    },
    empGender:{
        type: String,
        require: true,
    },
    empProfilePic:{
        type: String,
    },
    empWorkingStatus:{
        type: String,
        require: true,
        default : "Working",
    },
    empTechnologies:{
        type: String,
        require: true,
    },
    empRole: {
        type: String,
        require: true,
        default : "Employee"
    },
    isActive: {
        type: Boolean,
        require: true,
      },
})
employeeSchema.set("timestamps", true);

module.exports = mongoose.model('employee',employeeSchema);