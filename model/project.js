const pool = require('../sql.js')
const promisePool = require('../sql.promise')

module.exports = {
    cascadeRemove(project_id) {
        pool.query(`SELECT lane_id 
                    FROM lanes 
                    WHERE project_id = '${project_id}'`, 
                        (err, results) => {
                            const lanes = []
                            results.forEach(lane => {
                                lanes.push(`'${lane.id}'`)
                            })
                            pool.query(`DELETE FROM projects 
                                        WHERE project_id = '${project_id}'`)}
        )
    },
    async getLastLaneId() {
        return await promisePool.
                    execute(`SELECT lane_id 
                            FROM lanes 
                            ORDER BY lane_id DESC
                            LIMIT 1;`)
    },    
    createLane(newLaneId, projectId, title) {
        pool.query(`INSERT INTO lanes VALUES (
                    '${newLaneId}', 
                    '${projectId}', 
                    '${title}'
                    );`)
    },
    editLaneTitle(laneId, title) {
        pool.query(`UPDATE lanes SET 
                    name='${title}'
                    WHERE lane_id = '${laneId}';`)
    },
    removeLane(laneId) {
        pool.query(`DELETE FROM lanes 
                    WHERE lane_id = '${laneId}';`)
    },
    removeTask(taskId) {
        pool.query(`DELETE FROM tasks 
                    WHERE task_id = '${taskId}';`)
    }
 
}