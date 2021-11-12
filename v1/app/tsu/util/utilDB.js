var connection = require('../../../../config/database');
var utilDB = {};
//database config 내부에서 init시 생성되는 DB connection을 객체로 들고 있어 반환하는 함수가 필요.
utilDB.database = connection.init();

module.exports = utilDB;