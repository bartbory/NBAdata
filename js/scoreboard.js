let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const scoreboard = document.querySelector('.scoreboard>.wrap')
let arena, scoreH, teamH, scoreV, teamV = null

const btnRight = document.querySelector('.right')
const btnLeft = document.querySelector('.left')
const eventslist = document.querySelector('.wrap')

today = yyyy + dd + mm

//tworzenie struktury
const createEventBox = () => {
    const divEvent = document.createElement('div')
    divEvent.classList.add("eventBox")
    return scoreboard.append(divEvent)
}
//tworzenie struktury wewnątrz
const createDivs = () => {
    const homeTeam = document.createElement('div')
    homeTeam.classList.add("homeTeam")
    const awayTeam = document.createElement('div')
    awayTeam.classList.add("awayTeam")
    const arena = document.createElement('div')
    arena.classList.add("arena")
    const scoreH = document.createElement('div')
    scoreH.classList.add("result")
    const teamH = document.createElement('div')
    teamH.classList.add("teamName")
    const scoreV = document.createElement('div')
    scoreV.classList.add("result")
    const teamV = document.createElement('div')
    teamV.classList.add("teamName")
    scoreboard.lastChild.append(arena, homeTeam, awayTeam)
    const homeT = document.querySelector('.eventBox:last-child>.homeTeam')
    homeT.append(scoreH, teamH)
    const awayT = document.querySelector('.eventBox:last-child>.awayTeam')
    awayT.append(scoreV, teamV)
}

const displayWidth = window.innerWidth
//sprawdzenie ile eventów można wyświetlić na jednym widoku
const displayQ = () => {
    if (displayWidth < 480) {
        return 1
    } else if (displayWidth >= 480 && displayWidth < 1024) {
        return 2
    } else {
        return 3
    }
}


// sprawdzenie czy wyświetlać strzałki
function checkButtons() {
    if (eventsNo.length > displayQ()) {
        btnRight.classList.remove('disable')
    }
    if (games > 0 && games < (eventsNo.length - displayQ())) {
        btnRight.classList.remove('disable')
        btnLeft.classList.remove('disable')
    } else if (games === 0) {
        btnLeft.classList.add('disable')
    } else {
        btnRight.classList.add('disable')
    }
}

let eventsNo
let actual = 0
let games = 0

// const boxSize = document.querySelector('.wrap').offsetWidth *.3 + 16
const API_URL = `https://data.nba.net/data/10s/prod/v1/${today}/scoreboard.json`
const generatescoreboard = () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            eventsNo = data.games
            console.log(eventsNo.length);
            for (let a = 0; a < eventsNo.length; a++) {
                createEventBox()
                createDivs()
                arena = document.querySelector('.eventBox:last-child>.arena')
                scoreH = document.querySelector('.eventBox:last-child>.homeTeam>.result')
                teamH = document.querySelector('.eventBox:last-child>.homeTeam>.teamName')
                scoreV = document.querySelector('.eventBox:last-child>.awayTeam>.result')
                teamV = document.querySelector('.eventBox:last-child>.awayTeam>.teamName')
                arena.textContent = eventsNo[a].arena.name
                scoreH.textContent = eventsNo[a].hTeam.score
                teamH.textContent = eventsNo[a].hTeam.triCode
                scoreV.textContent = eventsNo[a].vTeam.score
                teamV.textContent = eventsNo[a].vTeam.triCode
            }
            if (eventsNo.length === 0 || eventsNo == undefined) {
                scoreboard.parentElement.innerHTML = "<p>There is no events for today</p>"
            }
            checkButtons()
            console.log(eventsNo.length - displayQ());
        })
        .catch(() => scoreboard.parentElement.innerHTML = "<p>There is an API error. Please try again later. Sorry :(</p>")
}

generatescoreboard()

btnRight.addEventListener('click', () => {
    games++
    const boxSize = document.querySelector('.wrap>.eventBox').offsetWidth + 16
    actual -= boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    checkButtons()
})
btnLeft.addEventListener('click', () => {
    games--
    const boxSize = document.querySelector('.wrap>.eventBox').offsetWidth + 16
    actual += boxSize
    document.querySelector('.wrap').setAttribute('style', `transform: translateX(${actual}px)`)
    checkButtons()
})