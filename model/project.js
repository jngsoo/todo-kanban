const pool = require('../sql.js')
const promisePool = require('../sql.promise')

module.exports = {
    cascadeRemove(project_id) {
        pool.query(`SELECT id 
                    FROM lanes 
                    WHERE project_id = '${project_id}'`, 
                        (err, results) => {
                            const lanes = []
                            results.forEach(lane => {
                                lanes.push(`'${lane.id}'`)
                            })
                            pool.query(`DELETE FROM projects 
                                        WHERE id = '${project_id}'`)}
        )
    },
    async getLastLaneId() {
        return await promisePool.
                    execute(`SELECT id 
                            FROM lanes 
                            ORDER BY id DESC
                            LIMIT 1;`)
    },    
    createLane(newLaneId, projectId, title) {
        pool.query(`INSERT INTO lanes VALUES (
                    '${newLaneId}', 
                    '${projectId}', 
                    '${title}'
                    );`)
    },
    editLaneTitle(ladeId, title) {
        pool.query(`UPDATE lanes SET 
                    name='${title}' 
                    WHERE id = '${ladeId}';`)
    },
    removeLane(ladeId) {
        pool.query(`DELETE FROM lanes 
                    WHERE id = '${ladeId}';`)
    },
    removeTask(taskId) {
        pool.query(`DELETE FROM tasks 
                    WHERE id = '${taskId}';`)
    }
 
}