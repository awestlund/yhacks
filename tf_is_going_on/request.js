'use strict';

const smartcar = require('smartcar');

const accessToken = '30c31657-e68b-4bda-af05-e26593cb09c8';

smartcar.getVehicleIds(accessToken)
  .then(function(response) {
    const vid = response.vehicles[0];
    const vehicle = new smartcar.Vehicle(vid, accessToken);
    return vehicle.location();
  })
  .then(function(response) {
    console.log(response);
  });
