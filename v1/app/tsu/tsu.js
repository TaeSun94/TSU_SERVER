var express = require('express');
var tsu = express.Router();
var membership = require('./membership/membership');

//membership file conneclt to tsu service controller
tsu.use('/membership',membership);
module.exports = tsu;