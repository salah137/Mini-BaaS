const {PrismaClient} = require("@prisma/client")
const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const prisma = new PrismaClient()
const utility = require("../../utilities")
const { v4: uuidv4 } = require('uuid');


const signUp = async (req,res)=>{
    try{
    const {apiKey,email,password} = req.body

    if (!apiKey || !email || !password || !utility.validateEmail(email)){
        return res.status(400).json(
            {
                "status" : "error",
                "msg": "inputs not enough"
            }
        )
    }

    const app = await prisma.app.findUnique(
        {
            where : {
                apikey : apiKey
            }
        }
    )

    if (app){
        const appUser = await prisma.appUser.findUnique(
            {
                where : {
                    email : email
                }
            }
        ) 

        if (appUser){
            return res.status(400).json(
                {
                    "status" : "error",
                    "msg" : "already used email"
                }
            )
        } else {
            const hashed = await argon2.hash(password)
            const uuid = uuidv4()
            const user = await prisma.appUser.create(
                {
                    data : {
                        email: email,
                        password: hashed,
                        uuid : uuid,
                        appId : app.id
                    }
                }
            )

            const token =  jwt.sign({
                email,
                apiKey,
            },process.env.JWT
        )
        return res.status(200).json(
            {
                "status" :"done",
                "token" : token
            }
        )
        }
    } else {
        return res.status(400).json(
            {
                "status" : "error",
                "msg": "no app found"
            }
        )
    }
} catch(e) {
    console.log(e);
    return res.status(500).json(
        {
            "status" : "error",
            "msg" : "server error"
        }
    )
    
}
}

const signIn =async (res,req)=>{
    console.log(req.body);
    

    const {apiKey,email,password} = req.body

        if (!apiKey || !email || !password || !utility.validateEmail(email)){
        return res.status(400).json(
            {
                "status" : "error",
                "msg": "inputs not enough"
            }
        )
    }

        const app = await prisma.app.findUnique(
        {
            where : {
                apikey : apiKey
            }
        }
    )

        if (app){
        const appUser = await prisma.appUser.findUnique(
            {
                where : {
                    email : email
                }
            }
        ) 

        if (appUser){
            if (argon2.verify(appUser.passwprd,password)){
                            const token =  jwt.sign({
                email,
                apiKey,
            },process.env.JWT
        )
        return res.status(200).json(
            {
                "status" :"done",
                "token" : token
            }
        )

            } else {
                return res.status(400).json(
                    {
                        "status" : "error",
                        "msg" : "wrong password"
                    }
                )
            }
        }else {
            return res.status(400).json(
                {
                    "statue" : "error",
                    "msg" : "email already used"
                }
            )
        }
    }

}
module.exports = {signUp,signIn}