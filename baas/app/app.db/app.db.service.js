const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

// document => document , querie => document ,queri=>querie, document=>querie,simple

const createQuery = async (req,res) => {
    try {
    const {parentId,name,apiKey} = req.body
   
    if (!apiKey){
        return res.status(400).json(
            {
                "status": "error",
                "msg" : "apiKey not givven"
            }
        )
    }
   
    if(parentId) {
        const parent = await prisma.databaseElemant.findUnique(
            {
                where : {
                    appId : apiKey,
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
    const {parentId,name, apiKey} = req.body
    if(parentId) {
        const parent = await prisma.databaseElemant.findUnique(
            {
                where : {
                    appId : apiKey,
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

const makeDocumentFull = async (req, res) => {
    const { parentId, data,apiKey } = req.body;

    const VALID_TYPES = ["Int", "Bool", "String", "Float"];

  // Validate input
    if (!parentId) {
        return res.status(400).json({ status: "error", msg: "Parent ID is required" });
    }

    if (!data || typeof data !== "object" || Array.isArray(data)) {
        return res.status(400).json({ status: "error", msg: "Data must be an object" });
    }

  // Check if parent exists and is a Document
    const parent = await prisma.databaseElemant.findUnique({ where: { id: parentId } });

    if (!parent) {
        return res.status(400).json({ status: "error", msg: "Parent element not found" });
    }

    if (parent.type !== "Document") {
        return res.status(400).json({ status: "error", msg: "Parent must be a Document" });
    }

  // Validate data types
    for (const [fieldName, [, type]] of Object.entries(data)) {
        if (!VALID_TYPES.includes(type)) {
            return res.status(400).json({
                status: "error",
                msg: `Invalid type "${type}" for field "${fieldName}"`,
            });
        }
    }

  // Insert each field
    for (const [fieldName, [value, type]] of Object.entries(data)) {
        let elementData = {
        parentId,
        type,
        name: fieldName,
    };

    if (type === "Int") {
        const int = await prisma.integer.create({ data: { value } });
        elementData.intId = int.id;
    } else if (type === "Float") {
        const float = await prisma.floate.create({ data: { value } });
        elementData.floatId = float.id;
    } else if (type === "String") {
        const str = await prisma.str.create({ data: { value } });
        elementData.strId = str.id;
    } else if (type === "Bool") {
        const bool = await prisma.bool.create({ data: { value } });
        elementData.boolId = bool.id;
    }

        await prisma.databaseElemant.create({ data: elementData });
    }

    return res.status(200).json({ status: "done" });
};

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

const readAllElement = async (req, res) => {
    try {
        const { apiKey, id } = req.body;
        if (!apiKey) {
            return res.status(400).json({ status: "error", message: "Missing apiKey" });
        }

    // Recursive function
        const show = async (parentId) => {
        const children = await prisma.databaseElemant.findMany({
            where: { parentId: parentId,appId :apiKey },
        });

        const result = [];

        for (const item of children) {
            if (item.type === "Document" || item.type === "Query") {
                const childNode = {
                type: item.type,
                name: item.name,
                children: await show(item.id) // recurse!
            };
            result.push(childNode);
        } else {
            let value = null;

            if (item.type === "Bool") {
                const v = await prisma.bool.findUnique({ where: { id: item.id } });
                value = v?.value;
            } else if (item.type === "Float") {
                const v = await prisma.floate.findUnique({ where: { id: item.id } });
                value = v?.value;
            } else if (item.type === "Int") {
                const v = await prisma.integer.findUnique({ where: { id: item.id } });
                value = v?.value;
            } else if (item.type === "String") {
                const v = await prisma.str.findUnique({ where: { id: item.id } });
                value = v?.value;
            }

            result.push({
                id: item.id,
                type: item.type,
                value
            });
        }
    }

    return result;
    };

    const tree = {
        children: await show(id || null)
    };
        return res.status(200).json(tree);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: "server error", error: e.message });
    }
};

module.exports = {createDocument,createQuery,makeDocumentFull,removeElement,readAllElement}