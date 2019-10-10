const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit: 100,
    host     : '220.230.118.56',    // 호스트 주소
    user     : 'jngsoo',           // mysql user
    password : 'jngsoo2933',       // mysql password
    database : 'todo',         // mysql 데이터베이스
    charset: 'utf8'
});


// init()


async function init() {
  console.log('Database initializing start')
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
    connectionLimit : 100,
    host     : '220.230.118.56',    // 호스트 주소
    user     : 'jngsoo',           // mysql user
    password : 'jngsoo2933',       // mysql password
    database : 'todo',         // mysql 데이터베이스
    charset: 'utf8'
  });

  connection.execute(`DROP TABLE IF EXISTS tasks`).then(
  connection.execute(`DROP TABLE IF EXISTS log`)).then(
  connection.execute(`DROP TABLE IF EXISTS auth_users`)).then(
  connection.execute(`DROP TABLE IF EXISTS lanes`)).then(
  connection.execute(`DROP TABLE IF EXISTS projects`)).then(
  connection.execute(`DROP TABLE IF EXISTS users`)).then(
  connection.execute(`            
    CREATE TABLE users (
    user_id varchar(25) NOT NULL,
    pw varchar(25) NOT NULL,
    name varchar(25) NOT NULL,
    birthdate varchar(25),
    email varchar(25),
    phone varchar(25),
    interests varchar(25),
    admin varchar(8) NOT NULL DEFAULT 'false',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)) 
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO users VALUES (
          'admin', 'admin', '관리자', 
          '2019.01.01', 'admin@admin.com', 
          '01053762932', '영화', 'true', ${null});`)).then(
        connection.execute(`
            INSERT INTO users VALUES (
            'super', 'super', '관리자22', 
            '2019.01.01', 'super@super.com', 
            '01053762932', '영화', 'true', ${null});`)).then(
        connection.execute(`
          INSERT INTO users VALUES (
          'wt2933', 'wt2933', '정수', 
          '2019.03.29', 'asd@fwe.com', 
          '01053762932', '영화', 'false', ${null});`)).then(
        connection.execute(`
          INSERT INTO users VALUES (
          'jngsoo', 'jngsoo', '정수', 
          '2019.03.29', 'asd@fwe.com', 
          '01053762932', '영화', 'false', ${null});`)).then(
        connection.execute(`
          INSERT INTO users VALUES (
          'test', 'test', '정수', 
          '2019.03.29', 'asd@fwe.com', 
          '01053762932', '영화', 'false', ${null});`)).then(
  connection.execute(`
    CREATE TABLE projects (
    project_id INT(255) NOT NULL,
    name VARCHAR(45) NOT NULL,
    read_auth_public VARCHAR(45),
    super_user VARCHAR(45),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id),
    FOREIGN KEY (super_user) REFERENCES users(user_id)
    ON DELETE CASCADE)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO projects VALUES (
          1, 'Server-Todo', 'true', 
          'super', ${null});`)).then(
        connection.execute(`
          INSERT INTO projects VALUES (
          2, 'Front-Todo', 'true', 
          'super', ${null});`)).then(
        connection.execute(`
          INSERT INTO projects VALUES (
          3, 'Server-Todo', 'true', 
          'jngsoo', ${null});`)).then(
        connection.execute(`
          INSERT INTO projects VALUES (
          4, 'My Todo', 'true', 
          'wt2933', ${null});`)).then(
  connection.execute(`
    CREATE TABLE lanes (
    lane_id INT(255) NOT NULL,
    project_id INT(255) NOT NULL,
    name VARCHAR(45) NOT NULL,
    PRIMARY KEY (lane_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
    ON DELETE CASCADE)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          1, 1, 'Todo');`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          2, 1, 'Doing');`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          3, 1, 'Done');`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          4, 2, 'Todo');`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          5, 2, 'Doing');`)).then(
        connection.execute(`
          INSERT INTO lanes VALUES (
          6, 2, 'Done');`)).then(
  connection.execute(`
    CREATE TABLE auth_users (
    user_id varchar(45) NOT NULL,
    project_id INT(255) NOT NULL,
    auth_type VARCHAR(45) NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
    ON DELETE CASCADE)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO auth_users VALUES (
          'super', 1, 'edit');`)).then(
  connection.execute(`
    CREATE TABLE log (
    log_id varchar(45) NOT NULL,
    project_id INT(255) NOT NULL,
    user VARCHAR(45) NOT NULL,
    object VARCHAR(45) NOT NULL,
    action VARCHAR(45) NOT NULL,
    origin VARCHAR(45),
    target VARCHAR(45),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (log_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
    ON DELETE CASCADE)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO log VALUES (
          'log1', 1, 'super', '공부하기', '추가', ${null}, ${null}, ${null});`)).then(
        connection.execute(`
          INSERT INTO log VALUES (
          'log2', 1, 'super', '운동하기', '추가', ${null}, ${null}, ${null});`)).then(
  connection.execute(`
    CREATE TABLE tasks (
    task_id INT(255) NOT NULL,
    frg_lane_id INT(255) NOT NULL,
    title VARCHAR(45) NOT NULL,
    content VARCHAR(45),
    img VARCHAR(45),
    file VARCHAR(45),
    next VARCHAR(45),
    prev VARCHAR(45),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id),
    FOREIGN KEY (frg_lane_id) REFERENCES lanes(lane_id)
    ON DELETE CASCADE)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;`)).then(
        connection.execute(`
          INSERT INTO tasks VALUES (
          1, 2, '공부하기', '내용내용', ${null}, ${null}, ${null}, ${null}, ${null});`)).then(
        connection.execute(`
          INSERT INTO tasks VALUES (
          2, 2, '물마시기', '내용내용', ${null}, ${null}, ${null}, ${null}, ${null});`)).then(
        connection.execute(`
          INSERT INTO tasks VALUES (
          3, 1, '운동하기', '내용내용', ${null}, ${null}, ${null}, ${null}, ${null});`)).then(
        connection.execute(`
          INSERT INTO tasks VALUES (
          4, 3, '밥먹기', '내용내용', ${null}, ${null}, ${null}, ${null}, ${null});`)).then(
        connection.execute(`
          INSERT INTO tasks VALUES (
          5, 4, '~~하기', '내용내용', ${null}, ${null}, ${null}, ${null}, ${null});`)).then(
  () => {
    connection.end()
    console.log('Database initializing end')
  })
  
  
}




module.exports = pool
