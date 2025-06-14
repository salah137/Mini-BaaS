const express = require("express")
const utility = require("../../utilities")
const {createApp, deleteApp, getAllApps} = require("./app.service")

const router = express.Router()

router.post("/createApp",createApp)

router.delete("/deleteApp",deleteApp)

router.get("/getApps",getAllApps)

router.use(utility.userMiddlewere)

module.exports = router