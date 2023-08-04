const mongoose = require("mongoose");

const empTimeSheetSchema = new mongoose.Schema({
    empClockIn: {
        type: String,
        require: true,
    },
    empClockOut: {
        type: String,
        require: true,
    },
    empClockInIp: {
        type: String,
        require: true,
    },
    empHoursLogged: {
        type: Number,
        require: true,
        default: 0,
    },
    empWorkingFrom: {
        type: String,
        require: true,
    },
    empTotalWorkingDays: {
        type: Number,
        require: true,
        default: 0,
    },
    empDaysPresent: {
        type: Number,
        require: true,
    },
    empDaysAbsent: {
        type: Number,
        require: true,
    },
    empDaysLate: {
        type: Number,
        require: true,
    },
    empHalfDays: {
        type: Number,
        require: true,
    },
    empHolidays: {
        type: Number,
        require: true,
    },
    empStatus: {
        type: String,
        require: true,
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
