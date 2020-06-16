const express = require("express");

const Reservation = require("../models/reservation");

const reservationRouter = new express.Router();


/** Handle adding a new reservation. */

reservationRouter.post("/:id/add-reservation/", async function(req, res, next) {
    try {
      const customerId = req.params.id;
      const startAt = new Date(req.body.startAt);
      const numGuests = req.body.numGuests;
      const notes = req.body.notes;
  
      const reservation = new Reservation({
        customerId,
        startAt,
        numGuests,
        notes
      });
      await reservation.save();
  
      return res.redirect(`/${customerId}/`);
    } catch (err) {
      return next(err);
    }
  });

  module.exports = reservationRouter