const pool = require('../sql.js')
const promisePool = require('../sql.promise')


module.exports = {
    cascadeRemove(project_id) {
        pool.query(`DELETE FROM projects 
                    WHERE project_id = '${project_id}'`)
    },
    async getLastLaneId() {
        return await promisePool.
                    execute(`SELECT lane_id 
                            FROM lanes 
                            ORDER BY lane_id DESC
                            LIMIT 1;`)
    },    
    async getLastTaskId() {
        return await promisePool.
                    execute(`SELECT task_id 
                            FROM tasks 
                            ORDER BY task_id DESC
                            LIMIT 1;`)
    },    
    createLane(newLaneId, projectId, title) {
        pool.query(`INSERT INTO lanes VALUES (
                    '${newLaneId}', 
                    '${projectId}', 
                    '${title}'
                    );`)
    },
    createTask(newTaskId, laneId, title, content, img, file, next, prev) {
        pool.query(`INSERT INTO tasks VALUES (
                    ${newTaskId},
                    ${laneId},
                    '${title}',
                    '${content}',
                    ${null},
                    ${null},
                    ${null},
                    ${null},
                    ${null}
                    );`)
    },
    editLaneTitle(laneId, title) {
        pool.query(`UPDATE lanes SET 
                    name = '${title}'
                    WHERE lane_id = ${laneId};`)
    },
    removeLane(laneId) {
        pool.query(`DELETE FROM lanes 
                    WHERE lane_id = ${laneId};`)
    },
    removeTask(taskId) {
        pool.query(`DELETE FROM tasks 
                    WHERE task_id = ${taskId};`)
    },
    pushLog(logId, projectId, user, object, action, origin=null, target=null, time=null) {
        console.log(logId, projectId, user, object, action, origin, target, time)
        pool.query(`INSERT INTO log VALUES (
                null,
                ${projectId},
                '${user}',
                '${object}',
                '${action}',
                '${origin}',
                '${target}',
                ${time}
        );`)
    }
 
}