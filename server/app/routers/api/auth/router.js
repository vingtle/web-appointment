const express = require("express");
const authActions = require("../../../controllers/authActions");
const router = express.Router();

// Signup endpoint
router.post("/signup", authActions.signup);

module.exports = router;
