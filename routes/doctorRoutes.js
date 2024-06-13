const express=require('express')
const authMiddleWares=require('../middlewares/authMiddlewares')
const { getDoctorInfoController,updateDocProfile,getDoctorById ,docAppointmentsController,appointmentStatusController} = require('../controllers/doctorControllers')
const router=express.Router()
//Post || SINGLE DOC INFO
router.post('/getDoctorInfo',authMiddleWares,getDoctorInfoController)

//POST || UPDATE DOC PROFILE
router.post('/updateDocProfile',authMiddleWares,updateDocProfile)

//Post || SINGLE DOC FOR APPOINTMENT PAGE
router.post('/getDoctorById',authMiddleWares,getDoctorById)

//GET || GET APPOINTMENTS
router.get('/docAppointments',authMiddleWares,docAppointmentsController)

//POST || APPOINTMENT STATUS
router.post('/appointmentStatus',authMiddleWares,appointmentStatusController)
module.exports=router