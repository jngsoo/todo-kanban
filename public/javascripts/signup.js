'use strict';
let existId = false
const $ = elem => document.querySelector(elem)

function printStateMsg(location, msg, color) {
        $(location).style.color = color;
        $(location).innerHTML = msg;
}
function checkId(userId){
        const id_re = /^([a-z0-9\-_]){5,20}$/g;
        if (userId === '' || userId===undefined) {
            printStateMsg('.idState','아이디를 입력하세요.','red');
        } else if (existId) {
            printStateMsg('.idState','이미 존재하는 아이디입니다.','red');
        } else if (!id_re.test(userId)) {
            printStateMsg('.idState','5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.','red');
        } else {
            printStateMsg('.idState','사용 가능한 아이디입니다.','green');
            return true;
        }
    }
function checkPassword() {
        let userPw = $('#pw').value
        const pw_re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/g;
        let msg = '';
        let color = 'green';
        if (userPw === '' || userPw === undefined) {
            color = 'red';
            msg = '비밀번호를 입력하세요.'
        } else if (!pw_re.test(userPw)) {
            if (userPw.length < 8 || userPw.length > 16) {
                msg = '8자 이상 16자 이하로 입력해주세요.';
            } else if (!/([^A-Z])+([0-9a-z])+([^0-9a-z])/g.test(userPw)) {
                msg = '영문 대문자를 최소 1자 이상 포함해주세요.';
            } else if (!/[0-9]/g.test(userPw)) {
                msg = '숫자를 최소 1자 이상 포함해주세요.';
            } else if (!/[^A-Za-z0-9]/g.test(userPw)) {
                msg = '특수문자를 최소 1자 이상 포함해주세요.';
            } else if (!/[a-z]/g.test(userPw)) {
                msg = '영문 소문자를 최소 1자 이상 포함해주세요.';
            } else {
                msg = '8~16자의 영문 대, 소문자, 숫자, 특수문자의 조합이어야 합니다.'
            }
            printStateMsg('.pwState',msg,'red');
            return false;
        } else {
            msg = '안전한 비밀번호입니다.';
            printStateMsg('.pwState',msg,color);
            return true;
        }
        printStateMsg('.pwState',msg,color);
    }
function checkIfPwTwin() {
        let userPw = $('#pw').value
        if (checkPassword()===false) {
            printStateMsg('.pwConfirmState','8~16자의 영문 대, 소문자, 숫자, 특수문자의 조합이어야 합니다.','red');
            return;
        }
        if (userPw === '') {
            printStateMsg('.pwConfirmState','비밀번호를 입력하세요.','red');
            return;
        }
        if (userPw !== $("#pw_confirm").value) {
            printStateMsg('.pwConfirmState','비밀번호가 일치하지 않습니다.','red');
        } else {
            printStateMsg('.pwConfirmState','비밀번호가 일치합니다.','green');
            return true;
        }
    }
function checkEmail() {
        const email_re = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z]{2,3}$/g;
        const userEmail = $('#email').value;
        if (userEmail === '') {
            printStateMsg('.emailState','이메일을 입력하세요.','red');
        }
        else if (!email_re.test(userEmail)) {
            printStateMsg('.emailState','이메일 형식에 맞게 입력해주세요.','red');
        }
        else { // 정상
            printStateMsg('.emailState','','green');
            return true;
        }
    }
function checkYear() {
        let year = $('#year').value;
        if (year < 1920 || year > 2015) {
            printStateMsg('.yearState','태어난 연도 4자리를 정확하게 입력하세요.','red');
        } else {
            printStateMsg('.yearState','','green');
            return true;
        }
    }
function checkPhone() {
        const phone_re = /^[010]{3}[0-9]{7,8}$/g;
        const userPhone = $('#phone').value;
        if (!phone_re.test(userPhone)) {
            printStateMsg('.phoneState','형식에 맞지 않는 번호입니다.','red');
        } else {
            printStateMsg('.phoneState','','green');
            return true;
        }
    }
function checkScrolled(window) {
        if (window.scrollHeight - window.scrollTop === window.clientHeight) {
            $("#agree").style.backgroundColor = 'lightblue';
            $("#agree").style.color = 'white';
            $("#agree").disabled = false;
        }
    }
function checkInterestLength() {
        const interestLength = document.querySelectorAll('.interestTag').length
        if (interestLength<3) {
            printStateMsg('.interestState','관심사를 3개 이상 입력해주세요.','red');
        }
        else {
            printStateMsg('.interestState','','green');
            return true;
        }
    }
function checkTermAgreed() {
        if ($('#agreed').checked === false) {
            printStateMsg('.termState','이용 약관에 동의해주세요.', 'red');
            return false;
        }
        printStateMsg('.termState','', 'green');
        return true;
    
    }
function userAgreed() {
            $("#agreed").checked = true;
            $(".overlay").style.visibility = 'hidden';
            checkTermAgreed();
    }
