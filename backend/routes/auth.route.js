const express = require("express")
const { getMe, login, logout, signup } = require("../controllers/authControllers.js")
const { protectRoute } = require("../middleware/protectRoute.js")

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
 