const express = require("express")
const auth = require("./app.auth/app.auth.controller")
const db = require("./app.db/app.db.controller")

const router = express.Router()

router.use("/auth",auth)
router.use("/db",db)
router.use(express.json());

module.exports = router