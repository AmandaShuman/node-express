//even though express is not a core module, since it has been installed to node_modules we don't need to give it a filepath
const express = require('express');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;

//this will return an express server application that will now be available to us under variable app
const app = express();
//using morgan middleware here instead of callback function - this will configure morgan to log using the development version to print add. info to screen
app.use(morgan('dev'));

//when server receives requests in the body, this middleware function will handle parsing.json data int JS properties of the request object so we can use the data in JS
app.use(express.json());

//a routing method that is a catchall for all http verbs - use to set properties on response object that we will use as defaults for the path (so we don't need repeats individually)
//format is app.all('path',callback method)
app.all('/campsites', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');  //send back plain text in response body
  next(); //passes control of the app routing to the next RELEVANT routing method after this one
});

app.get('/campsites', (req, res) => {     //don't need next bc not passing any more routings after this
  //response status code and headers already set by app.all method
  res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {    //post requests typically cary some info (usually json format)
  //this is why the express.json file is imporant!
  res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
  res.statusCode = 403;   //code when operation is not supported
  res.end('PUT operation not supported on /campsties');
});

app.delete('/campsites', (req, res) => {  //dangerous operation so don't want to just let anyone do it
  res.end('Deleting all campsites');
});

//allows us to store whatever the client sends as a part of the path after the slash as a route parameter
app.get('/campsites/:campsiteId', (req, res) => {
  res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
  res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
  res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
  res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

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