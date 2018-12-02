var express = require('express');
var router = express.Router();
const smartcar_controller = require('../controllers/smartcar.controller');

/* GET users listing. */

//home page, prompts user to sign-in
router.get('/User', smartcar_controller.getUser);

//prints out all of the db entries
router.get('/db', smartcar_controller.get);

//saves a new user into the database
router.get('/callback', smartcar_controller.add);

//returns accessToken, EX: 05416a94-51b8-42eb-aed6-a3475cf04c0b
router.get('/getToken', smartcar_controller.getAccessToken);

//return location EX: 
router.get('/getLocation', smartcar_controller.getLocation);

router.get('/parkme',smartcar_controller.parkme);

//returns vehicle info EX: 
router.get('/getVehicleInfo', smartcar_controller.getVehicleInfo);

// returns array of ids EX: ["67dfd165-b4ba-402e-8e63-679abd75aca0","707968d2-ed02-4c8f-9f8d-f8da9fddce03","f37f9db9-072c-4302-8e27-f730f23291ec"]
router.get('/getVehicleIDs', smartcar_controller.getVehicleIDs);
module.exports = router;

router.get('/login', smartcar_controller.getLoginUrl);

router.get('/test', smartcar_controller.test);

router.get('/readytodrive', smartcar_controller.readytodrive);

router.get('/getIfReadyToBeParked', smartcar_controller.getIfReadyToBeParked);