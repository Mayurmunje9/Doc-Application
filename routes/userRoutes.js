const express =require("express");
const { loginControl, registerControl,authController,applyDoctorController } = require("../controllers/userControl");
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
module.exports=router;