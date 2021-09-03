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
module.exports = studyDB;