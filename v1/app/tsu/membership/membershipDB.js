var connection = require('../../../../config/database');
var membershipDB = {};
//database config 내부에서 init시 생성되는 DB connection을 객체로 들고 있어 반환하는 함수가 필요.
membershipDB.database = connection.init();
/*
memeber table columns

id int AI PK
member_email varchar(45)
member_password varchar(45)
member_name varchar(45)
major varchar(45)
minor varchar(45)
*/
membershipDB.signUpGenereal = ({props}) => {

}
membershipDB.insertMember = function(member, callback){
    console.log(member);
    var params = [];
    var sql = "INSERT INTO MEMBER VALUE()";
    membershipDB.database.query(sql,params, function(err,result){
        if(err){

        }
        else{

        }
    });
}
membershipDB.checkEmail = function(member_email, callback){
    console.log(member_email);
    var params = [member_email];
    var sql = "SELECT COUNT(*) AS COUNT FROM member WHERE member_email = ?";
    // let [err, result] = async() =>{

    // }
    membershipDB.database.query(sql, params, function(err, result){
        if(err){
            console.log("database query err in membershipDB  : "+err);
            return callback(err);
        }
        else{
            // console.log(result);
            return callback(result);
        }
    });
};

module.exports = membershipDB;