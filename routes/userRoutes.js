const express =require("express");
const { loginControl, registerControl,authController,applyDoctorController,getNotificationsController } = require("../controllers/userControl");
const authMiddlewares = require("../middlewares/authMiddlewares");

//Router object
const router=express.Router();


//Routes 

//LOGIN || POST
router.post('/login',loginControl);


//REGISTER || POST
router.post('/register',registerControl)

//AUTH || POST
router.post('/getUserDetails',authMiddlewares,authController)
 
//ApplyDoctor || POST
router.post('/applyDoctor',authMiddlewares,applyDoctorController)

//Notifications || POST
router.post('/getNotifications',authMiddlewares,getNotificationsController)

//Delete Notifications || POST
router.post('/deleteNotifications',authMiddlewares,deleteNotificationsController)
module.exports=router;