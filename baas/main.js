const express = require("express")
const user = require("./user/user.controller")
const apps = require("./app/app.controller")

const app = express()
app.use(express.json());

app.use("/user", user)
app.use("/app", apps)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(
    3000
    , () => {
        console.log("running")
    }
)