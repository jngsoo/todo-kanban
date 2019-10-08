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
                            pool.query(`DELETE FROM tasks WHERE lane_id IN (${lanes.join(',')})`, () => {
                                pool.query(`DELETE FROM lanes WHERE project_id = '${project_id}'`, () => {
                                    pool.query(`DELETE FROM auth_users WHERE project_id = '${project_id}'`, () => {
                                        pool.query(`DELETE FROM log WHERE project_id = '${project_id}'`, () => {
                                            pool.query(`DELETE FROM projects WHERE id = '${project_id}'`)
                                        })
                                    })
                                }) 
                            })
                        }
        )
    },
    removeTask(task_id) {
        pool.query(`DELETE FROM tasks WHERE id = '${task_id}';`)
    }
}


// SELECT * FROM Customers
// WHERE Country IN ('Germany', 'France', 'UK');


