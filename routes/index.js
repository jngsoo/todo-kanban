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

router.get('/:user_id', util.checkLogin, function(req, res, next) {
    pool.query(`SELECT * FROM users where user_id = '${req.params.user_id}';`, (err, results) => {
        if (err) console.log(err.message)
        if (!results.length) return res.render('sorry')
        else {
            pool.query(`SELECT * FROM projects where super_user='${req.params.user_id}';`, (err, results) => {
                if (err) console.log(err.message)
                return res.render('projects', {
                    user: req.user,
                    projects: results
                })
            })
        }
    })

})

router.get('/:user_id/:project_id', util.checkLogin, function(req, res, next) {
    pool.query(`SELECT *
                FROM lanes 
                LEFT JOIN tasks ON tasks.frg_lane_id = lanes.lane_id
                where project_id = '${req.params.project_id}'
                order by lanes.lane_id;`, 
    (err, results) => {
        const lanes = util.bindTasks(results)
        pool.query(`SELECT name FROM projects where project_id = '${req.params.project_id}';`, 
        (err, result) => {
            const projectName = result[0].name
            pool.query(`SELECT * FROM log where project_id = '${req.params.project_id}' ORDER BY time DESC;`,
            (err, results) => {
                const logs = results
                return res.render('project_single', {
                    user: req.user,
                    project_name: projectName,
                    lanes: lanes,
                    logs : logs
                })
            })

        })

    })
})



module.exports = router;
