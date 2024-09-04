const express = require('express');
const bench = require("../controller/benchController");

let benchRouter = express.Router();

benchRouter.post("/list", bench.empBenchList);
benchRouter.patch("/update", bench.updateStatus);
benchRouter.post("/searchemployee/:letter", bench.searchEmployee);

module.exports = benchRouter;
