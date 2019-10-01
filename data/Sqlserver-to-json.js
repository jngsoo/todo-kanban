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

module.exports = getCarouselData
















// node native promisify
// const query = util.promisify(sql.query).bind(sql);

// async function getCarousels(cards)  {
//     try {
//         cards.forEach( async card => {
//             card['carousel'] = JSON.parse(JSON.stringify(await query(`SELECT * FROM ${card.title.toLowerCase()}`)))
//         })
//       // cards.forEach(async card => {
//       //     let data = await query(`SELECT * FROM ${card.title.toLowerCase()}`)
//       //     card['carousel'] = JSON.parse(JSON.stringify(data))
//       // })
//       console.log(cards)
      
//       return cards
      
//     } finally {
//       sql.end();
//     }
//   }

// async function getCards()  {
//   try {
//     const cards = JSON.parse(JSON.stringify(await query('SELECT * FROM cards_data')));
//     // cards.forEach(async card => {
//     //     let data = await query(`SELECT * FROM ${card.title.toLowerCase()}`)
//     //     card['carousel'] = JSON.parse(JSON.stringify(data))
//     // })
//     getCarousels(cards)
//     console.log(cards)
//     return cards
    
//   } finally {
//     sql.end();
//   }
// }

// console.log(getCards())