function generateMonth() {
        let optionTag = `<option selected disabled hidden>월</option>`;
        for(let i=1; i<=12; i++) {
            optionTag += `<option value="${i}월">${i}월</option>`
        }
        $("#month_list").innerHTML = optionTag;
    }
function generateDate() {
        const d30 = [4,6,9,11]
        const d31 = [1,3,5,7,8,10,12]
        let totalDates = 0;
        let optionTag = `<option selected disabled hidden>일</option>`;
        if (d31.includes(+$('#month_list').value[0])) {
            totalDates = 31;
        } else if (d30.includes(+$('#month_list').value[0])) {
            totalDates = 30;
        } else {
            totalDates = 29;
        }
        for(let d=1; d<=totalDates; d++) {
            optionTag += `<option value="${d}일">${d}일</option>`
        }
        $("#date_list").innerHTML = optionTag;
    }
function setTermContent() {
        $("#termscroll").innerHTML = `
    정보통신망법 규정에 따라 부스트캠프에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
    
    1. 수집하는 개인정보의 항목
    최초 회원가입 당시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.
    - 필수항목 : 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일, 휴대전화, 관심사
    
    2. 개인정보의 수집 및 이용 목적
    가. 컨텐츠 제공, 특정 맞춤 서비스 제공
    나. 회원제 서비스 제공, 개인식별, 부스트캠프 이용약관 위반 회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위 제재
    
    3. 개인정보의 보유 및 이용기간
    이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
    
    가. 회사 내부 방침에 의한 정보보유 사유
    - 부정이용기록(부정가입, 징계기록 등의 비정상적 서비스 이용기록)
    보존 항목 : 가입인증 휴대폰 번호
    보존 이유 : 부정 가입 및 이용 방지
    보존 기간 : 6개월
    ※ '부정이용기록'이란 부정 가입 및 운영원칙에 위배되는 게시글 작성 등으로 인해 회사로부터 이용제한 등을 당한 기록입니다.
    
    나. 관련법령에 의한 정보보유 사유
    상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다. 
    - 계약 또는 청약철회 등에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 5년
    - 소비자의 불만 또는 분쟁처리에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 3년
    - 웹사이트 방문기록
    보존 이유 : 통신비밀보호법
    보존 기간 : 3개월
    
    다. 관련법령에 의한 정보보유 사유
    상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다. 
    - 계약 또는 청약철회 등에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 5년
    - 소비자의 불만 또는 분쟁처리에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 3년
    - 웹사이트 방문기록
    보존 이유 : 통신비밀보호법
    보존 기간 : 3개월
    
    라. 관련법령에 의한 정보보유 사유
    상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다. 
    - 계약 또는 청약철회 등에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 5년
    - 소비자의 불만 또는 분쟁처리에 관한 기록
    보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
    보존 기간 : 3년
    - 웹사이트 방문기록
    보존 이유 : 통신비밀보호법
    보존 기간 : 3개월
            
            `
    }
function popTerm() {
        $('.overlay').style.opacity = '1';
        $('.overlay').style.visibility = 'visible';
    }
function closeTerm() {
        $('.overlay').style.visibility = 'hidden';
        $('.overlay').style.opacity = '0';
    }
function popReset() {
        $('.resetModal').style.visibility = 'visible';
        $('.resetModal').style.opacity = '1';
    }
function closeReset() {
        $('.resetModal').style.visibility = 'hidden';
        $('.resetModal').style.opacity = '0';
    }
function wrapInterest() {
        const userInput = $('#interest');
        let tagTexts = []
        let tag = ''
        let allTags = []
        userInput.onkeyup = e => {
            tag = $('#interest').value;
            if(e.key===',' && tag !== '') {
                tag = tag.replace(/[, ]+/g, " ").trim();    // 태그 내 콤마, 마지막 띄어쓰기 제거
                if (tag==='' || tagTexts.includes(tag)) { // ,, 입력시 태그 생성안하고 input value도 빈칸으로 지워버림. and 중복된 관심사 입력안되게
                    $('#interest').value = '';
                    return;
                }
                $('#interest').insertAdjacentHTML('beforebegin', `<span class="interestTag">${tag}<span class="tagClose">x</span></span>`);
                tagTexts.push(tag)
                //document.querySelector('.tags').insertAdjacentHTML += `<span class="interestTag">${tag}<span class="tagClose">x</span></span>`;
                $('#interest').value = '';
                allTags = document.querySelectorAll('span.interestTag');
                allTags.forEach(tag => {
                    tag.addEventListener('click', (e) => {
                        const self = e.target;
                        const parent = self.parentNode;
                        const grand = parent.parentNode;
                        grand.removeChild(parent);
                        userInput.value = '';
                    })
                });
                tag = '';
    
                if (document.querySelectorAll('.interestTag').length==3) {
                    printStateMsg('.interestState','','green');
                }
            }
        }
        userInput.onkeydown = e => {
            if (document.querySelectorAll('.interestTag').length>0 && e.key==='Backspace' && userInput.value === ''){
                let userTyped = '';
    
                let tagList = document.getElementsByClassName('interestTag');
                const lastTag = tagList[tagList.length-1];
                const parent = lastTag.parentNode;
    
                for(let c of lastTag.innerHTML) {
                    userTyped += c;
                    if (c==='<') break;
                }
                $('#interest').value = userTyped;
                parent.removeChild(lastTag);
            }
        }
    }
