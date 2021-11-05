var express = require('express');
var membership = express.Router();
var membershipDB = require('./membershipDB');
var result = require('../result');
/*
API 작성 예시
membership.HTTPMETHOD('API ROUTE', functions(req, res, next){
    function logic
});
*/
/*
Test API
*/
/**
 * @swagger
 * path:
 *  /test:
 *      get:
 *          summary: Test API
 *          tags: [Membership]
 *          response:
 *              "200":
 *                  description: Test Good
 */
membership.get('/test', (req,res) => {
    console.log("테스트 api 호출");
    return res.json("API Test");
});

/*
Sign Up API
1. id,pw -> General
2. SNS or social Login
*/
membership.post('/signUpGeneral',function(req,res){
    //validation 필요.
    var member = {};
    member.member_email = req.body.email;
    member.member_password = req.body.password;
    member.member_name = req.body.name;
    member.member_major = req.body.major;
    member.member_minor = req.body.minor;

    //DB Connection -> DB insert member
    //if (insert OK) -> 200 OK result true
    //else -> result false // server - console.log or logging system -> function name + error msg // client -  Alert('서버와 연결이 끊어졌습니다. 다시 시도해주시기 바랍니다.') + web cashe clear
    membershipDB.insertMember(member, (row) =>{
        if(row){
            return res.json({result: true});
        }
        else{
            return res.json({result: false, msg: 'insert Error'});
        }
    });
});

//To do: Google, kakao, naver, github
membership.post('/signUpSocial',function(req,res){
    //validation 필요.
    var member = {};
    member.email = req.body.email;
    member.password = req.body.password;
    member.name = req.body.name;
    member.major = req.body.major;
    member.minor = req.body.minor;

    //DB Connection -> DB insert member
    //if (insert OK) -> 200 OK result true
    //else -> result false // server - console.log or logging system -> function name + error msg // client -  Alert('서버와 연결이 끊어졌습니다. 다시 시도해주시기 바랍니다.') + web cashe clear
    
    //임시 return data
    return res.send();
});

/*
Modify API
1. 회원 정보 수정 시 put method 사용
2. 비밀번호 수정 시 patch method 사용
*/
membership.put('/modifyMember',function(req,res){
    //validate
    var member = {};
    member.email = req.body.email;
    member.password = req.body.password;
    member.name = req.body.name;
    member.major = req.body.major;
    member.minor = req.body.minor;
    //DB connect -> DB update member
    //if(insert OK) -> 200 OK result true
    //else -> result false // server - console.log or logging system -> function name + error msg // client - Alert('다시 시도 해주시기 바랍니다.')
    membershipDB.modifyMember(member, (row) =>{
        if(row){
            return res.json({result: true});
        }
        else{
            return res.json({result: false, msg: 'insert Error'});
        }
    }); 
});

/*
Withdrawl API
*/
membership.delete('/withdrawMember',function(req,res){
    //validate
    var member = {};
    member.member_email = req.body.member_email;
    //DB connect -> DB delete member
    //if(delete ok) -> 200 Ok result true
    //else -> result false
    membershipDB.deleteMember(member, (row) =>{
        console.log(row);
        if(row){
            return res.json({result: true});
        }
        else{
            return res.json({result: false, msg: 'insert Error'});
        }
    }); 
});

/*
Login API
1. general login
2. social login -> social signup
to-do 3. DID login
*/
membership.post('/loginGeneral', function(req,res){
    //validate
    var member = {};
    member.member_email = req.body.member_email;
    member.member_password = req.body.member_password;
    //DB connect -> DB select member && 비교 pw
    //if (isOk) -> 200 ok result true
    //else -> result false;
    membershipDB.getMember(member, (row) =>{
        if(row){
            return res.json({result: true});
        }
        else{
            return res.json({result: false, msg: 'insert Error'});
        }
    });
});

/*
Check dual email API
*/
membership.get('/checkEmail',function(req,res){
    //validate

    //DB connect -> DB select count() member Email
    //if(count == 0) -> return true, else return false;
    membershipDB.checkEmail(req.query.member_email, (rows) => {
        if(rows.COUNT > 0){
            return res.json({result: false});
        }
        else{
            return res.json({result: true});
        }
    });
});

/*
Log out API
*/
membership.post('/logOut',function(req,res){
    //validate

    //session table delete member session
});

/*
Find Password API, mod password, auth by email
=> put method를 이용하여 전체 데이터 수정이 아닌 일부 데이터 수정으로 바꿀 예정
*/
module.exports = membership;