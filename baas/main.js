const express = require("express")
const user = require("./user/user.controller")


const app = express()
app.use(express.json());

app.use("/user", user)


app.listen(
    3000
    , () => {
        console.log("running")
    }
)