
import jwt from "jsonwebtoken"

const protectRoute = async (req,res,next) =>{
    try {
        console.log("cookies",req.cookies)
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized no token acces"})
        }

        const decoded = jwt.verify(token, "SECRET-KEY")
        if (!decoded){
            return res.status(401).json({error:"Unauthorized no token acces"})
        }

    
        next()
        
        
    } catch (error) {
        console.log("error while protecting Route",error.message)
        return res.status(500).json({error:"internal server errorrrrr"})
        
    }

}


export default protectRoute