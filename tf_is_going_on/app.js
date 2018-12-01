const smartcar = require('smartcar');
const express = require('express');
app = express();

'use strict';

const CLIENT_ID = '14d850b9-3652-4765-897e-ffed1716cc54';
const CLIENT_SECRET = 'c431ca8e-352f-47a9-836b-e5ce98896b33';

//program logic

function executeStartParkActions(req,res,next){
    const {vehicles} = await smartcar.getVehicleIds(req.token);
    const vehicle = new smartcar.Vehicle(vehicles[0], req.token);

    vehicle.location().then(function(response) {
        console.log(response);
      });
    
}

app.get('/onStartPark', executeStartParkActions, function(req,res,next){
    
});

// demo logic

// 1. Create an instance of Smartcar's client.
const client = new smartcar.AuthClient({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://localhost:8000/callback',
  scope: ['read_vehicle_info', 'read_location', 'control_security'],
  testMode: true
});

// 3. Create a page with a 'Connect Car' button.
app.get('/', function(req, res, next) {
  const authUrl = client.getAuthUrl({forcePrompt: true});
  res.send(`
    <h1>Hello, World!</h1>
    <a href=${authUrl}>
      <button>Connect Car</button>
    </a>
    <h1>We Gonna Test This Program</h1>
    <a href=http://localhost:8000/onStartPark>
        <button>Park Me!</button>
    </a>
  `);
});

// 4. On an HTTP GET to our callback will exchange our OAuth Auth Code
//    for an Access Token and log it out.
app.get('/callback', function(req, res, next) {
  const code = req.query.code;
  client.exchangeCode(code)
    .then(function(access) {
      // get all vehicles
      // save info to db
      // Log the access token response
      console.log(JSON.stringify(access, null, 2));

      // Respond with a success status to browser
      res.json(access);

    });
});

// 5. Let's start up the server at port 8000.
app.listen(8000);