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

const validateEmail = (email,) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


module.exports = {userMiddlewere,validateEmail}