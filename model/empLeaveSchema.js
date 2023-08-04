const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
    totalLeaves: {
        type: Number,
        require: true,
    },
    casualLeave: {
        type: Number,
        require: true,
        default: 0,
    },
    sickLeave: {
        type: Number,
        require: true,
        default: 0,
    },
    leaveType: {
        type: String,
        default: 'Casual Leave',
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: 'Pending',
    },
    message: {
        type: String,
        require: true,
    },
    empId:{
        type : mongoose.Types.ObjectId,
        ref : "employee",
        require: true,
    },
    isActive:{
        type :Boolean,
        require: true,
    }
});
empLeaveSchema.set("timestamps", true);

module.exports = mongoose.model("empLeave", empLeaveSchema)
