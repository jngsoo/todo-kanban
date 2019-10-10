const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)
const projectId = Number(window.location.href.split('/').pop())

$('.lane-container').addEventListener('click', e => {
    const innerClassName = e.target.className.split(' ')[0]
    // Remove clicked card
    if (innerClassName === 'card-close') {
        const targetCard = e.target.parentNode.parentNode
        targetCard.parentNode.removeChild(targetCard)

        const removeTargetId = targetCard.id.slice(1)
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
    else if (['add-task-btn','edit-lane-name-btn', 'delete-lane-btn'].includes(innerClassName)) {
        $All('.edit-lane-name-btn').forEach(edit_btn => {
            edit_btn.className = "edit-lane-name-btn"
        }) 
        $All('.delete-lane-btn').forEach(edit_btn => {
            edit_btn.className = "delete-lane-btn"
        }) 
        $All('.add-task-btn').forEach(edit_btn => {
            edit_btn.className = "delete-lane-btn"
        }) 
        e.target.className += ' selected-lane'
        const laneTitle = e.target.parentNode.parentNode.parentNode.querySelector('.lane-title').innerHTML
        $('#lane-title').value = laneTitle
    }
})

$('#create-lane-submit').addEventListener('click', e => {

    let newLaneId

    //Front
    // Get new lane id and create new lane
    let url = '/project/new_lane_id';
    fetch(url, {
    method: 'GET', // 
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => {
        newLaneId = response.newLaneId
        newLaneTitle = $('#create-lane-title').value
        createNewLane(newLaneId, newLaneTitle)     // Create new lane (Front)

        url = '/project/lane';                      // Create new lane (Back)
        const data = {
            lane_id : newLaneId,
            project_id : projectId,
            lane_title : newLaneTitle
        };
        fetch(url, {
        method: 'POST', // 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));    
    })
    .catch(error => console.error('Error:', error));    


})

// Edit clicked lane title
$('#edit-lane-submit').addEventListener('click', e => {

    const editTargetId = $('.selected-lane').parentNode.parentNode.parentNode.id
    const originLaneTitle = $('.selected-lane').parentNode.parentNode.querySelector('.lane-title').innerHTML
    const newLaneTitle =  $('#lane-title').value
    $(`#${editTargetId}`).querySelector('.lane-title').innerHTML = newLaneTitle

    const url = '/project/lane';
    const data = {
        lane_id : Number(editTargetId.slice(1)),
        project_id : projectId,
        new_lane_title : newLaneTitle,
        origin_lane_title : originLaneTitle
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

$('#delete-lane-confirm').addEventListener('click', e => {

    // Front
    const deleteTargetId = $('.selected-lane').parentNode.parentNode.parentNode.id.slice(1)
    const targetLane = $(`#l${deleteTargetId}`)
    targetLane.parentNode.removeChild(targetLane)

    // Back (DB)
    const url = '/project/lane';
    const data = {
        lane_id : deleteTargetId
    };  
    console.log(data)

    fetch(url, {
    method: 'DELETE', 
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));    
})

$('#create-task-submit').addEventListener('click', () => {

    // Front
    const newTaskTitle = $('#create-task-title').value
    const newTaskContent = $('#create-task-content').value
    const targetLaneId = createNewTask('임시id', newTaskTitle, newTaskContent) // 새로운 카드 그리는 동시에 target lane id 값 가져옴
    $('#create-task-title').value = ''
    $('#create-task-content').value = ''

    // Back (DB)

    // Get new task id 
    let url = '/project/new_task_id';
    fetch(url, {
    method: 'GET', // 
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => {
        let newTaskId = response.newTaskId
        url = '/project/task';                      // Create new lane (Back)
        const data = {
            task_id : newTaskId,
            frg_lane_id : Number(targetLaneId),
            task_title : newTaskTitle,
            task_content : newTaskContent
        };
        fetch(url, {
        method: 'POST', // 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => {console.log(response)})
        .catch(error => console.error('Error:', error));    
    })
    .catch(error => console.error('Error:', error));  
 
})



const createNewLane = (id, title) => {
    const newLane = document.createElement('div');
    newLane.innerHTML = /*html*/`
                        <div class="lane" id="l${id}">
                            <div class="lane-header">
                                <div class="lane-title">${title}</div>
                                <div class="icons">
                                    <a class="edit-lane-name-btn" data-toggle="modal" data-target="#edit-lane-form" data-whatever="@getbootstrap">✍</a>
                                    <a class="add-task-btn" data-toggle="modal" data-target="#create-task-form" data-whatever="@getbootstrap">➕</a>
                                    <a class="delete-lane-btn" data-toggle="modal" data-target="#delete-lane-check" data-whatever="@getbootstrap">✘</a>
                                </div>
                            </div>
                        </div>`
    $('.lane-add').insertAdjacentElement('beforebegin', newLane)
    $('#create-lane-title').value = ''
}

const createNewTask = (newTaskId, title, content) => {
    const newTask = document.createElement('div');
    newTask.innerHTML = /*html*/`
                        <div class="card" id="t${newTaskId}">
                            <div class="card-body">
                                <div class="card-close">✘</div>
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${content}</p>
                            </div>
                        </div>
                        `
    const selectedLane = $('.selected-lane').parentNode.parentNode.parentNode
    selectedLane.insertAdjacentElement('beforeend', newTask)
    return selectedLane.id.slice(1)
}