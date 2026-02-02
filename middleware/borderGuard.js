"use strict";

/**
 * borderGuard middleware
 *
 * Middleware is the “checkpoint” system of Express.
 * It runs BEFORE your route handlers (in the order you register it).
 *
 * This middleware demonstrates three outcomes:
 * 1) Immediate success (short-circuit)
 * 2) Access denied (short-circuit)
 * 3) Continue (attach data to req, then call next())
 *
 * Test with query params:
 *   ?passport=multi-pass  -> 200 immediate success
 *   ?passport=banned      -> 403 denied
 *   (anything else)       -> continue + trigger a customs check
 */

const borderGuard = (req, res, next) => {
  // 1. Immediate Success (The Fifth Element)
  // Using query params for easy browser testing: ?passport=multi-pass
  if (req.query.passport === "multi-pass") {
    return res.status(200).send("Welcome, Leeloo Dallas.");
  }

  // 2. Access Denied
  if (req.query.passport === "banned") {
    return res.status(403).send("Access Denied. Turn around.");
  }

  // 3. Inspect (Look in the trunk)
  console.log("BorderGuard: Looking in the trunk...");
  req.customsCheckRequired = true; // Attach the sticker
  next(); // wave them to inspections
};

module.exports = borderGuard;