function resetInputs() {
        const inputs = ['#id','#pw','#pw_confirm','#year','#month_list','#date_list','#email','#name', '#gender','#phone'];
        inputs.forEach(input => {
            $(input).value = '';
        })
        $('.tags').innerHTML = '<input id="interest" type="text" placeholder="관심사 입력">';
        $('#interest').addEventListener('focus', (e) => {
            wrapInterest();
        });
        if (window.scrollHeight - window.scrollTop === window.clientHeight)
        window.clientHeight = 0
        resetStates();
        closeReset();
    }
function resetStates() {
        const inputStates = ['.idState','.pwState','.pwConfirmState','.phoneState','.emailState','.yearState','.interestState','.termState'];
        
        inputStates.forEach(state => {
            $(state).innerHTML = '';
        })
        $('#agreed').checked = false;
    }
function register() {
        let errorMsgs = []
        const inputStates = ['.idState','.pwState','.pwConfirmState','.phoneState','.emailState','.yearState','.interestState','.termState'];
        
        // FOR TEST //
        // const inputs = ['#id','#pw','#pw_confirm','#year','#month_list','#date_list','#email','#name', '#gender','#phone'];
        // const testUserInfo = ['admin','admin','admin','1994','3','29','abcde@naver.com','관리자','남성','01053762933'];
        // for(let i=0; i<inputs.length; i++) {
        //     $(inputs[i]).value = testUserInfo[i];
        // }
        // $('.tags').innerHTML = `
        //     <span class="interestTag">독서</span>
        //     <span class="interestTag">여행</span>
        //     <span class="interestTag">음악x</span>
        //     <input id="interest" type="text" placeholder="관심사 입력"></input>
        // `
        // $("#agreed").checked = true;
        // TEST END //
        
        checkId($("#id").value);
        checkPassword();
        checkIfPwTwin();
        checkYear();
        checkEmail();
        checkPhone();
        checkInterestLength();
        checkTermAgreed();
        if (checkId($("#id").value) && checkPassword() && checkIfPwTwin() && checkYear() && checkEmail() && checkPhone() && checkInterestLength() && checkTermAgreed()) {
    
            const userInterests = [];
            document.querySelectorAll('.interestTag').forEach(tag => {
                userInterests.push(tag.textContent.slice(0,-1));
            })
            const user = {
                id : $("#id").value,
                pw : $("#pw").value,
                name : $("#name").value,
                birthdate : [$("#year").value, $("#month_list").value, $("#date_list").value],
                email : $("#email").value,
                phone : $("#phone").value,
                interests : userInterests
            };
            const registerRequest = new XMLHttpRequest()
            registerRequest.open("POST", 'sign_up', true)
            registerRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8"')
            registerRequest.send(JSON.stringify(user))
            registerRequest.addEventListener('load', () => {
                location.replace('/login')
            })
            
        }
        else{ 
            inputStates.forEach(state => {
                let target = $(state);
                if(target !== null && target.style.color==='red') {
                    errorMsgs.push(target.innerHTML)
                }
            })
            alert(errorMsgs.join('\n'))
        }
    }

$("#popTerm").addEventListener('click', popTerm);
$("#popReset").addEventListener('click', popReset);
$("#register").addEventListener('click', register);
$("#resetInputs").addEventListener('click', resetInputs);
$("#closeReset").addEventListener('click', closeReset);
$("#closeTerm").addEventListener('click', closeTerm);
$("#agree").addEventListener('click', userAgreed);
setTermContent();
generateMonth()
$('#id').addEventListener('focusout', () => {
    let data = {
        'id' : `${document.querySelector("#id").value}`
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", 'sign_up/check');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8"');
    xhr.send(JSON.stringify(data));
    const setExistId = async() => {
        (await xhr.response === 'no') ? existId = true : existId = false
        checkId($("#id").value)
    }
    xhr.addEventListener('load', setExistId)
});
$('#pw').addEventListener('focusout',checkPassword);
$('#pw_confirm').addEventListener('focusout', checkIfPwTwin);
$('#year').addEventListener('focusout', checkYear);
$('#month_list').addEventListener('keyup', generateDate);
$('#email').addEventListener('focusout', checkEmail);
$('#phone').addEventListener('focusout', checkPhone);
$('#termscroll').addEventListener('scroll', (e) => {
    checkScrolled($('#termscroll'));
});
$('#interest').addEventListener('focus', wrapInterest);
$('#interest').addEventListener('focusout', checkInterestLength);
