// routes/indexRouter.js
const { Router } = require("express");
const path = require("path");
const fs = require("fs");

const indexRouter = Router();

// Middleware to serve EJS templates dynamically
indexRouter.use((req, res, next) => {
    const viewName = req.path === "/" ? "index" : req.path.substring(1); // Remove leading slash
    const filePath = path.join(__dirname, `../views/${viewName}.ejs`);

    // Check if the EJS file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file doesn't exist, pass to the 404 handler
            next();
        } else {
            // If the file exists, render it
            res.render(viewName);
        }
    });
});

// Catch-all route for 404 errors
indexRouter.use((req, res) => {
    res.status(404).render("404");
});

module.exports = indexRouter;