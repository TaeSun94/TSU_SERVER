var express = require('express');
var v1 = express.Router();
var tsu = require('./app/tsu/tsu');

v1.use('/app/tsu', tsu);

module.exports = v1;