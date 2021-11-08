var express = require('express');
var study = express.Router();
var studyDB = require('./studyDB');
var result = require('../result');
/*
Create Study API
1. 
*/
study.post('/createStudy', (req, res)=>{
    var studyItem = {};
    studyItem.study_title = req.body.study_title;
    studyItem.study_date = new Date();
    studyItem.study_skill = req.body.study_skill;
    studyItem.study_content = req.body.study_content;
    studyItem.study_day = req.body.study_day;
    studyItem.study_time = req.body.study_time;
    studyItem.study_member = req.body.study_member;
    studyItem.study_recruit_status = true;
    studyItem.study_progress_status = true;
    studyItem.study_suggestion = req.body.study_suggestion;
    studyDB.insertStudy(studyItem,(row)=>{
        if(row){
            return res.json(result.successTrue(true));
        }
        else{
            return res.json(result.successFalse(row));
        }
    });
});

study.put('/modifyStudy', (req,res)=>{
    var studyItem = {};
    studyItem.study_id = req.body.study_id;
    studyItem.study_title = req.body.study_title;
    studyItem.study_date = req.body.study_date;
    studyItem.study_mod_date = new Date().now();
    studyItem.study_skill = req.body.study_skill;
    studyItem.study_day = req.body.study_day;
    studyItem.study_time = req.body.study_time;
    studyItem.study_member = req.body.study_member;
    studyItem.study_recruit_status = req.body.study_recruit_status;
    studyItem.study_progress_status = req.body.study_progress_status;
    studyItem.study_suggestion = req.body.study_suggestion;
    
});

study.patch('/changeStatus',(req,res)=>{
    var studyItem = {};
    studyItem.study_id = req.body.study_id;
    studyItem.study_recruit_status = req.body.study_recruit_status;
    studyItem.study_progress_status = req.body.study_progress_status;
    
});

study.get('/getListStudy',(req,res)=>{
    studyDB.getList();
});

study.get('/getStudy',(req,res)=>{
    var index = req.body.study_id;
    studyDB.getStudy();
})

study.get('/searchStudy',(req,res)=>{
    var searchItem = req.body.search_keyword;

});
module.exports = study;