const { PrismaClient } =require("@prisma/client")
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient()

const createApp =async (req,res)=>{
    try {
    const {name,id} = req.body

    if(!name || ! id) {
        return res.status(400).json(
            {
                "status" : "error",
                "msg" : "parametrs are not enough (name and id)"
            }
        )
    }
    const app = await prisma.app.findUnique(
        {
            where : {
                appName : name,
                ownrId : id
            }
        }
    )

    if (app){
        return await res.status(400).json(
            {
                "status" : "error",
                "msg" : "already used name"
            }
        )
    }

    const apiKey = uuidv4()
    

    await prisma.app.create(
        {
            data : {
                ownrId : id,
                apikey : apiKey,
                appName : name
            }
        }
    )

    return res.status(200).json(
            {
            "status" : "done",
            "apiKey" : apiKey
            }
        )
    }catch(e){
        console.log(e);
        return res.status(500).json(
            {
            "status" : "server error",
            }
        )
    }
}

const deleteApp = async (req,res)=>{
    try{
        const { apikey, id } = req.body
        await prisma.app.delete(
            {
                where : {
                    apikey : apikey,
                    ownrId : id,
                }
            }
        )

        return res.status(200).json(
            {
                "status" : "done"
            }
        )

    } catch(e) {
        console.log(e);
        return res.status(500).json(
            {
            "status" : "server error",
            }
        )
    }
}

const getAllApps =async (req,res)=>{
    try{
        const {id} = req.body

        if (!id){
            return res.status(400).json(
                {
                    "status" : "error",
                    "msg": "id not given"
                }
            )
        }

        const apps = await prisma.app.findMany(
            {
                where : {
                    ownrId : id
                }
            }
        )

        return res.status(200).json(
            apps
        )
    } catch(e) {
        console.log(e);
        return res.status(500).json(
            {
            "status" : "server error",
            }
        )
    }
}

module.exports = {
    createApp,
    deleteApp,
    getAllApps

}