// routes/indexRouter.js
const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const indexRouter = Router();

// Middleware to serve files dynamically
indexRouter.use((req, res, next) => {
    const filePath = path.join(__dirname, `../${req.path === "/" ? "index" : req.path}.html`);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file doesn't exist, pass to the 404 handler
            next();
        } else {
            // If the file exists, serve it
            res.sendFile(filePath);
        }
    });
});

// Catch-all route for 404 errors
indexRouter.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../404.html"));
});

module.exports = indexRouter;