var connection = require('../../../../config/database');
const util = require('./util');
var utilDB = {};
//database config 내부에서 init시 생성되는 DB connection을 객체로 들고 있어 반환하는 함수가 필요.
utilDB.database = connection.init();
/*
Columns

skill Category
skill_no Integer,
skill_title varchar(45),

job Category
job_no Integer,
job_title varchar(45),
*/

/*
Get Job Category List API
TSU 가입시 사용되는 본캐,부캐의 카테고리 리스트를 불러오는 API
기타를 등록할 시 insert하는 행위를 시행 -> 무분별한 추가로 인한 DB에 무리가 갈 수 있다는 단점을 갖고 있다.
기타는 그냥 기입을 통해 member에 넣어주기로 함.
*/
utilDB.getJobCategoryList = function(callback){
    var sql = "SELECT * FROM job_category";
    utilDB.database.query(sql,(error,data)=>{
        if(error)
            return callback(false);
        else
            return callback(data);
    })
}

/*
Get Skill Category List API
스터디등록시 사용되는 스킬의 카테고리 리스트를 불러오는 API
기타를 등록할 시 insert하는 행위를 시행 -> 무분별한 추가로 인한 DB에 무리가 갈 수 있다는 단점을 갖고 있다.
기타는 그냥 기입을 통해 member에 넣어주기로 함.
*/
utilDB.getSkillCategoryList = function(callback){
    var sql = "SELECT * FROM skill_category";
    utilDB.database.query(sql,(error,data)=>{
        if(error)
            return callback(false);
        else
            return callback(data);
    })
}

module.exports = utilDB;