'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SmartcarSchema = new Schema({
    userID: {type: String, require: true},
    accessToken: {type: String, require: true},
    vehicleIDs: {type: [String]},
    loaction: {type: [String]},
    vehicleInfo: {type: [String]},
});

module.exports = mongoose.model('Smartcar', SmartcarSchema);