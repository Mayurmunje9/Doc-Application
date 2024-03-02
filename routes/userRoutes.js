const express =require("express");
const { loginControl, registerControl,authController } = require("../controllers/userControl");
const authMiddlewares = require("../middlewares/authMiddlewares");

//Router object
const router=express.Router();


//Routes 

//LOGIN || POST
router.post('/login',loginControl);


//REGISTER || POST
router.post('/register',registerControl)

router.post('/getUserDetails',authMiddlewares,authController)
 
module.exports=router;