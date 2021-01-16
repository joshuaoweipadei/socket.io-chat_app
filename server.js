const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// start server
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port);
});

const io = require('socket.io').listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//enable CORS for request verbs
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
  next();  
});

// Assign socket object to every request
app.use(function(req, res, next) {
  res.io = io;
  next();
});

if(process.env.NODE_ENV === 'production'){
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
}

app.use('/api/account', require('./account/controller'));
app.use('/api/chat', require('./chat/controller'));
