const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
    totalLeaves: {
        type: Number,
        default : 22,
    },
    casualLeave: {
        type: Number,
        require: true,
        default: 10,
    },
    sickLeave: {
        type: Number,
        require: true,
        default: 10,
    },
    leaveType: {
        type: String,
        default: 'Casual Leave',
        require: true,
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    empStatus: {
        type: String,
        default: 'Pending',
    },
    message: {
        type: String,
        default: "",
    },
    empId: {
        type: mongoose.Types.ObjectId,
        ref: "employee",
        require: true,
    },
    isActive: {
        type: Boolean,
        require: true,
    }
});
empLeaveSchema.set("timestamps", true);

module.exports = mongoose.model("empLeave", empLeaveSchema)
