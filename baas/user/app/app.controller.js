const express = require("express")
const utility = require("../../utilities")
const {createApp, deleteApp, getAllApps} = require("./app.service")

const router = express.Router()

router.use(utility.userMiddlewere)

router.post("/createApp",createApp)

router.delete("/deleteApp",deleteApp)

router.get("/getApps",getAllApps)


module.exports = router