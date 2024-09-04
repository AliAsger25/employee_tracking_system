let empSchema = require("../../model/employeeSchema");
let logger = require("../../utils/benchLogger");

module.exports = {
    empBenchList : async (req,res) =>{
      try{
        const empList = await empSchema.find(
         { empRole : "Employee"},
         {_id : 0 , empName : 1, empEmail : 1, empWorkingStatus : 1, updatedAt : 1}
        );
        const empCount = await empSchema.find(
          { empRole : "Employee"}
         ).count();
         logger.log("info", "Employees found successfully");
         res.status(200).json({
            success : true,
            count : empCount,
            empList : empList,
        })
      }catch(err){
        logger.log("error", `${err.message}`);
        res.status(500).json({
            success : false,
            message : `Error : ${err.message}`
        })
      }
    },

    updateStatus : async (req,res) =>{
      let { empEmail , empWorkingStatus} = req.body;
      try{
       const empUpdate = await empSchema.findOneAndUpdate(
        {empEmail : empEmail},
        {empWorkingStatus : empWorkingStatus},
        {new :true}
       )
       logger.log("info", "Status updated successfully");
       res.status(200).json({
        success : true,
        message : "Status updated successfully",
        empData : empUpdate
       })
      }catch(err){
        logger.log("error", `${err.message}`);
        res.status(500).json({
            success : false,
            message : `Error : ${err.message}`
        })
      }
    },

    searchEmployee: async (req, res) => {
      try {
          let { letter } = req.params;
          const empData = await empSchema.aggregate([
              {
                  $match: {
                      empRole: "Employee",
                      $or: [
                          { empName: { $regex: `^${letter}`, $options: "i" } },
                          { empEmail: { $regex: `^${letter}`, $options: "i" } },
                      ],
                  },
              },
              {
                  $project: {
                      _id: 0,
                      empName: 1,
                      empEmail: 1,
                      empWorkingStatus: 1,
                      updatedAt: 1,
                  },
              },
          ]);
          if (empData.length > 0) {
              logger.log("info", "Employee found successfully");
              res.status(200).json({
                  success: true,
                  message: "Employees found successfully.",
                  empData: empData,
              });
          } else {
              logger.log("error", "Employee not found");
              res.status(400).json({
                  success: false,
                  message: "No employee found",
              });
          }
      } catch (error) {
          logger.log("error", `${error.message}`);
          res.status(500).json({
              success: false,
              error: error.message,
          });
      }
  },
}
