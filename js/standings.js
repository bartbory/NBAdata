const tableEast = document.querySelector('.east')
const tableWest = document.querySelector('.west')
let rank, team, played, won, loss, streak = null

function createEast() {
    const divRecord = document.createElement('div')
    divRecord.classList.add("record")
    return tableEast.append(divRecord)
}

function createWest() {
    const divRecord = document.createElement('div')
    divRecord.classList.add("record")
    return tableWest.append(divRecord)
}

function createDivsE() {
    const divRank = document.createElement('div')
    divRank.classList.add("detail", "rank")
    const divTeam = document.createElement('div')
    divTeam.classList.add("detail", "teamName")
    const divPlayed = document.createElement('div')
    divPlayed.classList.add("detail", "played")
    const divWon = document.createElement('div')
    divWon.classList.add("detail", "won")
    const divLoss = document.createElement('div')
    divLoss.classList.add("detail", "lost")
    const divStreak = document.createElement('div')
    divStreak.classList.add("detail", "streak")
    tableEast.lastChild.append(divRank, divTeam, divPlayed, divWon, divLoss, divStreak)
}

function createDivsW() {
    const divRank = document.createElement('div')
    divRank.classList.add("detail", "rank")
    const divTeam = document.createElement('div')
    divTeam.classList.add("detail", "teamName")
    const divPlayed = document.createElement('div')
    divPlayed.classList.add("detail", "played")
    const divWon = document.createElement('div')
    divWon.classList.add("detail", "won")
    const divLoss = document.createElement('div')
    divLoss.classList.add("detail", "lost")
    const divStreak = document.createElement('div')
    divStreak.classList.add("detail", "streak")
    tableWest.lastChild.append(divRank, divTeam, divPlayed, divWon, divLoss, divStreak)
}

function standingsEastFetch() {
    const URL_NBA_STANDINGS = `https://data.nba.net/data/10s/prod/v1/current/standings_conference.json`
    fetch(URL_NBA_STANDINGS)
        .then(response => response.json())
        .then(data => {
            const teamsEast = data.league.standard.conference.east.length
            for (let i = 0; i < teamsEast; i++) {
                createEast()
                createDivsE()
                rank = document.querySelector('.east>.record:last-child>.rank')
                team = document.querySelector('.east>.record:last-child>.teamName')
                played = document.querySelector('.east>.record:last-child>.played')
                won = document.querySelector('.east>.record:last-child>.won')
                loss = document.querySelector('.east>.record:last-child>.lost')
                streak = document.querySelector('.east>.record:last-child>.streak')
                rank.textContent = i + 1
                team.textContent = data.league.standard.conference.east[i].teamSitesOnly.teamKey + ' ' + data.league.standard.conference.east[i].teamSitesOnly.teamNickname
                won.textContent = data.league.standard.conference.east[i].win
                loss.textContent = data.league.standard.conference.east[i].loss
                streak.textContent = data.league.standard.conference.east[i].streak
                played.textContent = parseInt(won.textContent, 10) + parseInt(loss.textContent, 10)
                rank, team, won, loss, streak = null
            }

        })

        .catch(err => console.error(err))
}


function standingsWestFetch() {
    const URL_NBA_STANDINGS = `https://data.nba.net/data/10s/prod/v1/current/standings_conference.json`
    fetch(URL_NBA_STANDINGS)
        .then(response => response.json())
        .then(data => {
            const teamsWest = data.league.standard.conference.west.length
            for (i = 0; i < teamsWest; i++) {
                createWest()
                createDivsW()
                rank = document.querySelector('.west>.record:last-child>.rank')
                team = document.querySelector('.west>.record:last-child>.teamName')
                played = document.querySelector('.west>.record:last-child>.played')
                won = document.querySelector('.west>.record:last-child>.won')
                loss = document.querySelector('.west>.record:last-child>.lost')
                streak = document.querySelector('.west>.record:last-child>.streak')
                rank.textContent = i + 1
                team.textContent = data.league.standard.conference.west[i].teamSitesOnly.teamKey + ' ' + data.league.standard.conference.west[i].teamSitesOnly.teamNickname
                won.textContent = data.league.standard.conference.west[i].win
                loss.textContent = data.league.standard.conference.west[i].loss
                played.textContent = parseInt(won.textContent, 10) + parseInt(loss.textContent, 10)
                streak.textContent = data.league.standard.conference.west[i].streak
            }
        })
        .catch(err => console.error(err))
}

const titleChange = () => {
    const displayWidth = window.innerWidth
    if (displayWidth < 480) {
        const details = document.querySelectorAll('.tableHeader>.detail')
        details.forEach(detail => {
            detail.textContent = detail.textContent.slice(0, 1)
        })
    }
}
titleChange()
standingsEastFetch()
standingsWestFetch()