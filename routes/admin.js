var express = require('express');
var router = express.Router();
const util = require('../util/server.util')
const sql = require('../sql')

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(util.checkAdminAuthority(req)) {   // admin 권한 check 
        let allUserData = sql.query(`SELECT id,name,birthdate,email,phone,interests,admin FROM users`)
        res.render('admin',{
            user: req.user.name,
            usersData: allUserData
        });
        return res.end()   // https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
    }
    return res.redirect('/')

});

router.post('/', function(req, res, next) {
    console.log() // [ 'wt2933', 'gohome' ]
    const unsetAdmin = `UPDATE users SET admin='false' WHERE id not in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    const setAdmin = `UPDATE users SET admin='true' WHERE id in (${JSON.stringify(req.body.adminUsers).slice(1,-1)})`
    sql.query(unsetAdmin)
    sql.query(setAdmin)
    res.send(req.body.adminUsers)
})

module.exports = router;
