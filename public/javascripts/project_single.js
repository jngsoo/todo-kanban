const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)



$('.lane-container').addEventListener('click', e => {
    // Remove clicked card
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

    // Set clicked lane title
    else if (e.target.className === 'dropdown-item edit-lane-btn') {
        $All('.edit-lane-btn').forEach(edit_btn => {
            edit_btn.className = "dropdown-item edit-lane-btn"
        }) 
        e.target.className += ' selected-lane'
        const laneTitle = e.target.parentNode.parentNode.parentNode.querySelector('.lane-title').innerHTML
        $('#lane-title').value = laneTitle
    }
})

// Edit clicked lane title
$('#edit-lane-submit').addEventListener('click', e => {

    const editTargetId = $('.selected-lane').parentNode.parentNode.parentNode.parentNode.id
    const newLaneTitle =  $('#lane-title').value
    $(`#${editTargetId}`).querySelector('.lane-title').innerHTML = newLaneTitle

    const url = '/project/lane';
    const data = {
        lane_id : editTargetId,
        lane_title : newLaneTitle
    };

    fetch(url, {
    method: 'PUT', // 
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));    
})

$('#new-pjt-submit').addEventListener('click', () => {
    alert('new pjt submit!')
})
