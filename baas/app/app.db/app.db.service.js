const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

// document => document , querie => document ,queri=>querie, document=>querie,simple

const createQuery = async (req,res) => {
    try {
    const {parentId,name} = req.body
    if(parentId) {
        const parent = await prisma.databaseElemant.findUnique(
            {
                where : {
                    id : parentId
                }
            }
        )

        if (!parent){
            return res.status(400).json(
                {
                    "status": "error",
                    "msg" : "parent element not found"
                }
            )
        }

        if (!(parent.type == "Document" || parent.type == "Query" )){
            return res.status(400).json(
                {
                    "status" : "error",
                    "msg" : "parent element cant have a child (not a query or a document)"
                }
            )
        }
        const query  = await prisma.query.create()
        
        const newQuey =await prisma.databaseElemant.create(
            {
                data : {
                    name : name,
                    type: "Query",
                    queryId : query.id
                }
            }
        )

        return res.status(200).json(
            {
                "status": "done",
                "query Id" : newQuey.id
            }
        )
    } else {
        const query  = await prisma.query.create()
        
        const newQuey =await prisma.databaseElemant.create(
            {
                data : {
                    name : name,
                    type: "Query",
                    queryId : query.id
                }
            }
        )

        return res.status(200).json(
            {
                "status": "done",
                "query Id" : newQuey.id
            })
    } }catch(e){
    console.log(e);
    return res.status(500).json(
        {
            "status" : "server error"
        }
    )
    
}
}
const createDocument = async (req,res) => {
    try{
    const {parentId,name} = req.body
    if(parentId) {
        const parent = await prisma.databaseElemant.findUnique(
            {
                where : {
                    id : parentId
                }
            }
        )

        if (!parent){
            return res.status(400).json(
                {
                    "status": "error",
                    "msg" : "parent element not found"
                }
            )
        }

        if (!(parent.type == "Document" || parent.type == "Query" )){
            return res.status(400).json(
                {
                    "status" : "error",
                    "msg" : "parent element cant have a child (not a query or a document)"
                }
            )
        }
        const document  = await prisma.document.create()
        
        const newDoc =await prisma.databaseElemant.create(
            {
                data : {
                    name : name,
                    type: "Document",
                    queryId : document.id
                }
            }
        )

        return res.status(200).json(
            {
                "status": "done",
                "document Id" : newDoc.id
            }
        )
    } else {
        const query  = await prisma.document.create()
        
        const newDoc =await prisma.databaseElemant.create(
            {
                data : {
                    name : name,
                    type: "Document",
                    queryId : query.id
                }
            }
        )

        return res.status(200).json(
            {
                "status": "done",
                "document Id" : newDoc.id
            })
    }
}catch(e){
        console.log(e);
        return res.status(500).json(
            {
                "status" : "server error"
            }
        )
    }
}

const makeDocumentFull = async (req,res)=>{
    const {parentId,data} = req.body
    const types = [
        "Int",
        "Bool",
        "String",
        "Float"
    ]

    if(!parentId)  {
        return res.status(400).json(
            {
                "status" :"error",
                "msg" : "parent id should be given"
            }
        )
    }

    if(!data){
        return res.status(400).json(
            {
                "status":"error",
                "msg" : "no data given"
            }
        )
    }

    const keys = Object.keys(data)

    let valid = true 

    keys.forEach(
        (e,i)=>{
            if (!(data[e][1] in types)) {
                valid = false
                return
            }
        }
    )

    if (!valid){
        return res.status(200).json(
            {
                "status" : "error",
                "msg" : "invalid data"
            }
        )
    }
    const parent = await prisma.databaseElemant.findUnique(
        {
            where : {
                id :parentId,

            }
        }
    )

    if (!parent){
        return res.status(400).json(
            {
                "status":"error",
                "msg" : "parent element not found"
            }
        )
    }

    if(parent.type != "Document"){
        return res.status(400).json(
            {
                "status":"error",
                "msg" : "parent element should be a document"
            }
        )
    }

    for(let i = 0; i<keys.length ;i++){
        if (data[i][1] == "Int"){
            const Int = await prisma.integer.create(
                {
                    data : {
                        value : data[i][0]
                    }
                }
            )

            const element = await prisma.databaseElemant.create(
                {
                    data : {
                        parentId : parentId,
                        intId: Int.id,
                        type : "Int"
                    }
                }
            )

    
        }else if (data[i][1] == "Float"){
            const float = await prisma.floate.create(
                {
                    data : {
                        value : data[i][0]
                    }
                }
            )

            const element = await prisma.databaseElemant.create(
                {
                    data : {
                        parentId : parentId,
                        intId: float.id,
                        type : "Float"
                    }
                }
            )

        }else if (data[i][1] == "String"){
            const string = await prisma.str.create(
                {
                    data : {
                        value : data[i][0]
                    }
                }
            )

            const element = await prisma.databaseElemant.create(
                {
                    data : {
                        parentId : parentId,
                        intId: string.id,
                        type : "Int"
                    }
                }
            )

            
        }else if (data[i][1] == "Bool"){
            const bool = await prisma.bool.create(
                {
                    data : {
                        value : data[i][0]
                    }
                }
            )

            const element = await prisma.databaseElemant.create(
                {
                    data : {
                        parentId : parentId,
                        intId: bool.id,
                        type : "Int"
                    }
                }
            )
    
        }

    }
    return res.status(200).json(
        {
            "status" : "done"
        }
    )
}

const removeElement = async(req,res)=>{
    try{
        const {id,apikey} = req.body
        if (!id || !apikey){
            return res.status(400).json(
                {
                    "status" : "error",
                    "msg":"id or apikey not found"
                }
            )
        }
        if(await prisma.app.findUnique(
            {
                where: {
                    apikey :apikey
                }
            }
        )) {
        const remove =async ({id})=>{
            const element =await prisma.databaseElemant.findUnique(
                {
                    where : {
                        id,
                        appId : apikey
                    },
                    include: { children: true },

                }
            )

            const children = element.children

            await prisma.databaseElemant.delete(
                {
                    where : {
                        id : element.id
                    }
                }
            )
            if (children.length>0){
                for (let i  =0;i<children.length; i++) {
                    remove(children[i].id)
                }
            } else {
                    return 
                }
            }
        }
    }catch(e){
        console.log(e);
        return res.status(500).json(
            {
                "status" : "server error"
            }
        )
    } 
}