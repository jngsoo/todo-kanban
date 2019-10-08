const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)

// $('.authority').addEventListener('click', (e) => {
//     $All('.btn-primary').forEach(btn => {
//         btn.className = "btn btn-outline-primary"
//     }) 
//     e.target.className = "btn btn-primary";
// })


// Remove clicked card
$('.lane-container').addEventListener('click', (e) => {
    if (e.target.className === 'card-close') {
        const targetCard = e.target.parentNode.parentNode
        targetCard.parentNode.removeChild(targetCard)

        const removeTargetId = targetCard.id
        const url = '/project/task';
        const data = {
            task_id : removeTargetId
        };
    
        fetch(url, {
        method: 'DELETE', // 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));    

    }
    

})