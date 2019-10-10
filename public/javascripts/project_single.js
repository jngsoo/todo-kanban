const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)



$('.lane-container').addEventListener('click', e => {
    const innerClassName = e.target.className.split(' ')[0]
    // Remove clicked card
    console.log(innerClassName)
    if (innerClassName === 'card-close') {
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
    else if (['edit-lane-name-btn', 'delete-lane-btn'].includes(innerClassName)) {
        $All('.edit-lane-name-btn').forEach(edit_btn => {
            edit_btn.className = "edit-lane-name-btn"
        }) 
        $All('.delete-lane-btn').forEach(edit_btn => {
            edit_btn.className = "delete-lane-btn"
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

$('#delete-lane-confirm').addEventListener('click', e => {

    // Front
    const deleteTargetId = $('.selected-lane').parentNode.parentNode.parentNode.id
    const targetLane = $(`#${deleteTargetId}`)
    targetLane.parentNode.removeChild(targetLane)

    // Back (DB)
    const url = '/project/lane';
    const data = {
        lane_id : deleteTargetId
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

    // console.log($(`#${deleteTargetId}`))

    // alert('del lane confirm!')
})
