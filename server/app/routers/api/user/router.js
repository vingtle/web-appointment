const express = require("express");

const router = express.Router();

const { add, browse, read } = require("../../../controllers/userActions");

const { login, refresh, logout } = require("../../../controllers/authActions");

const {
  hashPassword,
  verifyToken,
} = require("../../../controllers/authActions");

router.get("/", verifyToken, browse);

router.get("/refresh", refresh);

router.post("/", hashPassword, add);

router.post("/login", login);

router.get("/logout", logout);

router.get("/:id", read);

router.post("/signup", hashPassword, add);

router.use(verifyToken);

module.exports = router;
