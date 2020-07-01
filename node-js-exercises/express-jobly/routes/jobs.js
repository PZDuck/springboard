const express = require("express");
const Job = require("../models/job");
const jsonschema = require("jsonschema");
const createJobSchema = require("../schemas/createJobSchema.json");
const updateJobSchema = require("../schemas/updateJobSchema.json");
const { ensureLoggedIn, isAdmin } = require("../middleware/auth");

const router = new express.Router();

/** Create a new job  */

router.post("/", isAdmin, async function (req, res, next) {
  try {
    const data = jsonschema.validate(req.body, createJobSchema);

    if (!data.valid) {
      return next({ status: 400, error: data.errors.map((e) => e.stack) });
    }

    const job = await Job.create(req.body);

    return res.status(201).json({ job });
  } catch (e) {
    return next(e);
  }
});

/** Get the list of all jobs */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const jobs = await Job.getAll(req.query);

    return res.json({ jobs });
  } catch (e) {
    return next(e);
  }
});

/** Get infromation about the specified job */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const job = await Job.getOne(req.params.id);

    return res.json(job);
  } catch (e) {
    return next(e);
  }
});

/** Edit job's information */

router.patch("/:id", isAdmin, async function (req, res, next) {
  try {
    const data = jsonschema.validate(req.body, updateJobSchema);

    if (!data.valid) {
      return next({ status: 400, error: data.errors.map((e) => e.stack) });
    }

    const job = await Job.edit(req.params.id, req.body);

    return res.json(job);
  } catch (e) {
    return next(e);
  }
});

/** Remove the job from the database */

router.delete("/:id", isAdmin, async function (req, res, next) {
  try {
    const message = await Job.delete(req.params.id);

    return res.json(message);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
