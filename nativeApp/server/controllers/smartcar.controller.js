const Smartcar = require('../models/smartcar.model');
const smartcar = require('smartcar');
var cookieParser = require('cookie-parser');
const CLIENT_ID = '14d850b9-3652-4765-897e-ffed1716cc54';
const CLIENT_SECRET = 'c431ca8e-352f-47a9-836b-e5ce98896b33';

// 1. Create an instance of Smartcar's client.
const client = new smartcar.AuthClient({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: 'http://localhost:8000/callback',
    scope: ['read_vehicle_info', 'read_location', 'control_security'],
    testMode: true
});

exports.getUser = (req, res, next)=>{
    const authUrl = client.getAuthUrl({forcePrompt: true});
    res.send(`
      <h1>Hello, World!</h1>
      <a href=${authUrl}>
        <button>Connect Car</button>
      </a>
    `);
}
exports.get = (req, res, next)=>{
    let q = Smartcar.find();
    q.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
      res.send(Smartcars);
    });
}
exports.getAccessToken = (req, res, next)=>{
    var cookie = req.cookies.userID;
    let token = Smartcar.find({userID: cookie}, {accessToken: 1, _id:0});
    //token = Smartcars.accessToken;
    console.log("here1 "+ token);
    token.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
      res.send(Smartcars[0].accessToken);
    });
}
exports.getVehicleInfo = (req, res, next)=>{
    var cookie = req.cookies.userID;
    let info = Smartcar.find({userID: cookie}, {vehicleInfo: 1, _id:0});
    info.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
      res.send(Smartcars[0].vehicleInfo);
    });
}
exports.getVehicleIDs = (req, res, next)=>{
    var cookie = req.cookies.userID;
    let ids = Smartcar.find({userID: cookie}, {vehicleIDs: 1, _id:0});
    ids.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
      res.send(Smartcars[0].vehicleIDs);
    });
}
exports.getLocation = (req, res, next)=>{
    var cookie = req.cookies.userID;
    let location = Smartcar.find({userID: cookie}, {Location: 1, _id:0});
    location.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
      res.send(Smartcars[0].location); //this will be an array, change how we pass this
    });
}
exports.updateLocation = (req, res, next)=>{
    var cookie = req.cookies.userID;
    let token = Smartcar.find({userID: cookie}, {accessToken: 1, _id:0});
    
    smartcar.getVehicleIds(token)
        .then(function(response) {
            const vid = response.vehicles[0];
            const vehicle = new smartcar.Vehicle(vid, accessToken);
            return vehicle.location();
        })
        .then(function(response) {
            console.log(response);
        });
    let q = Smartcar.update();
    q.exec((err, Smartcars)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ Smartcars);
    res.send(200);
    });
}
exports.add = (req, res, next)=>{
    const code = req.query.code;
    const newuser = {};
    client.exchangeCode(code)
        .then(function(access) {
        console.log(JSON.stringify(access, null, 2));
        // get accessToken string
        newuser.accessToken = access.accessToken;
        console.log(newuser.accessToken);

        return smartcar.getVehicleIds(newuser.accessToken);

        })
        .then(function(response) {
            newuser.vehicleIDs= response.vehicles;
            return smartcar.getUserId(newuser.accessToken);
        })
        .then(function(userID){
            newuser.userID = userID;
            res.cookie('userID', userID);
            // console.log('new cookie: ',cookie);
            let newSmartcar = new Smartcar(newuser);

            newSmartcar.save(err=>{
                if(err) return res.status(500).send(err);
                res.send('nice job kiddo');

            })
            // res.send('nice job kiddo2');

        });
}