//even though express is not a core module, since it has been installed to node_modules we don't need to give it a filepath
const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const partnerRouter = require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');

const hostname = 'localhost';
const port = 3000;

//this will return an express server application that will now be available to us under variable app
const app = express();
//using morgan middleware here instead of callback function - this will configure morgan to log using the development version to print add. info to screen
app.use(morgan('dev'));
;
//when server receives requests in the body, this middleware function will handle parsing.json data int JS properties of the request object so we can use the data in JS
app.use(express.json());

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

//set up express to serve files from the public folder with the help of middleware function called express.static
app.use(express.static(__dirname + '/public')); //__dirname will refer to the absolute path of the current directory of the file that it is in

//first set up server with use method
//use method can take a callback function which express calls a middleware function, which has access to 3 parameters - req (request object), res (response object), and next (function)
app.use((req, res) => {
  res.statusCode = 200;
  res.setHeader('Context-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

//creates an instance of the http server class and start listening to it
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});