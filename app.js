"use strict";

/**
 * Node2Know — Express Middleware
 *
 * Middleware runs on the way *to* your route handlers.
 * It can:
 * - end the request early (res.send / res.status...)
 * - modify the request (attach info to req)
 * - pass control forward with next()
 *
 * In this demo:
 * - borderGuard is global middleware (app.use)
 * - it may:
 *   - accept you immediately
 *   - reject you immediately
 *   - flag you for customs inspection
 */

const express = require("express");
const app = express();

const borderGuard = require("./middleware/borderGuard");

const PORT = process.env.PORT || 3000;

// Register middleware (runs before routes)
app.use(borderGuard);

// After the borderGuard runs, we can check the sticker it attached.
// If customs inspection is required, redirect to /customs.
app.use((req, res, next) => {
  if (req.customsCheckRequired && req.path !== "/customs") {
    return res.redirect(302, "/customs");
  }
  next();
});

app.get("/", (req, res) => {
  res.type("html").send(`
    <h1>Highway Entrance</h1>
    <p>Try these:</p>
    <ul>
      <li><a href="/?passport=multi-pass">/?passport=multi-pass</a> (immediate success)</li>
      <li><a href="/?passport=banned">/?passport=banned</a> (denied)</li>
      <li><a href="/">/</a> (flagged for customs → redirect)</li>
    </ul>
  `);
});

app.get("/customs", (req, res) => {
  res.type("html").send(`
    <h1>Customs Inspection</h1>
    <p>🚨 Open your trunk and step out of the car.</p>
    <p>(This route exists because middleware flagged the request.)</p>
    <p><a href="/?passport=multi-pass">Try again with a multi-pass</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`Created process at PID: ${process.pid}`);
  console.log(`Listening on port: ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/?passport=multi-pass`);
  console.log(`Try: http://localhost:${PORT}/?passport=banned`);
  console.log(`Try: http://localhost:${PORT}/ (redirects to /customs)`);
});
