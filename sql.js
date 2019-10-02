const mysql      = require('mysql2')

const pool = mysql.createPool({
  connectionLimit : 100,
  host     : '220.230.118.56',    // 호스트 주소
  user     : 'jngsoo',           // mysql user
  password : 'jngsoo2933',       // mysql password
  database : 'todo'         // mysql 데이터베이스
});

// const options = {sql: 'select * from users', rowsAsArray: true};
// pool.query(options, (err, results) => {
//   console.log(results.length)
// });

// // simple query 
// connection.query(
//   'SELECT * FROM `users`',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//   }
// );



module.exports = pool
