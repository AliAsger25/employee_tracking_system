const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
    transports: [
        new transports.File({
            filename: "logs/employee/timeSheetLog_info.log",
            level: "info",
            maxsize: 5242880,
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(info => `level : ${info.level}:${[info.timestamp]} : ${info.message}`),
            ),
        }),
        new transports.File({
            filename: "logs/employee/timeSheetLog_error.log",
            level: "error",
            maxsize: 5242880,
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf(error => `level : ${error.level}:${[error.timestamp]} : ${error.message}`),
            ),
        }),
    ],
})

module.exports = logger;
