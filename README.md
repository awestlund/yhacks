# YHack Project
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
A secure connection between the NodeJS server and the client is not configured currently. Modern browsers will block communication between the two services. To disable this feature in chrome, install and enabled the [Allow-Control-Allow-Origin: * Plugin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).