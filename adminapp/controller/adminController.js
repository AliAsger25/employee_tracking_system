const logger = require("../../utils/adminLogger");
const empSchema = require("../../model/employeeSchema");
const timeSheetSchema = require("../../model/empTimeSheetSchema");
const empLeaveSchema = require("../../model/empLeaveSchema");
const { mailOptions } = require("../../services/sendMail");

module.exports = {
    empAttendence: async (req, res) => {
        try {
            const today = new Date();
            const startOfDay = new Date(today);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(today);
            endOfDay.setHours(23, 59, 59, 999);
            const empData = await timeSheetSchema
                .find({
                    createdAt: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    },
                },
                    { _id: 0, empClockIn: 1, empClockOut: 1 }
                )
                .populate({ path: "empId", select: "empName " })
            logger.log("info", "Employee data found successfully")
            return res.status(200).json({
                success: true,
                message: "Employee data found successfully",
                empData: empData
            });
        } catch (err) {
            console.error("Error:", err);
            logger.log("error", `${err.message}`);
            res.status(500).json({
                success: false,
                message: `Error: ${err.message}`
            });
        }
    },

    empLeavePermit: async (req, res) => {
        try {
            const leaveSheetId = req.params.id;
            const { status, message } = req.body;
            const leaveData = await empLeaveSchema.findById(leaveSheetId);
            if (leaveData.leaveType === "Casual Leave" || leaveData.leaveType === "Sick Leave") {
                const empData = await empSchema.findById(leaveData.empId);
                const subject = status === "Accepted" ? "Leave approved" : "Leave rejected";
                const empEmail = empData.empEmail;
                await mailOptions(empEmail, subject, status, message);
                if (status === "Accepted") {
                    if (leaveData.leaveType === 'Casual Leave') {
                        leaveData.status = status
                        leaveData.message = message
                        leaveData.casualLeave = leaveData.casualLeave - 1
                        leaveData.save()
                    }
                    else {
                        leaveData.sickLeave = leaveData.sickLeave - 1
                        leaveData.save()
                    }
                    leaveData.status = status
                    leaveData.message = message
                    logger.log('info', "Leave approved")
                    return res.status(200).json({
                        success: true,
                        message: "Leave approved."
                    });
                } else {
                    logger.log('info', "Leave rejected")
                    res.status(403).json({
                        success: true,
                        message: "Leave rejected."
                    });
                }
            }   
            leaveData.status = status;
            leaveData.message = message;
            await leaveData.save();
        } catch (error) {
            adminLogger.log('error', "error!")
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

}
