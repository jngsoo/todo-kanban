const pool = require('../sql.js')

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
                            pool.query(`DELETE FROM projects WHERE id = '${project_id}'`)}
        )
    },
    editLaneTitle(lane_id, title) {
        pool.query(`UPDATE lanes SET name='${title}' WHERE id = '${lane_id}';`)
    },
    removeLane(lane_id) {
        pool.query(`DELETE FROM lanes WHERE id = '${lane_id}';`)
    },
    removeTask(task_id) {
        pool.query(`DELETE FROM tasks WHERE id = '${task_id}';`)
    }
 
}