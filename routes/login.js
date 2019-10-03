const express = require('express')
const router = express.Router()
const app = require('../app')
const util = require('../util/server.util')

const passport = require('passport')

router.get('/', function(req,res,next) {
    if(util.checkLogin(req)) {   // 유저가 이미 로그인한 상태라면 메인 화면으로 redirect
        res.redirect('/')
    }
  res.render('login')
})

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect(`${user.user_id}`);
      });
    })(req, res, next);
});


router.post('/logout',function(req,res,next) {
  req.session.destroy()
  res.clearCookie('sid')
  res.redirect('/')
})

module.exports = router