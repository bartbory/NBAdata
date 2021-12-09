var actual = 0
var games = 0

document.querySelector('.wrap').addEventListener('click', (e) => {
    boxSize = e.target.closest('.wrap>.eventBox').offsetWidth + 16
})

function checkButtons() {
    if (games > 0 && games < (eventsNo.length - 4)) {
        btnRight.classList.remove('disable')
        btnLeft.classList.remove('disable')
    } else if (games === 0) {
        btnLeft.classList.add('disable')
    } else {
        btnRight.classList.add('disable')
    }
}

btnRight.addEventListener('click', () => {
    games++
    actual -= boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    checkButtons()
})
btnLeft.addEventListener('click', () => {
    games--
    actual += boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    checkButtons()
})

checkButtons()