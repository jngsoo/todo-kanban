const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    connectionLimit: 100,
    host     : '220.230.118.56',    // 호스트 주소
    user     : 'jngsoo',           // mysql user
    password : 'jngsoo2933',       // mysql password
    database : 'todo',         // mysql 데이터베이스
    charset: 'utf8'
});


module.exports = pool
