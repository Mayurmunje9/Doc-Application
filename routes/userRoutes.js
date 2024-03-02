const express =require("express");
const { loginControl, registerControl } = require("../controllers/userControl");

//Router object
const router=express.Router();


//Routes 

//LOGIN || POST
router.post('/login',loginControl);


//REGISTER || POST
router.post('/register',registerControl)
 
module.exports=router;