var express = require('express');
var router = express.Router();
const util = require('../util/server.util')
const pool = require('../sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    if(util.checkAdminAuthority(req)) {   // admin 권한 check 
        const options = {sql: `SELECT user_id,name,birthdate,email,phone,interests,admin FROM users`, rowsAsArray: false};
        pool.query(options.sql, (err, results) => {
            const allUserData = results
            res.render('admin',{
                user: req.user.name,
                usersData: allUserData
            })   
        })
        return
    }
    return res.redirect('/')


});

router.post('/', function(req, res, next) {
    console.log() // [ 'wt2933', 'gohome' ]
    const unsetAdmin = `UPDATE users SET admin='false' WHERE id not in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    const setAdmin = `UPDATE users SET admin='true' WHERE id in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    pool.query(unsetAdmin)
    pool.query(setAdmin)
    res.send(req.body.adminUsers)
})

module.exports = router;
