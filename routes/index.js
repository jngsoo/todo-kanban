const express = require('express')    
const router = express.Router()
const pool = require('../sql')

router.get('/', function(req, res, next) {

    if(req.user) { // 로그인 화면 뿌리기
        pool.query(`SELECT * FROM projects where super_user='${req.user.user_id}';`, (err, results) => {
            const projects = results
            res.render('index', {
                user: req.user,
                projects: projects
            })
        })
    }

    else {
        res.render('index', {
            user: null
        })
    }
})

router.get('/:user_id', function(req, res, next) {
    pool.query(`SELECT * FROM projects where super_user='${req.params.user_id}';`, (err, results) => {
        if (err) console.log(err.message)
        if (results===undefined) return res.render('error')
        if(req.user) { // 클라이언트가 로그인한 상태
            console.log(results)
            res.render('project', {
                user: req.user,
                projects: results
            })
        }
        else {          // 클라이언트가 로그인 안한 상태 
            res.redirect('login')
        }
    })
})


module.exports = router;
