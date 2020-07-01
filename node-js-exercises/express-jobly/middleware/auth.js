const jwt = require("jsonwebtoken");
const expressError = require("../helpers/expressError");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../helpers/expressError");

function ensureLoggedIn(req, res, next) {
  try {
    let token = req.body._token || req.query._token;

    token = jwt.verify(token, SECRET_KEY);
    res.username = token.username;
    res.is_admin = token.is_admin;

    return next();
  } catch (e) {
    return next(new ExpressError("Unauthorized", 401));
  }
}

function isAdmin(req, res, next) {
  try {
    let token = req.body._token || req.query._token;

    token = jwt.verify(token, SECRET_KEY);

    if (token.is_admin) {
      return next();
    } else {
      throw new expressError("Unauthorized, admin privileges required", 401);
    }
  } catch (e) {
    return next(e);
  }
}

function checkUser(req, res, next) {
  try {
    let token = req.body._token || req.query._token;

    token = jwt.verify(token, SECRET_KEY);
    res.username = token.username;
    res.is_admin = token.is_admin;

    if (token.is_admin || token.username === req.params.username) {
      return next();
    } else {
      throw new expressError("Unauthorized", 401);
    }
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  ensureLoggedIn,
  isAdmin,
  checkUser,
};
