// https://github.com/Joshua-Noakes1/shortcut-download
const http = require('http');
const app = require('./app.js');
require('dotenv').config();

// defaults to port 3000 if no port can be found
const port = process.env.PORT || 3000;

// create server
const server = http.createServer(app);
server.listen(port);

console.log(`🚀 Started server on port ${port} 🚀`);