const { PrismaClient } = require("@prisma/client");
const argon = require("argon2");
const prisma = new PrismaClient()
const jwt = require("jsonwebtoken")

const validateEmail = (email,) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const signUp = async (req, res) => {
    try {
        console.log(req.body);
        
        const email = req.body.email
        const password = req.body.password
        const name = req.body.name

        if (!email || !validateEmail(email)) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no email given"
                }
            )
        }

        if (!password) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no password given"
                }
            )

        }

        if (!name) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no name given"
                }
            )
        }

        const search = await prisma.user.findUnique(
            {
                where: { email }
            }
        )

        if (search) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "email already used"
                }
            )
        }

        const hashed = await argon.hash(password)

        await prisma.user.create(
            {
                data: {
                    name: name,
                    password: hashed,
                    email: email
                }
            }
        )

        const token = jwt.sign(email, process.env.JWT)

        return res.status(200).json(
            {
                "status": "done",
                "token": token
            }
        )
    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({ status: "error", msg: "Server error" });

    }

}

const signIn = async (data, res) => {
    try {
        const email = data.body.email
        const password = data.body.password

        if (!email || !validateEmail(email)) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no email given"
                }
            )
        }

        if (!password) {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no password given"
                }
            )

        }

        const search = await prisma.user.findUnique(
            {
                where: { email }
            }
        )

        if (search) {
            if (await argon.verify(search.password, password)) {
                const token = jwt.sign(email, process.env.JWT)

                return res.status(200).json(
                    {
                        "status": "done",
                        "token": token
                    }
                )

            } else {

                return res.status(400).json(
                    {
                        "status": "error",
                        "msg": "invalid password"
                    }
                )
            }


        } else {
            return res.status(400).json(
                {
                    "status": "error",
                    "msg": "no user found"
                }
            )
        }
    } catch (e) {
        console.error("Signin error:", e);
        return res.status(500).json({ status: "error", msg: "Server error" });

    }

}


module.exports = { signUp, signIn }