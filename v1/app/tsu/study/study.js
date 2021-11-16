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

/*
Delete Study API
제안자와 해당 스터디의 id를 비교하여 스터디 삭제 API 수행
*/
study.delete('/deleteStudy',(req,res)=>{
    var studyItem = {};
    studyItem.study_id = req.body.study_id;
    studyItem.study_suggestion = req.body.member_email;
    studyDB.deleteStudy(studyItem,(row)=>{
        if(!row)
            return res.json(result.successFalse(row));
        else
            return res.json(result.successTrue(row));
    })
})

/*
Apply Study API
스터디에 참여의사를 밝히는 API
*/
study.post('/apply',(req,res)=>{
    var Item ={};
    Item.study_id = req.body.study_id;
    Item.member_email = req.body.member_email;
    studyDB.insertApply(Item,(row)=>{
        if(!row)
            return res.json(result.successFalse(row));
        else
            return res.json(result.successTrue(row));
    })
});

/*
Cancle Study API
스터디 참여 취소 API
*/
study.delete('/cancle', (req,res)=>{
    var Item = {};
    Item.study_id = req.body.study_id;
    Item.member_email = req.body.member_email;

    studyDB.deleteApply(Item, (row)=>{
        if(!row)
            return res.json(result.successFalse(row));
        else
            return res.json(result.successTrue(row));
    });
});

/*
ToDO

스터디 승인 또는 반려시 apply 테이블에서 해당 tuple 삭제
or
데이터 보관
or
새로운 테이블 생성하여 반려 목록과 승인 목록을 나눠 보관
*/

/*
Approve Study API
스터디장이 참여자의 참여의사 승인 API
*/
study.post('/approve',(req,res)=>{
    var Item ={};
    Item.study_id = req.body.study_id;
    Item.member_email = req.body.member_email;
    Item.suggestin_id = req.body.study_id;
    Item.study_suggestion = req.body.study_suggestion;
    console.log(Item);
    studyDB.deleteApply(Item,(row)=>{
        if(row){
            studyDB.apporveApply(Item,(row)=>{
                if(!row)
                    return res.json(result.successFalse(row));
                else
                    return res.json(result.successTrue(row));
            });
        }
        else
            return res.json(result.successFalse(row));
    })
});

/*
Deny Study API
스터디장이 참여자의 참여의사 반려 API
*/
study.post('/deny',(req,res)=>{
    var Item ={};
    Item.study_id = req.body.study_id;
    Item.member_email = req.body.member_email;
    studyDB.deleteApply(Item,(row)=>{
        if(!row)
            return res.json(result.successFalse(row));
        else
            return res.json(result.successTrue(row));
    });
});
module.exports = study;