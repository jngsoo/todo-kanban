const express = require('express')
const router = express.Router()
const util = require('../util/server.util')
const pool = require('../sql')
const model = require('../model/project')

// 새 프로젝트 생성
router.post('/', util.checkLogin, function (req, res) {

    // 해당 유저의 가장 마지막 프로젝트 아이디 가져오기
    pool.query(`SELECT project_id
                FROM projects
                ORDER BY project_id DESC
                LIMIT 1;`, (err, results) => {
                    if (err) console.log(err.message)
                    if (!results.length) return res.render('sorry')
                    const newPjtId = results[0].project_id + 1
                    // 새 프로젝트 만들기
                    pool.query(`INSERT INTO projects VALUES 
                                (${newPjtId}, 
                                '${req.body.project_name}', 
                                '${req.body.public}', 
                                '${req.user.user_id}', 
                                ${null});`
                    , () => res.send({new_url : `/${req.user.user_id}/${newPjtId}`}))
    })

})

// 기존 프로젝트 삭제
router.delete('/', util.checkLogin, function (req, res, next) {
    model.cascadeRemove(req.body.project_id)
})

// Column 추가 
router.post('/lane', util.checkLogin, function (req, res, next) {
    model.createLane(req.body.lane_id, req.body.project_id, req.body.lane_title)
    model.pushLog(null, req.body.project_id, req.user.user_id, req.body.lane_title, '추가', '', '') 
    return res.send({msg: 'lane added'})
})

// Column 이름 수정
router.put('/lane', util.checkLogin, function (req, res, next) {
    const laneId = req.body.lane_id
    const newTitle = req.body.new_lane_title
    const originTitle = req.body.origin_lane_title
    model.editLaneTitle(laneId, newTitle)
    model.pushLog(null, req.body.project_id, req.user.user_id, originTitle, '수정', originTitle, newTitle) 
    res.send({msg : 'done'})
})

router.get('/new_lane_id', util.checkLogin, async function (req, res, next) {
    const lastLaneId = await model.getLastLaneId()
    const newLaneId = Number(lastLaneId[0][0].lane_id) + 1
    res.send({newLaneId : newLaneId})
})

router.get('/new_task_id', util.checkLogin, async function (req, res, next) {
    const lastTaskId = await model.getLastTaskId()
    const newTaskId = Number(lastTaskId[0][0].task_id) + 1
    res.send({newTaskId : newTaskId})
})

router.post('/task', util.checkLogin, function(req, res, next) {
    model.createTask(req.body.task_id,
                     req.body.frg_lane_id,
                     req.body.task_title,
                     req.body.task_content)
})

// Column 삭제
router.delete('/lane', util.checkLogin, function (req, res, next) {
    model.removeLane(req.body.lane_id)
    model.pushLog(null, req.body.project_id, req.user.user_id, req.body.lane_title, '삭제', '', '') 
    return
})

router.delete('/task', util.checkLogin, function (req, res, next) {
    model.removeTask(req.body.task_id)
    return
})


module.exports = router