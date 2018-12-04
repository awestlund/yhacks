'use strict';

const CLIENT_ID = '14d850b9-3652-4765-897e-ffed1716cc54';
const CLIENT_SECRET = 'c431ca8e-352f-47a9-836b-e5ce98896b33';

const smartcar = require('smartcar');
const express = require('express');

// 1. Create an instance of Smartcar's client.
const client = new smartcar.AuthClient({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'http://localhost:8000/callback',
  scope: ['read_vehicle_info', 'read_location', 'control_security'],
  testMode: true
});

// 2. Create a new webserver with the Express framework.
const app = express();

// 3. Create a page with a 'Connect Car' button.
app.get('/', function(req, res, next) {
  const authUrl = client.getAuthUrl({forcePrompt: true});
  res.send(`
    <h1>Hello, World!</h1>
    <a href=${authUrl}>
      <button>Connect Car</button>
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
      // Log the access token response
      console.log(JSON.stringify(access, null, 2));
      // get accessToken string
      var accessToken = access.accessToken;
      console.log(accessToken);

      smartcar.getVehicleIds(accessToken)
        .then(function(response) {
          // save all vehicles to db
          const vid = response.vehicles[0];

          // -----

          const vehicle = new smartcar.Vehicle(vid, accessToken);
          return vehicle.location();
        })
        .then(function(response) {
          // log to db
          console.log(response);
        });
      // save info to db
      // Respond with a success status to browser
      res.send(accessToken);

    });
});

// 5. Let's start up the server at port 8000.
app.listen(8000);
