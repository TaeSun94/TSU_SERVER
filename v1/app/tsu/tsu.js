var express = require('express');
var tsu = express.Router();
var membership = require('./membership/membership');
var study = require('./study/study');
var util = require('./util/util');
//membership file conneclt to tsu service controller
tsu.use('/membership',membership);
tsu.use('/study', study);
tsu.use('/util',util);
module.exports = tsu;