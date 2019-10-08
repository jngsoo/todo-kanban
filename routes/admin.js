var express = require('express');
var router = express.Router();
const util = require('../util/server.util')
const pool = require('../sql')

router.get('/', util.checkAdminAuthority, function(req, res, next) {
    const options = {sql: `SELECT user_id,name,birthdate,email,phone,interests,admin FROM users`, rowsAsArray: false};
    pool.query(options.sql, (err, results) => {
        const allUserData = results
        res.render('admin',{
            user: req.user,
            usersData: allUserData
        })   
    })
    return
});

router.post('/', util.checkAdminAuthority, function(req, res, next) {
    const unsetAdmin = `UPDATE users SET admin='false' WHERE user_id not in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    const setAdmin = `UPDATE users SET admin='true' WHERE user_id in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    pool.query(unsetAdmin)
    pool.query(setAdmin)
    res.send(req.body.adminUsers)
})

module.exports = router;
