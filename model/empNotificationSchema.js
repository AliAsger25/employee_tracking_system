const mongoose = require('mongoose');

const empNotification = new mongoose.Schema({
    notificationTitle: {
        type: String,
        require: true,
    },
    notificationMessage: {
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
    }
});
empNotification.set("timestamps", true);

module.exports = mongoose.model("notification", empNotification)
