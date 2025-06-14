const express = require("express")
const auth = require("./app.auth/app.auth.controller")

const router = express.Router()

router.use("app",auth)

module.exports = router