const express = require('express')
const router = express.Router()
const util = require('../util/server.util')
const pool = require('../sql')
const model = require('../model/project')

router.post('/', util.checkLogin, function (req, res) {

    // 해당 유저의 가장 마지막 프로젝트 아이디 가져오기
    pool.query(`SELECT id
                FROM projects
                WHERE id LIKE '${req.user.user_id}%'
                ORDER BY id DESC
                LIMIT 1;`, (err, results) => {
                    if (err) console.log(err.message)
                    if (!results.length) return res.render('sorry')
                    const newPjtId = results[0].id.slice(0,-1) + (+results[0].id.slice(-1) + 1)
                    // 새 프로젝트 만들기
                    pool.query(`INSERT INTO projects VALUES 
                                ('${newPjtId}', 
                                '${req.body.project_name}', 
                                '${req.body.public}', 
                                '${req.user.user_id}', 
                                ${null});`
                    , () => res.send({new_url : `/${req.user.user_id}/${newPjtId}`}))
    })

})

router.put('/lane', util.checkLogin, function (req, res, next) {
    const laneId = req.body.lane_id
    const newTitle = req.body.lane_title
    model.editLaneTitle(laneId, newTitle)
})

router.delete('/', util.checkLogin, function (req, res, next) {
    model.cascadeRemove(req.body.project_id)
})

router.delete('/task', util.checkLogin, function (req, res, next) {
    model.removeTask(req.body.task_id)
})


module.exports = router