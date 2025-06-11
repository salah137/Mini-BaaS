const jwt = require("jsonwebtoken")

const userMiddlewere = (req,res,next)=>{
    try{
    jwt.verify(req.headers["Authorazition"],process.env.JWT, { algorithms: ['RS256'] })
    next()
} catch(e){
    return res.status(400).json(
        {
            "status" : "error",
            "msg" : "ayth needed"        
        }
    )
}
}

module.exports = {userMiddlewere}