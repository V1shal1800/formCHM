const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

// Load config
dotenv.config({path: './config/config.env'});

const PORT = process.env.PORT || 7000;

const server = http.createServer(app);

server.listen(PORT,() => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
})
