const express = require('express')
const service = require("./app.db.service")
const utilities = require("../../utilities")
const router = express.Router()

router.use(utilities.userMiddlewere)
router.post("/createQuery",service.createQuery)
router.post("/createDocument",service.createDocument)
router.post("/makeDocumentFull",service.makeDocumentFull)
router.delete("/removeElement",service.removeElement)
router.get("/readElement",service.readAllElement)

module.exports = router