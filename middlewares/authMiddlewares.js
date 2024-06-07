const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1];
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
              console.log(error)
            return res.status(201).send({ success: false, message: "Aurh Failed" });
          } else {
            req.body.userId = decode.id;
            next();
          }
    });
    }catch(error){
        console.log(error);
        res.status(401).send({success:false,message:"Auth Failed"})
    }
};
