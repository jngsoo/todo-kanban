const express = require('express')
const router = express.Router()
const util = require('../util/server.util')
const pool = require('../sql')

router.get('/', function (req, res) {
    if (req.user) {     // 이미 로그인한 상태
        return res.redirect('/')
    }
    return res.render('sign_up')
})
router.post('/', function (req, res) { 
    var bodyStr = ''
    req.on("data",function(chunk){
        bodyStr += chunk.toString()
    })
    req.on("end",function(){
        let userInfo = JSON.parse(bodyStr)
        userInfo.admin = 'false'

        pool.query(/*sql*/`
        INSERT INTO users
        VALUES 
        ('${userInfo.id}', '${userInfo.pw}', '${userInfo.name}', '${userInfo.birthdate.join('.')}', '${userInfo.email}', '${userInfo.phone}', '${userInfo.interests.join(',')}', 'false', ${null});
        `)

        res.send('ok')   // 결과를 받은 client는 '/'으로 redirect (../public/javscripts/Sign_up.js : line 351)
    })
})
// id 중복 체크 요청에 따른 응답
router.post('/check', function (req, res) {
    var bodyStr = ''
    let userInfo;
    req.on("data",function(chunk){
        bodyStr += chunk.toString()
    })
    req.on("end",function(){    // send('ok) if userId is unique. Else send('no') (cannot use that id)
        userInfo = JSON.parse(bodyStr)
        res.send('ok')
        // sessionDB.find({ id : `${userInfo.id}`}).value() ? res.send('no') : res.send('ok')
    })
})


module.exports = router