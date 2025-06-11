const express = require("express");
const { signUp, signIn } = require("./auth.service");

const auth = express.Router();

auth.post("/signup", signUp);
auth.post("/signin", signIn);

module.exports = auth

