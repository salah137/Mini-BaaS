const express = require("express")
const auth = require('./app.auth.service')

const router = express.Router()

router.post("/auth/signup",auth.signUp)
router.post("/auth/signin",auth.signIn)

module.exports = auth

