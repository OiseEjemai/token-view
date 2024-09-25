const express = require("express")
const { protectRoute } = require("../middleware/protectRoute.js")
const { getUserProfile, updateUser, saveSearches, getSearches } = require("../controllers/userControllers.js")
const router = express.Router();

// router.get("/profile/:username", protectRoute, getUserProfile);
// router.post("/update", protectRoute, updateUser);
router.post('/save-searches', protectRoute, saveSearches)
router.get('/get-searches', protectRoute, getSearches);
// router.post('/place-order', protectRoute, placeOrder)

module.exports = router;
