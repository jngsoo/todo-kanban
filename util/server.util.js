module.exports = {

    
    /**
     * 유저의 쿠키를 분석해 유저 쿠키 정보를 Object로 return 해주는 함수 {쿠키이름(key) : 쿠키값(value), ... }
     * @param {*} request user request
     */
    getCookie(request) {
        const cookieObj = {}
        let originCookie = request.headers.cookie  //'_ga=GA1.1.880093033.156743236','sessionCookie=b4ceb660-d05e-11e9-9b0a-872446fc2032' (primitive cookie format)
        if(originCookie===undefined) return cookieObj
        let cookieName, cookieContent
        cookie = originCookie.split(' ')
        cookie.forEach(c => {
            [cookieName, cookieContent] = c.split("=")
            cookieObj[cookieName] = cookieContent
        })
        return cookieObj   // { _ga: 'GA1.1.880093033.156743236', sessionCookie: 'd58100f0-d060-11e9-a9d9-ede2bc554bdf' }
    },


    /**
     * 접속한 유저가 로그인한 상태인지 확인하는 함수
     * @param {*} req  user request
     * @param {*} DB user info Database ( uuid(key) : {userinfos...}(value) )
     */
    checkLogin(req) {
        if(req.user) {
            return true
        }
        return false
    },


    /**
     * 접속한 유저의 admin 권한을 확인하는 함수
     * @param {*} req user request
     */
    checkAdminAuthority(req) {
        if(req.user === undefined || req.user.admin==='false') {   // admin 권한이 없으면 redirect to root
            return false
        }
        return true
    }

}


