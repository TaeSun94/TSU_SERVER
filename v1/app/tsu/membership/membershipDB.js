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
    var params = [member.member_email,member.member_password, member.member_name, member.member_major, member.member_minor];
    var sql = "INSERT INTO MEMBER (member_email, member_password, member_name, major, minor)VALUE(?,?,?,?,?)";
    membershipDB.database.query(sql,params, function(err){
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}
membershipDB.modifyMember = function(member, callback){
    console.log(member);
    var params = [member.member_password, member.member_name, member.member_major, member.member_minor, member.member_email];
    var sql = "UPDATE MEMBER SET member_password = ?, member_name = ?, member_major = ?, member_minor = ? WHERE member_email = ?";
    membershipDB.database.query(sql,params, function(err){
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}
membershipDB.deleteMember = function(member, callback){
    console.log(member);
    var params = [member.member_email];
    var sql = "DELETE FROM member WHERE member_email = ?";
    membershipDB.database.query(sql,params, function(err, result){
        console.log(result);
        if(err){
            return callback(false);
        }
        else{
            return callback(true);
        }
    });
}
membershipDB.getMember = function(member, callback){
    console.log(member);
    var params = [member.member_email,member.member_password];
    var sql = "SELECT * FROM member WHERE member_email = ? AND member_password = ?";
    membershipDB.database.query(sql,params, function(err,result){
        if(err){
            return callback(false);
        }
        else{
            return callback(result);
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
            console.log("database check email query err in membershipDB  : "+err);
            return callback(err);
        }
        else{
            // console.log(result);
            return callback(result);
        }
    });
};

module.exports = membershipDB;