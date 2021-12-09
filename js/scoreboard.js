let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()
const scoreboard = document.querySelector('.scoreboard>.wrap')
let arena, scoreH, teamH, scoreV, teamV = null

const btnRight = document.querySelector('.right')
const btnLeft = document.querySelector('.left')
const eventslist = document.querySelector('.wrap')

today = yyyy + dd - 5 + mm

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
var eventsNo
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
        })
        .catch(err => console.error(err))
}

generatescoreboard()