'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ScoreSchema = new Schema({
    name: {type: String, require: true, max: 3},
    score: {type: Number, require: true, max: 3},
});

module.exports = mongoose.model('Score', ScoreSchema);