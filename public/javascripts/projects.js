const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)

$('.authority').addEventListener('click', (e) => {
    $All('.btn-primary').forEach(btn => {
        btn.className = "btn btn-outline-primary"
    }) 
    e.target.className = "btn btn-primary";
})


$('.auth-user-set').addEventListener('click', () => {
    $('#auth-users-input').innerHTML = `
        <label class="col-form-label" for='project-name'>권한 사용자</label> 
        <input type="text" id="project-name" class="form-control">
        `
})

$('#new-pjt-submit').addEventListener('click', () => {
    const url = 'project';
    const data = {
        project_name : $('#project-name').value,
        public : $('#auth-public').className === "btn btn-primary" ? 'true' : 'false'
    };

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => window.location.assign(response['new_url']))
    .catch(error => console.error('Error:', error));
})

// Remove clicked project
$('.projects-container').addEventListener('click', (e) => {
    if (e.target.className.slice(0,3) === 'btn') {
        
        const project = e.target.parentNode
        project.parentNode.removeChild(project)

        const removeTargetId = (e.target.parentNode).querySelector('.project').id

        const url = 'project';
        const data = {
            project_id : removeTargetId
        };
    
        fetch(url, {
        method: 'DELETE', // 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => window.location.assign(response['new_url']))
        .catch(error => console.error('Error:', error));    
    }
    
})
