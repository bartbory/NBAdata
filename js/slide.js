var actual = 0
var boxSize = 0
var games = 0
document.querySelector('.wrap').addEventListener('click', (e) => {
    boxSize = e.target.closest('.wrap>.eventBox').offsetWidth + 16
    console.log('wymiar boxu: ' + boxSize)
})

btnRight.addEventListener('click', () => {
    games++
    actual -= boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    console.log('actual po kliku w prawo: ' + actual);
    console.log(games);
    if (games > 0 && games < (eventsNo.length - 3)) {
        btnRight.classList.remove('disable')
        btnLeft.classList.remove('disable')
    } else if (games === 0) {
        btnLeft.classList.add('disable')
    } else {
        btnRight.classList.add('disable')

    }
})
btnLeft.addEventListener('click', () => {
    games--
    actual += boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    console.log('actual po kliku w lewo: ' + actual);
    if (games > 0 && games < (eventsNo.length - 3)) {
        btnRight.classList.remove('disable')
        btnLeft.classList.remove('disable')
    } else if (games === 0) {
        btnLeft.classList.add('disable')
    } else {
        btnRight.classList.add('disable')

    }
})

console.log('actual: ' + actual);