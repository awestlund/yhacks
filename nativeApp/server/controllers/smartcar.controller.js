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

exports.getLoginUrl = (req, res, next)=>{
    const authUrl = client.getAuthUrl({forcePrompt: true});
    res.send({url:authUrl});
}

exports.getUser = (req, res, next)=>{
    const authUrl = client.getAuthUrl({forcePrompt: true});
    res.send(`
      <h1>Hello, World!</h1>
      <a href=${authUrl}>
        <button>Connect Car</button>
      </a>
      <a href='http://localhost:8000/parkme'>
        <button>Park Me!</button>
      </a>
    `);
}

exports.parkme = async (req, res, next)=>{ 
    try {
    var cookie = req.cookies.userID;

    const result = await updateLocation(cookie);
    
    console.log("parkme",result);

    return res.send(result);
    }
    catch(err) {
        console.log("error in park sequence")
        return res.send(500);
    }

}

async function updateLocation (cookie){
    console.log("updateloc", cookie);
    let token = Smartcar.find({userID: cookie}, {accessToken: 1, _id:0});
    //token = Smartcars.accessToken;
    console.log("here1 "+ token);
    const Smartcars = await token.exec();

    console.log("here2"+ Smartcars);
    var token2 = Smartcars[0].accessToken;
    console.log(token2);
    // above here works now 

    const response = await smartcar.getVehicleIds(token2)

    const vid = response.vehicles[0];
    const vehicle = new smartcar.Vehicle(vid, token2);

    const location = await vehicle.location();
    
    console.log(location);
    
    let q = Smartcar.update({userID: cookie}, {$set: {location: response}}, {multi: true});
    
    q.exec((err, Smartcars)=>{
            console.log("here3"+ Smartcars);
        })

    return location;
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
            var recurUser = Smartcar.find({userID: userID},{_id:1});
            recurUser.exec((err, Smartcars)=>{
                if(err){
                  return res.status(500).send(err);
                }
                console.log("69" + Smartcars);
                //var user = Smartcars[0]._id; //this will be an array, change how we pass this
                
                if(Smartcars && Smartcars.length > 0){
                    // update access code here
                    let q = Smartcar.update({userID: userID}, {$set: {accessToken: newuser.accessToken}}, {multi: true});
                    q.exec((err, Smartcars)=>{
                        if(err){
                            return res.status(500).send(err);
                        }
                        console.log("updated accessToken"+ Smartcars);
                        res.send(`
                        updated accessToken
                        <a href='http://localhost:4200/owner/${userID}'>
                            <button>Return to Client</button>
                        </a>
                        `);
                    })
                }
                else{
                    newuser.userID = userID;
                    let newSmartcar = new Smartcar(newuser);
                    newSmartcar.save(err=>{
                        if(err) return res.status(500).send(err);
                        res.send(`
                        <p>nice job kiddo</p>
                        <a href='http://localhost:4200/owner?clientid=${userID}'>
                            <button>Return to Client</button>
                        </a>
                        `);
    
                    })
                }
              })

        });
}

exports.test =(req, res, next)=>{
    console.log(req.query.name);
    res.send({test:5})
}
