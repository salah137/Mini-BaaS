const express = require("express")
const auth = require("./app.auth/app.auth.controller")

const router = express.Router()

router.use("auth",auth)

module.exports = router