const nodemailer = require('nodemailer');

module.exports = {
transporter : nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "aliasger102002@gmail.com",
        pass: "kiplgmwjakimbghp",
    },
})
};
