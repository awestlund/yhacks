'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SmartcarSchema = new Schema({
    userID: {type: String, require: true},
    accessToken: {type: String, require: true},
    vehicleIDs: {type: [String]},
    location: {type: Object},
    vehicleInfo: {type: [String]},
    readyToBeParked: {type: Boolean, default: false}
});

module.exports = mongoose.model('Smartcar', SmartcarSchema);