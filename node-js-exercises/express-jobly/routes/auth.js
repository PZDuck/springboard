const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

/** Post user information and get a signed token */

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.auth(req.body);
    const token = jwt.sign(
      {
        username: user.username,
        is_admin: user.is_admin,
      },
      SECRET_KEY
    );
    return res.json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
