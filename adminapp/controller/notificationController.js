let noticeSchema = require("../../model/empNotificationSchema");
let empSchema = require("../../model/employeeSchema");
let logger = require("../../utils/noticelogger")

module.exports = {
    createNotice: async (req, res) => {
        const empId = req.params.id;
        const notificationData = new noticeSchema(req.body);
        try {
          notificationData.empId = empId;
          await notificationData.save();
          logger.log("info", "Notification created");
          res.status(201).json({
            success: true,
            message: "Notification created",
            notification: notificationData,
          });
        } catch (error) {
          logger.log("error", error.message);
          res.status(500).json({
            success: false,
            message: error.message,
          });
        }
      },

    updateNotice: async (req, res) => {
        let id = req.params.id;
        try {
            const { noticeTitle, noticeMessage } = req.body;
            const empData = await noticeSchema.findByIdAndUpdate(
                id,
                {
                    noticeTitle: noticeTitle,
                    noticeMessage: noticeMessage
                },
                { new: true }
            )
            if(empData){
            logger.log("info", "Notice updated successfully");
            res.status(200).json({
                success: true,
                message: "Notice updated successfully",
                notice: empData
            })
        }else{
            logger.log("error", `Notice not found`);
            res.status(404).json({
                success: false,
                message: `Notice not found`
            })
        }
        } catch (err) {
            logger.log("error", `${err.message}`);
            res.status(500).json({
                success: false,
                message: `Error : ${err.message}`
            })
        }
    },

    deleteNotice: async (req, res) => {
        try {
            const noticeData = await noticeSchema.findByIdAndDelete(req.params.id);
            if (noticeData) {
                logger.log("info","Notice deleted sucessfully")
                res.status(202).send({
                    success: true,
                    message: "Notice deleted sucessfully",
                    deleteNotice: noticeData,
                });
            } else {
                logger.log("error","Notice not found")
                res.status(404).send({
                    success: false,
                    message: "Notice not found"
                });
            }
        } catch (error) {
            logger.log("error", `${error.message}`);
            res.status(500).send({
                success: false,
                message: `Error occur ${error.message}`
            });
        }
    },
}
