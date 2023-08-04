let express = require("express")
let empRouter = require("./employeeRoutes")

let commonRouter = express.Router();

commonRouter.use("/employee", empRouter)

module.exports = commonRouter