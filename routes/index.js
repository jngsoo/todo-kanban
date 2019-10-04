const express = require('express')    
const router = express.Router()
const pool = require('../sql')
const util = require('../util/server.util')

router.get('/', function(req, res, next) {
    if(req.user) { // 로그인 화면 뿌리기
        res.render('index', {
            user: req.user
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
        console.log(results)
        if (err) console.log(err.message)
        if (!results.length) return res.render('sorry')
        if(req.user) { // 클라이언트가 로그인한 상태
            res.render('projects', {
                user: req.user,
                projects: results
            })
        }
        else {          // 클라이언트가 로그인 안한 상태 
            res.redirect('login')
        }
    })
})

router.get('/:user_id/:project_id', function(req, res, next) {
    pool.query(`SELECT *
                FROM lanes 
                INNER JOIN tasks ON tasks.lane_id = lanes.id
                where project_id = '${req.params.project_id}'
                order by lanes.id;`, (err, results) => {
        if (err) console.log(err.message)
        if (results===undefined || results.length===0) return res.render('sorry')
        if(req.user) { // 클라이언트가 로그인한 상태
            console.log(results)
            results = util.bindTasks(results)
            res.render('project_single', {
                user: req.user,
                lanes: results
            })
        }
        else {          // 클라이언트가 로그인 안한 상태 
            res.redirect('login')
        }
    })
})


module.exports = router;
