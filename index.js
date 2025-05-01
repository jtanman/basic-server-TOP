const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Fallback for routes like /about or /contact-me
app.use((req, res, next) => {
    const filePath = path.join(__dirname, `${req.path}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            next(); // Pass to the 404 handler if the file doesn't exist
        }
    });
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});