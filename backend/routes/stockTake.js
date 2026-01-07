const express = require("express")
const { 
    createStockTake,  // <-- correct function name
    getStockTakes 
} = require("../controllers/stockTakeController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()
router.use(requireAuth)
router.get("/", getStockTakes)
router.post("/", createStockTake)  // <-- fixed
module.exports = router
