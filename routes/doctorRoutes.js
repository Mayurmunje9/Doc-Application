const express=require('express')
const authMiddleWares=require('../middlewares/authMiddlewares')
const { getDoctorInfoController,updateDocProfile,getDoctorById } = require('../controllers/doctorControllers')
const router=express.Router()
//Post || SINGLE DOC INFO
router.post('/getDoctorInfo',authMiddleWares,getDoctorInfoController)

//POST || UPDATE DOC PROFILE
router.post('/updateDocProfile',authMiddleWares,updateDocProfile)

//Post || SINGLE DOC FOR APPOINTMENT PAGE
router.post('/getDoctorById',authMiddleWares,getDoctorById)
module.exports=router