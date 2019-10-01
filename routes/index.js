const express = require('express')
const session = require('express-session')   
const RedisStore = require('connect-redis')(session)        
const router = express.Router()
const sql = require('../sql')


// using sync-mysql on sql.js
const getCarouselData = () => {
  const getCardQuery = `SELECT * FROM cards_data`
  let carousel_json_data = sql.query(getCardQuery)
  carousel_json_data.forEach(card => {
      card['carousel'] = sql.query(`
          SELECT * FROM ${card.title.toLowerCase()}
      `)
  })
  return carousel_json_data
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const carouselData = getCarouselData()
  if(req.user) { // 로그인 화면 뿌리기
      res.render('index', {
        user: req.user.name,
        carouselData: carouselData
      })
  }
  else {
    res.render('index', {
        user: null,
        carouselData: carouselData
    })
  }
})

module.exports = router;
