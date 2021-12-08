// /* 1. Stworzyć pętle, która pobierze wszystkie ID z przedziału x:y i utworzy na ich podstawie strukturę:
//     RECORD
//         LASTNAME / FIRSTNAME / JERSEY / DOB / HEIGHT
//     A. POBRANIE ITERATORA = 0 (x)
//     B. UTWORZENIE ELEMENTU DIV 'RECORD' WRAZ Z ZAWARTOŚCIĄ
//     C. PRZYPISANIE KLAS DO POWYŻSZYCH ELEMENTÓW
//     D. POBRANIE DANYCH Z API (5 ATRYBUTÓW)
//     E. PRZYPISANIE WARTOŚCI ATRYBUTÓW DO TEXTCONTENT W UTWORZONYM WCZEŚNIEJ ELEMENCIE
//     F. ZWIĘKSZENIE ITERATORA */
const tabel = document.querySelector('.table')
let lastName, firstName, jersey, dob, height = null

function createRecord() {
    const divRecord = document.createElement('div')
    divRecord.classList.add("record")
    return tabel.append(divRecord)
}

function createDivs() {
    const divLastName = document.createElement('div')
    divLastName.classList.add("detail", "lastName")
    const divFirstName = document.createElement('div')
    divFirstName.classList.add("detail", "firstName")
    const divJersey = document.createElement('div')
    divJersey.classList.add("detail", "jersey")
    const divDOB = document.createElement('div')
    divDOB.classList.add("detail", "dob")
    const divHeight = document.createElement('div')
    divHeight.classList.add("detail", "height")
    tabel.lastChild.append(divLastName, divFirstName, divDOB, divHeight, divJersey)
}
const page = 1
const display = 50
const year = 2021
async function ratunku() {
    for (i = page - 1; i < display; i++) {
        const URL_SPORTDATA = `http://data.nba.net/10s/prod/v1/${year}/players.json`
        await fetch(URL_SPORTDATA)
            .then(response => response.json())
            .then(function (data) {
                createRecord()
                createDivs()
                lastName = document.querySelector('.record:last-child>.lastName')
                firstName = document.querySelector('.record:last-child>.firstName')
                jersey = document.querySelector('.record:last-child>.jersey')
                dob = document.querySelector('.record:last-child>.dob')
                height = document.querySelector('.record:last-child>.height')
                lastName.textContent = data.league.standard[i].lastName
                firstName.textContent = data.league.standard[i].firstName
                jersey.textContent = data.league.standard[i].jersey
                dob.textContent = data.league.standard[i].dateOfBirthUTC
                height.textContent = data.league.standard[i].heightMeters
            })
            .catch(err => console.error(err))
    }
}
ratunku()
const date = new Date()
console.log(date);
fetch('https://data.nba.net/data/10s/prod/v1/current/standings_all.json')
    .then(response => response.json())
    .then(data => console.log(data))