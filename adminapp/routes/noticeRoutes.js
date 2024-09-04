const express = require("express");
const notice = require("../controller/notificationController")

const noticeRouter = express.Router();

noticeRouter.post("/createnotice/:id", notice.createNotice);
noticeRouter.patch("/updatenotice/:id", notice.updateNotice);
noticeRouter.delete("/deletenotice/:id", notice.deleteNotice);

module.exports = noticeRouter;
