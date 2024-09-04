const mongoose = require("mongoose");

const empTimeSheetSchema = new mongoose.Schema({
    empClockIn: {
        type: String,
        default: "",
    },
    empClockOut: {
        type: String,
        require: true,
        default: ""
    },
    empClockInIp: {
        type: String,
        default: "",
    },
    empHoursLogged: {
        type: Number,
        default: 0,
    },
    empWorkingFrom: {
        type: String,
        default: "Office",
    },
    empTotalWorkingDays: {
        type: Number,
        default: 0,
    },
    empDaysPresent: {
        type: Number,
        default: "",
    },
    empDaysAbsent: {
        type: Number,
        default: "",
    },
    empDaysLate: {
        type: String,
        default: "0",
    },
    empHalfDays: {
        type: Number,
        default: "",
    },
    empHolidays: {
        type: Number,
        default: "",
    },
    empStatus: {
        type: String,
        default: "Absent",
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        require: true,
    },
    isActive: {
        type: Boolean,
        require: true,
    },
});
empTimeSheetSchema.set("timestamps", true);

module.exports = mongoose.model("timeSheet", empTimeSheetSchema);
