const express = require('express')
const session = require('express-session')   
const RedisStore = require('connect-redis')(session)        
const router = express.Router()
const pool = require('../sql')


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) { // 로그인 화면 뿌리기
      res.render('index', {
        user: req.user.name
      })
  }
  else {
    res.render('index', {
        user: null
    })
  }
})

module.exports = router;
