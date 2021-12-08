const slide = document.querySelector('.wrap>.eventBox')
let actual = 0
console.log(slide.offsetWidth);

function moveRight() {
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual - slide.offsetWidth}px)`)
    actual -= slide.offsetWidth
    console.log(actual);
}

function moveLeft() {
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual + slide.offsetWidth}px)`)
    actual += slide.offsetWidth
    console.log(actual);
}

btnRight.addEventListener('click', moveRight)
btnLeft.addEventListener('click', moveLeft)