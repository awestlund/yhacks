const smartcar = require('smartcar');
const express = require('express');
app = express();

function executeStartParkActions(req,res,next){
    const {vehicles} = await smartcar.getVehicleIds(req.token);
    const vehicle = new smartcar.Vehicle(vehicles[0], req.token);

    vehicle.location().then(function(response) {
        console.log(response);
      });

    
}

app.get('/onStartPark', executeStartParkActions, function(req,res,next){
    
});