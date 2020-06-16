const express = require("express");

const Customer = require("../models/customer");
const Reservation = require("../models/reservation");

const defaultRouter = new express.Router();

/** Homepage */

defaultRouter.get("/", async function(req, res, next) {
    try {
      return res.render("home.html");
    } catch (err) {
      return next(err);
    }
  });

  module.exports = defaultRouter