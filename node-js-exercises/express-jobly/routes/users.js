const express = require("express");
const User = require("../models/user");
const jsonschema = require("jsonschema");
const jwt = require("jsonwebtoken");
const createUserSchema = require("../schemas/createUserSchema.json");
const updateUserSchema = require("../schemas/updateUserSchema.json");
const { ensureLoggedIn, checkUser } = require("../middleware/auth");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

/** Register new user */

router.post("/", async function (req, res, next) {
  try {
    const data = jsonschema.validate(req.body, createUserSchema);

    if (!data.valid) {
      console.log(data.errors);
      return next({ status: 400, error: data.errors.map((e) => e.stack) });
    }

    const user = await User.register(req.body);
    const token = jwt.sign(
      {
        username: user.username,
        is_admin: user.is_admin,
      },
      SECRET_KEY
    );

    return res.status(201).json({ token });
  } catch (e) {
    return next(e);
  }
});

/** Get the list of users */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const users = await User.all();

    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

/** Get the specified user */

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
  try {
    const user = await User.getOne(req.params.username);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/** Edit user information */

router.patch("/:username", checkUser, async function (req, res, next) {
  try {
    const data = jsonschema.validate(req.body, updateUserSchema);

    if (!data.valid) {
      return next({ status: 400, error: data.errors.map((e) => e.stack) });
    }

    const user = await User.edit(req.params.username, req.body);

    return res.json(user);
  } catch (e) {
    return next(e);
  }
});

/** Remove the user */

router.delete("/:username", checkUser, async function (req, res, next) {
  try {
    const message = await User.delete(req.params.username);

    return res.json(message);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
