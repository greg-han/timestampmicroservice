// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/api/timestamp/:datestring?",function( req, res, next){
  var emptytimestring;
  var checkstring = new Date(req.params.datestring);
  if(req.params.datestring === undefined){
   emptytimestring = new Date();
   res.json({"unix": emptytimestring.getTime(), "utc" : emptytimestring.toUTCString()});
  }
  if((checkstring == "Invalid Date" && isNaN(req.params.datestring)) || req.params.datestring.indexOf(".") != -1){
   res.json({"error" : "Invalid Date"});
  }
  if(req.params.datestring != undefined && req.params.datestring.indexOf("-") != -1){
      console.log("I'm in here");
      var unixtime = new Date(req.params.datestring).getTime();
      var timestring = new Date(parseInt(req.params.datestring));
      res.json({"unix" : unixtime,"utc" : timestring.toUTCString()});
   }
   else{
     var timestring = new Date(parseInt(req.params.datestring));
     res.json({"unix" : timestring.getTime(),"utc" : timestring.toUTCString()});
   }
  next();
});


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
