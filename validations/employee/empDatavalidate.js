const empValSchema = require("../employee/empValSchema");

module.exports ={
    registerEmployeeVal :async (req,res,next) =>{
        const value = await empValSchema.registerEmployee.validate(req.body, {abortEarly : false})
        if(value.error){
            res.status(500).json({
                success : false,
                message : value.error.details[0].message
                        })
        }else{
            next()
        }
    },

    loginEmployeeVal :async (req,res,next) =>{
        const value = await empValSchema.employeeLogin.validate(req.body, {abortEarly : false})
        if(value.error){
            res.status(500).json({
                success : false,
                message : value.error.details[0].message
                        })
        }else{
            next()
        }
    },

    forgetPasswordVal : async (req,res,next) =>{
        const value = await empValSchema.forgetPassword.validate(req.body , {abortEarly : false})
        if(value.error){
            res.status(500).json({
                success : false,
                message : value.error.details[0].message
                        })
        }else{
            next()
        }
    }
}