var connection = require('../../../../config/database');
var studyDB = {};
//database config 내부에서 init시 생성되는 DB connection을 객체로 들고 있어 반환하는 함수가 필요.
studyDB.database = connection.init();
/*
study table columns

study_id int AI PK
study_title varchar(45)
study_date datetime
study_mod_date datetime
study_skill varchar(45)
study_content varchar(300)
study_day datetime
study_time varchar(45)
study_member varchar(45)
study_recruit_status varchar(45)
study_progress_status varchar(45)
study_suggestion varchar(45)
*/

studyDB.insertStudy = function(study,callback){
    var params = [];
    for(var data in study){
        params.push(study[data]);
    }
    var sql = "INSERT INTO study (study_title, study_date, study_skill, study_content,study_day,study_time,study_member,study_recruit_status, study_progress_status, study_suggestion )VALUE(?,?,?,?,?,?,?,?,?,?)";
    studyDB.database.query(sql,params,function(err,data){
        if(err){
            return callback(false);
        }
        else
            return callback(data);
    })
}

studyDB.modifyStudy = function(study, callback){
    var params = [];
    for(var data in study){
        params.push(study[data]);
    }
    var sql = "UPDATE study SET study_title = ?, study_mod_date = ?, study_skill = ?, study_day = ?, study_time = ?, study_member = ?, study_recruit_status = ?, study_progress_status = ? WHERE study_id = ?";
    studyDB.database.query(sql,params,function(err,data){
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    })
}

studyDB.getStudy = function(study,callback){
    var params = [study.study_id];
    var sql = "SELECT * FROM study WHERE study_id=?";
    studyDB.database.query(sql,params,function(err,data){
        if(err)
            return callback(false);
        else
            return callback(data);
    });
}

module.exports = studyDB;