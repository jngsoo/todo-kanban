const express = require('express')
const session = require('express-session')   
const RedisStore = require('connect-redis')(session)        
const router = express.Router()
const pool = require('../sql')

router.get('/', function(req, res, next) {

  if(req.user) { // 로그인 화면 뿌리기
    pool.query(`SELECT * FROM projects where super_user='${req.user.user_id}';`, (err, results) => {
      console.log(results)
      res.render('index', {
        user: req.user.name
      })
    })
  }
  else {
    res.render('index', {
        user: null
    })
  }

})

module.exports = router;
