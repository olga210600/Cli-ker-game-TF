const form = document.querySelector('.form')
const submit = document.querySelector('.submit')
const fightWrapper = document.querySelector('.fight-wrapper')
const formWrapper = document.querySelector('.form-wrapper')
const fighterName = document.querySelector('.fighterName')
const exit = document.querySelector('.exit')
const bossWrapper = document.querySelector('.bossWrapper')
const fighterBoss = document.querySelector('.fighterBoss')

let values

let currentBoss

const bosses = [
    {
        id: 1,
        name: 'Stick Man',
        life: 5,
        inGame: true,
        image: "img/fighter0.svg",
    }, {
        id: 2,
        name: 'Nindja Man',
        life: 10,
        inGame: true,
        image: "img/21039920061621418911.svg",
    },
]

let currentBossIndex = 0;


const setUserName = (element) => {

    localStorage.setItem('player', JSON.stringify(element))
    let userInfo = localStorage.getItem('player')
}


const validateEmail = (email) => {
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return true
};


function getFormElement(event) {
    event.preventDefault();

    const name = form.querySelector("[name = 'name' ]"),
        email = form.querySelector("[name = 'email']");

    values = {
        name: name.value,
        email: email.value,
    }

    if (name.value.length > 0 && email.value.length > 0) {
        for (let prop in values) {

            if (prop === 'email') {
                let email = values[prop]

                if (validateEmail(email)) {
                    setUserName(values)
                    name.value = ''
                    email.value = ''

                    formWrapper.style.display = 'none'
                    fightWrapper.style.display = 'block'
                } else {
                    email.value = ''
                }
            }
        }
        // getUserName()
    }
}

submit.addEventListener('click', getFormElement)

//first page

const createBoss = (boss) => {
    return `
        <div>${boss.life}</div>
        <h3>${boss.name}</h3>
        <div>
        
            <img class="fighterBoss" onclick="bossAttack()" src=${boss.image}>
        </div>
    `
}

const bossAttack = () => {
    const lastBossIndex = bosses.length - 1;

    if (currentBossIndex > lastBossIndex) {
        bossWrapper.innerHTML = `<h1>Game over</h1>`
        return;
    }

    const currentBoss = bosses[currentBossIndex];

    if (currentBoss.life !== 0) {
        bosses[currentBossIndex] = {
            ...currentBoss,
            life: --currentBoss.life
        }
    } else {
        currentBossIndex += 1
    }

    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex])
}

const startGame = () => {
    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex])
}

startGame()






