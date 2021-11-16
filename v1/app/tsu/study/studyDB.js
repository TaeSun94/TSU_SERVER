var connection = require('../../../../config/database');
const study = require('./study');
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
        console.log(err);
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

studyDB.updateRecurit = function(study, callback){
    var params = [];
    for(var data in study){
        params.push(study[data]);
    }
    var sql = "UPDATE study SET study_recruit_status = ? WHERE study_id = ? AND study_suggestion = ?";
    studyDB.database.query(sql,params,function(err,data){
        console.log(err);
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}

studyDB.updateProgress = function(study, callback){
    var params = [];
    for(var data in study){
        params.push(study[data]);
    }
    var sql = "UPDATE study SET study_progress_status = ? WHERE study_id = ? AND study_suggestion = ?";
    studyDB.database.query(sql,params,function(err,data){
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}

studyDB.getList = function(callback){
    var sql = "SELECT * FROM study ORDER BY study_id desc";
    studyDB.database.query(sql, function(err,data){
        console.log(err);
        if(err){
            return callback(false);
        }
        else{
            return callback(data);
        }
    })
}

studyDB.deleteStudy = function(study,callback){
    var params = [];
    for(var data in study){
        params.push(study[data]);
    }
    var sql = "DELETE FROM study WHERE study_id = ? AND study_suggestion = ?";
    studyDB.database.query(sql,params,function(err,data){
        if(err)
            return callback(false);
        else
            return callback(data);
    });
}

// 스터디 신청 관련 DB query function
studyDB.insertApply = function(Item, callback){
    var params = [];
    for(var data in Item){
        params.push(Item[data]);
    }
    var sql = "INSERT INTO apply (study_id,member_email) value(?,?)";
    studyDB.database.query(sql,params,(err,data)=>{
        if(err)
            return callback(false);
        else
            return callback(true);
    });
}

studyDB.deleteApply = function(Item,callback){
    var params = [];
    for(var data in Item){
        params.push(Item[data]);
    }
    var sql = "DELETE FROM apply where study_id = ? AND member_email = ?";
    studyDB.database.query(sql,params,(err,data)=>{
        if(err)
            return callback(false);
        else
            return callback(true);
    })
}
/*
ToDo
mysql에는 insert 문에 where 절을 삽입할 수 없다.(오라클은 가능)

그럼 exist로 확인한 뒤에 OK이면 insert를 해야하는가
*/
studyDB.apporveApply = function(Item, callback){
    var params = [];
    for(var data in Item){
        params.push(Item[data]);
    }
    console.log(params);
    var sql = "INSERT INTO member_join_study (study_id, member_email) values (?,?) FROM study WHERE study_id = ? AND study_suggestion = ?";
    studyDB.database.query(sql,params,(err,data)=>{
        console.log(data);
        console.log(err);
        if(err)
            return callback(false);
        else
            return callback(true);
    })
}
module.exports = studyDB;