const {verify} = require('jsonwebtoken')
const validateToken=(req,res,next)=>{
    const accessToken=req.header("jwtToken")
    if(!accessToken) return res.json({error: "user not logged in"})

    try {
        const validToken=verify(accessToken,"jwtToken")
        req.user=validToken
        if(validToken){
            return next();
        }
    } catch (error) {
        return res.json({error:error})
    }
} 

module.exports ={validateToken}