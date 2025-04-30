const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url + '.html');
    const extname = path.extname(filePath);

    // Ensure the file is an HTML file
    if (extname !== '.html') {
        filePath = path.join(__dirname, '404.html');
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, serve 404.html
                fs.readFile(path.join(__dirname, '404.html'), (err404, content404) => {
                    if (err404) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content404, 'utf8');
                    }
                });
            } else {
                // Other server error
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});