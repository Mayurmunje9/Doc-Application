const express = require("express");
const { loginControl, registerControl, authController, applyDoctorController, getNotificationsController, deleteNotificationController,getAllDoctorsController ,bookAppointmentController } = require("../controllers/userControl");
const authMiddlewares = require("../middlewares/authMiddlewares");

//Router object
const router = express.Router();

//Routes 

//LOGIN || POST
router.post('/login', loginControl);

//REGISTER || POST
router.post('/register', registerControl);

//AUTH || POST
router.post('/getUserDetails', authMiddlewares, authController);
 
//ApplyDoctor || POST
router.post('/applyDoctor', authMiddlewares, applyDoctorController);

//Notifications || POST
router.post('/getNotifications', authMiddlewares, getNotificationsController);

//Delete Notifications || POST
router.post('/deleteNotifications', authMiddlewares, deleteNotificationController);

//GET ALL Doctors ||GET
router.get('/getAllDoctors',authMiddlewares,getAllDoctorsController)

//Book Appointment
router.post('/book-appointment',authMiddlewares,bookAppointmentController)

module.exports = router;
 