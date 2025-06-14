const express = require("express")
const auth = require("./auth/auth.controller")
const app = require("./app/app.controller")
const router = express.Router()

router.use("/auth", auth)
router.use("/app",app)

module.exports = router


