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

let eventsNo
let actual = 0
let games = 0

const boxSize = document.querySelector('.wrap').offsetWidth * .3 + 16
const API_URL = `https://data.nba.net/data/10s/prod/v1/${today}/scoreboard.json`
const generatescoreboard = () => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            eventsNo = data.games
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
            if (eventsNo.length === 0) {
                document.querySelector('.scoreboard').innerHTML = "<p>There is no events for today</p>"
            } else if (eventsNo.length <= 3) {
                btnRight.classList.add('disable')
            }

        })
        .catch(err => console.error(err))
}

generatescoreboard()



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