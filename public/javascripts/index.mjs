const transTime = 300
const $ = element => document.querySelector(element)
const $All = element => document.querySelectorAll(element)
let numOfSlides = $All('li').length

const cardContainer = $('.card-container')
const carouselContainer = $('.carousel-container')

const dots = $All('.dot')
for(let i=0; i<dots.length; i++) {
    dots[i].id = `${i}`
}

let clickedCard
const slide = $('.carousel-container')
const prevBtn = $('.prev')
const nextBtn = $('.next')

let page = 0
let dotIndex = 0

const expandCard = (card,move) => {
    if(move!==false) moveSlide(card.childNodes[2].childNodes[0].id)
    card.style.transition = `${transTime*2}ms`
    card.style.width = "12rem"
    card.style.height = '18rem'
    card.style.marginRight = "1rem"
    card.style.marginBottom = "1rem"
}
const shrinkCard = card => {
    card.style.width = "10rem"
    card.style.height = '16rem'
}

const slideNext = () => {
    if(Math.abs(page) === numOfSlides-1) {          // 마지막 슬라이드에서 첫번째 슬라이드로 넘어가는 효과 처리
        
        const firstSlide = $All('li')[0]           // 첫번째 슬라이드를 마지막에 그려준뒤
        carouselContainer.insertAdjacentHTML('beforeend',`<li>${firstSlide.innerHTML}</li>`)

        page -= 1   // 추가된 마지막 슬라이드(첫 슬라이드와 동일하게 생긴)로 진행방향대로 밀고
        dots[dotIndex].className = 'dot'
        dotIndex = 0
        slide.style.transition = `${transTime}ms`
        slide.style.margin = `0rem 1rem 0rem ${page*100}%`
        dots[dotIndex].className = 'dot-selected'
        shrinkCard(clickedCard)
        expandCard(dots[dotIndex].parentNode.parentNode, false)
        clickedCard = dots[dotIndex].parentNode.parentNode

        // 마지막 슬라이드에 그려진 첫번째 슬라이드를 지우면서 첫번째 슬라이드로 실제 이동(transition 안보이게)
        let slideList = document.getElementsByTagName('li')
        const lastSlide = slideList[slideList.length-1]
        const parent = lastSlide.parentNode
        page = 0
        setTimeout( () => {
            slide.style.transition = "hidden"
            slide.style.margin = `0rem 1rem 0rem ${page*100}%`
            parent.removeChild(lastSlide);
        },transTime)
        return
    }
    page--
    dots[dotIndex].className = 'dot'
    dotIndex++
    slide.style.transition = `${transTime}ms`
    slide.style.margin = `0rem 1rem 0rem ${page*100}%`
    dots[dotIndex].className = 'dot-selected'
    shrinkCard(clickedCard)
    expandCard(dots[dotIndex].parentNode.parentNode, false)
    clickedCard = dots[dotIndex].parentNode.parentNode
    
}
const slidePrev = () => {
    if(Math.abs(page) === 0) {          // 첫번째 슬라이드에서 이전 슬라이드로 넘어가는 효과 처리
        const lastSlide = $All('li')[$All('li').length-1]     // 마지막 슬라이드를 첫번째 공간에 그려준뒤     
        carouselContainer.insertAdjacentHTML('afterbegin',`<li>${lastSlide.innerHTML}</li>`)

        page++   // 추가된 마지막 슬라이드(첫 슬라이드와 동일하게 생긴)로 진행방향대로 밀고
        dots[dotIndex].className = 'dot'
        dotIndex = numOfSlides-1
        slide.style.transition = `${transTime}ms`
        slide.style.margin = `0rem 1rem 0rem 0%`
        dots[dotIndex].className = 'dot-selected'
        shrinkCard(clickedCard)
        expandCard(dots[dotIndex].parentNode.parentNode, false)
        clickedCard = dots[dotIndex].parentNode.parentNode

        // 마지막 슬라이드에 그려진 첫번째 슬라이드를 지우면서 첫번째 슬라이드로 실제 이동(transition 안보이게)
        let slideList = document.getElementsByTagName('li')
        const firstSlide = slideList[0]
        const parent = firstSlide.parentNode
        page = -(numOfSlides-1)
        setTimeout( () => {
            slide.style.transition = "hidden"
            slide.style.margin = `0rem 1rem 0rem ${page*100}%`
            parent.removeChild(firstSlide);
        },transTime)
        return
    }
    page++
    dots[dotIndex].className = 'dot'
    dotIndex--
    slide.style.transition = `${transTime}ms`
    slide.style.margin = `0rem 1rem 0rem ${page*100}%`
    dots[dotIndex].className = 'dot-selected'
    shrinkCard(clickedCard)
    expandCard(dots[dotIndex].parentNode.parentNode, false)
    clickedCard = dots[dotIndex].parentNode.parentNode

}

const moveSlide = index => {
    page = -(index)
    dots[dotIndex].className = 'dot'
    slide.style.transition = `${transTime}ms`
    slide.style.margin = `0rem 1rem 0rem ${page*100}%`
    dotIndex = index
    dots[dotIndex].className = 'dot-selected'

}

nextBtn.addEventListener('click', slideNext)
prevBtn.addEventListener('click', slidePrev)

cardContainer.addEventListener('click', e => {
    if(e.target.parentNode.tagName === "SPAN") {
        shrinkCard(clickedCard)
        expandCard(e.target.parentNode.parentNode)
        clickedCard = e.target.parentNode.parentNode
        moveSlide(+e.target.id)
    }
    else if (["card","card-container"].includes(e.target.parentNode.className)) {
        shrinkCard(clickedCard)
        if (e.target.className === "card") { // 이미지를 제외한 카드 부분 클릭 경우
            expandCard(e.target)
            clickedCard = e.target
        }
        else {  // 카드 내 이미지부분 클릭 경우
            expandCard(e.target.parentNode)
            clickedCard = e.target.parentNode
        }
    }
})

// 방향키 입력에 따른 Carousel 전환
window.onkeyup = e => {
    if(e.key === "ArrowRight") slideNext()
    else if (e.key === "ArrowLeft") slidePrev()
}

(function init() {
    setInterval(slideNext,3000)
    dots[dotIndex].className = 'dot-selected'
    clickedCard = $All('.card')[0]
    expandCard(clickedCard)
})()

