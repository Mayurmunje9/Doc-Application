const express=require('express')
const authMiddleWares=require('../middlewares/authMiddlewares')
const { getDoctorInfoController,updateDocProfile } = require('../controllers/doctorControllers')
const router=express.Router()
//Post || SINGLE DOC INFO
router.post('/getDoctorInfo',authMiddleWares,getDoctorInfoController)

//POST || UPDATE DOC PROFILE
router.post('/updateDocProfile',authMiddleWares,updateDocProfile)
module.exports=router