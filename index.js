// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date", function (req, res) {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  const unixFormatRegex = /^\d+$/;
  if(dateFormatRegex.test(req.params.date)){
    const unixDate=Date.parse(req.params.date);
    const dateVal = new Date(unixDate);
    const utcString=dateVal.toUTCString();
  console.log(typeof(unixDate))
  res.json({"unix":unixDate,
    utc:utcString
  });
  }
  else if(unixFormatRegex.test(req.params.date)){
   const number=Number(req.params.date);
   const dateVal = new Date(number)
   const utcString=dateVal.toUTCString();

    res.json({unix:number,
      utc:utcString
    });
  }
  else {
    res.json({error:"invalid date"
    });
  }

});

app.get("/api/", function (req, res) {
  const now=Date.now();
  const dateVal = new Date(now)
  const utcString=dateVal.toUTCString();
  res.json({unix: now,
    utc:utcString
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
