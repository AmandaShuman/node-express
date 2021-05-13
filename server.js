//even though express is not a core module, since it has been installed to node_modules we don't need to give it a filepath
const express = require('express');

const hostname = 'localhost';
const port = 3000;

//this will return an express server application that will now be available to us under variable app
const app = express();

//first set up server with use method
//use method can take a callback function which express calls a middleware function, which has access to 3 parameters - req (request object), res (response object), and next (function)
app.use((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Context-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//creates an instance of the http server class and start listening to it
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});