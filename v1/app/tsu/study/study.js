var express = require('express');
var study = express.Router();
var studyDB = require('./studyDB');
var result = require('../result');

/*
Create Study API
스터디 생성시 필요한 정보를 받아와 DB에 저장하기 위한 API
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

/*
Modify Study
Study의 정보를 바꾸기 위한 API
*/
study.put('/modifyStudy', (req,res)=>{
    var studyItem = {};
    studyItem.study_title = req.body.study_title;
    studyItem.study_mod_date = new Date();
    studyItem.study_skill = req.body.study_skill;
    studyItem.study_day = req.body.study_day;
    studyItem.study_time = req.body.study_time;
    studyItem.study_member = req.body.study_member;
    studyItem.study_recruit_status = req.body.study_recruit_status;
    studyItem.study_progress_status = req.body.study_progress_status;
    studyItem.study_id = req.body.study_id;
    studyDB.modifyStudy(studyItem,(row)=>{
        if(row){
            studyDB.getStudy(studyItem,(row)=>{
                if(!row){
                    return res.json(result.successFalse(row));
                }
                else
                    return res.json(result.successTrue(row));
            })
        }
        else
            return res.json(result.successFalse(row));
    })
});

/*
Change Recruit Status API
모집 마감을 이룬 스터디의 상태를 변경하기 위한 API
*/
study.patch('/changeRecruitStatus',(req,res)=>{
    var studyItem = {};
    studyItem.study_recruit_status = req.body.study_recruit_status;
    studyItem.study_id = req.body.study_id;
    studyItem.study_suggestion = req.body.member_email;

    studyDB.updateRecurit(studyItem,(row)=>{
        if(row){
            return res.json(result.successTrue(row));
        }
        else{
            return res.json(result.successFalse());
        }
    });
});

/*
Change Progress Status API
해당 스터디의 시작의 이벤트 호출에 사용되는 api로 해당 스터디의 진행 상태를 변경하는 API
*/
study.patch('/changeProgressStatus',(req,res)=>{
    var studyItem = {};
    studyItem.study_progress_status = req.body.study_progress_status;
    studyItem.study_id = req.body.study_id;
    studyItem.study_suggestion = req.body.member_email;
    studyDB.updateProgress(studyItem,(row)=>{
        if(row){
            return res.json(result.successTrue(row));
        }
        else{
            return res.json(result.successFalse());
        }
    });
});

/*
Get Study List api
Sort Default : study_id desc => 최근에 생긴 study 기준으로 정렬

toDo : pagenation 적용으로 index값을 받아 가져오도록 설정 예정
*/
study.get('/getListStudy',(req,res)=>{
    studyDB.getList((row)=>{
        if(!row)
            return res.json(result.successFalse());
        else
            return res.json(result.successTrue(row));
    });
});

/*
Get Study API
study 검색하여 해당 Study의 상세 정보를 가져오기 위한 API
*/
study.get('/getStudy',(req,res)=>{
    var studyItem = {};
    studyItem.study_id = req.query.study_id;
    studyDB.getStudy(studyItem,(row)=>{
        if(!row)
            return res.json(result.successFalse(row));
        else
            return res.json(result.successTrue(row));
    })
})

/*
Search Study
검색 창을 통한 스터디 검색을 위한 API
*미구현*

ToDo : 제안자로 검색하기, 기술로 검색하기, 시작 날짜별 검색, 시간 역순 검색을 지원할 예정
*/
study.get('/searchStudy',(req,res)=>{
    var searchItem = req.body.search_keyword;

});
module.exports = study;