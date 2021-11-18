var express = require('express');
var util = express.Router();
var utilDB = require('./utilDB');
var result = require('../result');

util.get('/getJobList',function(req,res){
    utilDB.getJobCategoryList((row)=>{
        if(!row){
            return res.json(result.successFalse(row));
        }
        else
            return res.json(result.successTrue(row));
    });
});

util.get('/getSkillList',function(req,res){
    utilDB.getSkillCategoryList((row)=>{
        if(!row){
            return res.json(result.successFalse(row));
        }
        else
            return res.json(result.successTrue(row));
    });
});
module.exports = util;