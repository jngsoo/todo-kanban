const json = require('./carousel.json')
const pool = require('../sql')

let INDEX = 0


console.log(json[INDEX].carousel.length)

json[INDEX].carousel.forEach(carousel => {
    pool.query(`
    INSERT INTO ${json[INDEX].title.toLowerCase()}
    VALUES 
    ('${carousel.img}', '${carousel.category_name}', '${carousel['category-color']}', '${carousel.title}', '${carousel.content}', '${carousel.detail_comment}', '${carousel.detail_href}')
    `)
});

