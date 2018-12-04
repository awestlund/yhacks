# EasyPark - _YHack 2018 Runner Up for Best use of Smartcar Technology_

## About
Easy Park was created during [YHack 2018](http://yhack.org) as a solution to parking penalties and restrictions. Have you ever left your car in a street cleaning lane, snow plow lane, 2 hour parking, or at a bar? If your car has 3G/4G/LTE capabilities and is made by one of the 13 major brands supported by the [Smartcar API](https://smartcar.com), EasyPark can find a trust-worthy individual to move your car for you. Using Smartcar's API, a driver can unlock your car doors, use a key inside (keyless remote start will be supported in the future), move your car, and lock the car when they are done. It's that simple!

### Details
- [Video Demo of Tesla Web-Unlock Using EasyPark](https://youtu.be/7nfPu7oJIBc)
- [YHack Page](https://yhack2018.hackerearth.com/sprints/yhack-2018/dashboard/c2367b7/submission/)
- [WireFrame Demo/Design Concept](https://invis.io/DTPEK90HPZJ)

### Unfinished Product
Please note that this is an unfinished product created during a 32 hour Hackathon. It is not optimized and may break traditional design standards in favor of completing a minimum viable product before the end of the event. A working implementation of the unlock feature and a basic design goal has been provided. Future iterations of this project should correct design inconsistancies and security vulnerabilities in addition to adding features depicted in the design wireframe. 

## How to Start
### Node Server
The [NodeJS](https://nodejs.org/) server handles all interactions with [SmartCar](https://smartcar.com) and the [Mongo Database](https://www.mongodb.com). This server could be deployed, but is currently configured for local hosting. 

In the [Server Directory](./nativeApp/server/) run:
- `npm install` to install dependencies
- `nodemon` to start the server.

### Angular
The [Angular](https://angular.io) Client is a basic proof of concept of the features available in the app. To access the client, build a production copy, or run the Angular Development Server.

The following commands should be run from the [Client Directory](./nativeApp/client/):

- Installation (Both)
  - `npm install -g @angular/cli` to install the [Angular Commandline Interface](https://cli.angular.io)
  - `npm install` to install dependencies
- Build Production Copy
  - `ng build --base-href ./ --prod` _This will build to the [dist](./nativeApp/client/dist/client) directory. Access the [index.html](./nativeApp/client/dist/client) file to run the build_
- Launch Angular Development Server
  - `ng serve` _This will launch a live updating development server. It is significantly slower than the build, but will update and refresh all isntances any time the source code is changed. While running, the client can be accessed from [localhost:4200](http://localhost:4200).

### Disable Allow Control Origin in Browser
A secure connection between the NodeJS server and the client is not configured currently. Modern browsers will block communication between the two services. To disable this feature in Chrome, install and enabled the [Allow-Control-Allow-Origin: * Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).