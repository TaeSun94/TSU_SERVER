var mysql = require('mysql');
var db = {};
db.tsu = mysql.createConnection({
    host: 'localhost:3306 or remote 접속 url',
    user: 'DB root 계정 사용자',
    password: 'DB 접속시 필요한 PW',
    port: 3306,
    database: '해당 공간에 들어있는 DB 이름'
});