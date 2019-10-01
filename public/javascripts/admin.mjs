const $ = elem => document.querySelector(elem)
const $All = elem => document.querySelectorAll(elem)

function postData(url = '', data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }

const queryAdminChange = () => {
    const adminChecked = $All('.admin:checked')
    const adminCheckedUsers = []
    adminChecked.forEach(user => {
        adminCheckedUsers.push(user.parentNode.parentNode.querySelector('.userid').textContent)
    })
    // console.log(adminCheckedUsers)
    postData('/admin', {adminUsers: adminCheckedUsers}).then( (data) => {
        alert(`${data}\n 관리자 설정 완료`)
        location.replace('/admin')
    })
  
}

$('.admin-btn').addEventListener('click',queryAdminChange)
