const form = document.querySelector('.form')
const submit = document.querySelector('.submit')
const fightWrapper = document.querySelector('.fight-wrapper')
const formWrapper = document.querySelector('.form-wrapper')
const myFighter = document.querySelector('.myFighter')
const fighterName = document.querySelector('.fighterName')
const exit = document.querySelector('.exit')
const bossWrapper = document.querySelector('.bossWrapper')
const fighterBoss = document.querySelector('.fighterBoss')
const audioTag1 = document.querySelector('.audioTag1')
const audioTag2 = document.querySelector('.audioTag2')
const audioTag3 = document.querySelector('.audioTag3')
const resultAction = document.querySelector('.resultAction')
const myFighterResult = document.querySelector('.myFighterResult')
const extraLife = document.querySelector('.extraLife')
const greeting = document.querySelector('.greeting')
const startGameWrapper = document.querySelector('.start-game-wrapper')
const legendGameBtn = document.querySelector('.legend-game-btn')
const legendWrapper = document.querySelector('.legend-wrapper')
const startGameBtn = document.querySelector('.start-game-btn')
const legendFightBtn = document.querySelector('.legend-fight-btn')

let values

let currentBoss

const myFighterInfo = {
    life: 40
}

const bosses = [
    {
        name: 'Stick Man',
        life: 5,
        image: "img/fighter0.svg",
    }, {
        name: 'Nindja Man',
        life: 10,
        image: "img/21039920061621418911.svg",
    },


    {
        name: 'Nindja Man',
        life: 12,
        image: "img/boss3.svg",
    },{
        name: 'Nindja Man',
        life: 15,
        image: "img/boss4.svg",
    },{
        name: 'Nindja Man',
        life: 20,
        image: "img/boss5.svg",
    },
]

let currentBossIndex = 0;


const setUserName = (element) => {

    localStorage.setItem('player', JSON.stringify(element))
}



let parsePlayer
const getPlayerInfo = () => {

    let player = localStorage.getItem('player')
     parsePlayer = JSON.parse(player)


    // myFighterResult.innerHTML = currentMyFighterInfo.life

}


const setBossesInfo = () => {
    localStorage.setItem('bosses', JSON.stringify(bosses))
}

const setMyFighterInfo = () => {
    localStorage.setItem('myFighter', JSON.stringify(myFighterInfo))
}



const getMyFighterInfo = () => {

    let fighter = localStorage.getItem('myFighter')
    let currentMyFighterInfo = JSON.parse(fighter)
    console.log(currentMyFighterInfo, 'currentMyFighterInfo')
    // myFighterResult.innerHTML = currentMyFighterInfo.life

}
getMyFighterInfo()


const validateEmail = (email) => {
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return true
};


const getUserNameForGreeting = () => {
    getPlayerInfo()

    greeting.innerHTML = `Welcome to the game, ${ parsePlayer.name}. Choose the following action`
}

const watchLegend = () => {
    startGameWrapper.style.display = 'none';
    legendWrapper.style.display = 'flex'
}

const openFighterPage = () => {
    legendWrapper.style.display = 'none';
    startGameWrapper.style.display = 'none';
    fightWrapper.style.display = 'block';
    console.log(5)

}


legendGameBtn.addEventListener('click', watchLegend)
startGameBtn.addEventListener('click',openFighterPage )
legendFightBtn.addEventListener('click',openFighterPage )



function play_single_boss_sound() {
   audioTag1.play();
}

function play_single_repulsed_attack_sound() {
   audioTag2.play();
}

function play_single_myFighter_sound() {
   audioTag3.play();
}

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
                    startGameWrapper.style.display = 'flex'
                    // fightWrapper.style.display = 'block'
                } else {
                    email.value = ''
                }
            }
        }
        setBossesInfo()
        setMyFighterInfo()
        getUserNameForGreeting()
    }
}

submit.addEventListener('click', getFormElement)

//first page



const createBoss = (boss) => {
    return `
        <div>${boss.life}</div>
     
        <h3>${boss.name}</h3>
        <div>
            <img class="fighterBoss" onclick="getResultAttack( getBossAction(3))"  src=${boss.image}>
        </div>
    `
}


const getBossAction = (max) => {
   return  Math.floor(Math.random() * max);
}

const getResultAttack = (value) => {
    switch (value) {
        case 0 :
            resultAction.innerHTML = 'Аттака отбита';
            secondMusic()
            break;
        case 1 :
            resultAction.innerHTML = ''
            resultAction.innerHTML = 'уменьшить у босса';
            bossAttack()
            break;
        case 2 :
            resultAction.innerHTML = ''
            resultAction.innerHTML = 'уменьшить у моего бойца';
            thirdMusic()
            getMyFighterWound()
            break;
    }
}

const getMyFighterWound = () => {
  console.log(--myFighterInfo.life)

    //поменять значение с 38 на 10
    if (myFighterInfo.life === 38) {
        extraLife.style.display = 'block'
    }
    myFighterResult.innerHTML = ''
    myFighterResult.innerHTML = myFighterInfo.life
    setMyFighterInfo()
}

const secondMusic = () => {
   play_single_repulsed_attack_sound()
}

const thirdMusic = () => {
    play_single_myFighter_sound()
}

const bossAttack = () => {
    play_single_boss_sound()

    const lastBossIndex = bosses.length - 1;

    if (currentBossIndex > lastBossIndex) {
        bossWrapper.innerHTML = `<h1>Game over</h1>`
            myFighter.style.display = 'none'
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


    setBossesInfo()
}

const startGame = () => {
    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex])
}

startGame()

const endGame = () => {
    localStorage.clear()
    fightWrapper.style.display = 'none';
    formWrapper.style.display = 'block';
    startGame()
}




const getExtraLife = () => {

    myFighterInfo.life += 20
    console.log('there',myFighterInfo.life)

}

exit.addEventListener('click', endGame)
extraLife.addEventListener('click', getExtraLife)





