var mysql = require('mysql');
var configs = require('../config');
// require('dotenv').config();
// import dotenv from 'dotenv';
// dotenv.config();
// var db = {};
// db.tsu = mysql.createConnection({
//     host: 'localhost:3306 or remote 접속 url',
//     user: 'DB root 계정 사용자',
//     password: 'DB 접속시 필요한 PW',
//     port: 3306,
//     database: '해당 공간에 들어있는 DB 이름'
// host: process.env.host,
//             port: process.env.port,
//             user: process.env.user,
//             password: process.env.password,
//             database: process.env.database 
// });
const dbConnection = {
    init: function(){
        return mysql.createConnection({
            host: configs.host,
            port: configs.port,
            user: configs.user,
            password: configs.password,
            database: configs.database 
        });
    },
    open: function(connect){
        connect.connect(err => {
            if(err){
                console.log("DB 연결 실패!");
                console.log("원인 : "+err);
            }
            else{
                console.log("DB 연결 성공!");
            }
        });
    },
    close: function(connect){
        connect.end(err => {
            if(err){
                console.log("DB 연결 종료 실패!");
                console.log("원인 : "+err);
            }
            else{
                console.log("DB 연결 종료 성공!");
            }
        })
    }
}
module.exports = dbConnection;