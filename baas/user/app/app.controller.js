const express = require("express")
const {createApp, deleteApp, getAllApps} = require("./app.service")

const router = express.Router()

router.post("/createApp",createApp)

router.delete("/deleteApp",deleteApp)

router.get("/getApps",getAllApps)

router.use(userMiddlewere)

module.exports = router