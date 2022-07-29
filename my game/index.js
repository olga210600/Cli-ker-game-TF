const form = document.querySelector('.form')
const submit = document.querySelector('.submit')
const fightWrapper = document.querySelector('.fight-wrapper')
const formWrapper = document.querySelector('.form-wrapper')
const myFighter = document.querySelector('.myFighter')
// const fighterName = document.querySelector('.fighterName')
const exit = document.querySelector('.exit')
const bossWrapper = document.querySelector('.bossWrapper')
// const fighterBoss = document.querySelector('.fighterBoss')
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
const levelWrapper = document.querySelector('.level')

const popup = document.getElementById('mypopup');
const popupToggle = document.getElementById('myBtn');
const popupClose = document.querySelector('.close');
const closeRules = document.querySelector('.close-rules')
const popupResultBody = document.querySelector('.popup-result-body')
const bossResultInfo = document.querySelector('.boss-result-info')
const currentFightersWrapper = document.querySelector('.current-fighters-wrapper')
const finalResult = document.querySelector('.final-result')
const gameOver = document.querySelector('.game-over')
const resultBtn = document.querySelector('.result-btn')
const finalPopup = document.querySelector('.final-popup')

let values

let currentBoss

const myFighterInfo = {
    // *************************
    life: 7
}

const bosses = [
    {
        name: 'Bostor',
        life: 5,
        image: "img/boss3.svg",
        level: 1,
        beaten: 0,
        missed: 0,
        inflicted: 0

    }, {
        name: 'Selevan',
        life: 7,
        image: "img/secondBoss.svg",
        level: 2,
        beaten: 0,
        missed: 0,
        inflicted: 0
    },


    {
        name: 'Duran',
        life: 10,
        image: "img/thirdBoss.svg",
        level: 3,
        beaten: 0,
        missed: 0,
        inflicted: 0

    },
]

const  finalResultFight = {
    beaten: 0,
    missed:0,
    inflicted: 0,
}

let currentBossIndex = 0;
let currentBossIndexResult = 0;


const setUserName = (element) => {

    localStorage.setItem('player', JSON.stringify(element))
}


let parsePlayer
const getPlayerInfo = () => {
    let player = localStorage.getItem('player')
    parsePlayer = JSON.parse(player)
}

const setBossesInfo = () => {
    localStorage.setItem('bosses', JSON.stringify(bosses))
}

let currentBossesInfo
const getBossInfo = () => {

    let bosses = localStorage.getItem('bosses')
    currentBossesInfo = JSON.parse(bosses)
    console.log(currentBossesInfo, 'currentBossesInfo')
    // myFighterResult.innerHTML = currentMyFighterInfo.life
    // return currentBossesInfo


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

// const setLocalStorage = () => {
//     const setBossesInfoAgain = () => {
//         localStorage.setItem('newBosses', JSON.stringify(bosses))
//     }
//
//     let currentBossesInfo
//     const getBossInfoAgain = () => {
//         let newBosses = localStorage.getItem('newBosses')
//         currentBossesInfo = JSON.parse(newBosses)
//         console.log(currentBossesInfo, 'currentBossesInfo')
//     }
//
//     const setMyFighterInfoAgain = () => {
//         localStorage.setItem('newMyFighter', JSON.stringify(myFighterInfo))
//     }
//
//     const getMyFighterInfoAgain = () => {
//         let newFighter = localStorage.getItem('newMyFighter')
//         let newCurrentMyFighterInfo = JSON.parse(newFighter)
//         console.log(newCurrentMyFighterInfo, 'new currentMyFighterInfo')
//     }
//     getMyFighterInfoAgain()
//     setBossesInfoAgain()
//     setMyFighterInfoAgain()
//     getBossInfoAgain()
// }

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

    greeting.innerHTML = `Welcome to the game, ${parsePlayer.name}. Choose the following action`
}

const watchLegend = () => {
    startGameWrapper.style.display = 'none';
    legendWrapper.style.display = 'flex'
}

const openFighterPage = () => {
    legendWrapper.style.display = 'none';
    startGameWrapper.style.display = 'none';
    fightWrapper.style.display = 'block';

// setLocalStorage()

    // endGame()
    // setMyFighterInfo()
    // setBossesInfo()
    // console.log(5)

}
// ****************************************************************
const startGameAgain = () => {
    // localStorage.clear()
    // // setBossesInfo()
    // setLocalStorage()
    // setMyFighterInfo()

    location.href=location.href;

    console.log(8888888888888888)


    finalResult.style.display = 'none'
    fightWrapper.style.display = 'block';
}


legendGameBtn.addEventListener('click', watchLegend)
startGameBtn.addEventListener('click', openFighterPage)
legendFightBtn.addEventListener('click', openFighterPage)


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

// const clearInput = () => {
//     name.value = ''
//     email.value = ''
// }

submit.addEventListener('click', getFormElement)



const createBoss = (boss) => {
    return `
<div class="fighter-main-wrapper">
<div class="info-wrapper-boss">
     <p>Fighter: ${boss.name}. Life: ${boss.life}.</p>
</p>

</div>
        <div>
            <img class="fighterBoss" onclick="getResultAttack( getBossAction(3))"  src=${boss.image}>
        </div>
</div>

    `
}


const getBossAction = (max) => {
    return Math.floor(Math.random() * max);
}

const getResultAttack = (value) => {
    switch (value) {
        case 0 :
            resultAction.innerHTML = 'The attack was repulsed';
            resultAction.style.background = 'orange'
            secondMusic()
            getBeatenKicked()
            mouseAction()
            break;
        case 1 :
            resultAction.innerHTML = ''
            resultAction.innerHTML = 'Damage dealt to the boss';
            resultAction.style.background = 'green'
            getMissedKicked()
            bossAttack()
          mouseAction()
            break;
        case 2 :
            resultAction.innerHTML = ''
            resultAction.innerHTML = 'Aaron\'s damage is done';
            resultAction.style.background = 'red'
            thirdMusic()
            getMyFighterWound()
            getInflictedKicked()
           mouseAction()
            break;
    }
}

const getMyFighterWound = () => {
    console.log(--myFighterInfo.life)

    //поменять значение с 38 на 10
    if (myFighterInfo.life === 5) {
        extraLife.style.display = 'block'
    }
    if (myFighterInfo.life > 5) {
        extraLife.style.display = 'none'
    }

    if (myFighterInfo.life === 1) {



        fightWrapper.style.display = 'none';
        finalResult.style.display = 'flex'
        gameOver.innerHTML = `<div class="game-over-lost-wrapper"> <br><h1 class="lost">You lost. Start the game again.</h1> <h2 class="lost">Use extra life to win</h2> <button class="start-game-btn" onclick="startGameAgain()">Start game</button></div>`

    }

    myFighterResult.innerHTML = ''
    myFighterResult.innerHTML = `Fighter: Aaron.  Life: ${myFighterInfo.life}`
    setMyFighterInfo()
}

const secondMusic = () => {
    play_single_repulsed_attack_sound()
}

const thirdMusic = () => {
    play_single_myFighter_sound()
}

const getBeatenKicked = () => {
    // const currentBossResult = bosses[currentBossIndexResult];
    //
    // if (currentBossResult.life !== 0) {
    //     bosses[currentBossResult] = {
    //         ...currentBossResult,
    //         beaten: ++currentBossResult.beaten
    //     }
    // } else {
    //     currentBossIndexResult += 1
    // }
    // setBossesInfo()
    finalResultFight.beaten += 1
    console.log(finalResultFight.beaten, 'beaten')
}

const getMissedKicked = () => {
    // const currentBossResult = bosses[currentBossIndexResult];
    //
    // if (currentBossResult.life !== 0) {
    //     bosses[currentBossIndexResult] = {
    //         ...currentBossResult,
    //         missed: ++currentBossResult.missed
    //     }
    // } else {
    //     currentBossIndexResult += 1
    // }
    // setBossesInfo()
    finalResultFight.missed += 1
    console.log(finalResultFight.missed, 'missed')
}

const getInflictedKicked = () => {

    // const currentBossResult = bosses[currentBossIndexResult];
    // console.log(currentBossResult, 88888888888)
    // if (currentBossResult.life !== 0) {
    //     bosses[currentBossResult] = {
    //         ...currentBossResult,
    //         inflicted: ++currentBossResult.inflicted
    //     }
    // } else {
    //     currentBossIndexResult += 1
    // }
    // setBossesInfo()
    finalResultFight.inflicted += 1;
    console.log(finalResultFight.inflicted, 'inflicted')
}

//*************************************************
const bossAttack = () => {
    play_single_boss_sound()
getBossInfo()

    if(currentBossesInfo[2].life === 1  ) {
        currentFightersWrapper.style.display = 'none'
        levelWrapper.style.display = 'none'
        finalResult.style.display = 'flex'
        fightWrapper.style.display = 'none'
       gameOver.innerHTML = `<div class="game-over-win-wrapper"><h1 class="game-over-win">Game over</h1><h2 class="win">You win</h2><h2 class="win">Now Aaron can sleep in peace.</h2></div> `
    }

    const currentBoss = bosses[currentBossIndex];

    if (currentBoss.life !== 1 ) {
        bosses[currentBossIndex] = {
            ...currentBoss,
            life: --currentBoss.life
        }
    } else {
        currentBossIndex += 1
    }

    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex])
    levelWrapper.innerHTML = ''
    levelWrapper.innerHTML = `Level: ${bosses[currentBossIndex].level}`

    setBossesInfo()

    // *************************


    // bossWrapper.addEventListener('mousedown', getConsoleDown)
    // bossWrapper.addEventListener('mouseup', getConsoleUp)
}

const startGame = () => {
    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex])
}

startGame()

const endGame = () => {
    localStorage.clear()
    fightWrapper.style.display = 'none';
    formWrapper.style.display = 'flex'
    // formWrapper.style.display = 'flex';
    // startGame()
}

const getExtraLife = () => {
    myFighterInfo.life += 10
    myFighterResult.innerHTML = `Fighter: Aaron.  Life: ${myFighterInfo.life}`
    setMyFighterInfo()
}

exit.addEventListener('click', endGame)
extraLife.addEventListener('click', getExtraLife)

popupToggle.onclick = function () {
    popup.style.display = 'block';
};

closeRules.onclick = function () {
    popup.style.display = 'none';
}

popupClose.onclick = function () {
    finalPopup.style.display = 'none';
    // finalResult.style.display = 'none';

}

window.onclick = function (e) {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
}

const createFinalResult = () => {
    finalPopup.style.display= 'block'
    finalResult.style.display= 'flex'
    // getBossInfo()
    // currentBossesInfo.forEach(e => {
    //
    //     bossResultInfo.innerHTML += `<p class="boss-name">Boss name: ${e.name}</p>
    //     <p class="strikes-repelled">Strikes repelled: ${e.beaten}</p>
    //     <p class="missed-hits">Missed hits: ${e.missed}</p>
    //    <p class="strikes-taken">Strikes taken: ${e.inflicted}</p>
    //     `
    // })
    // currentBossesInfo.forEach(e => {

    for (let prop in finalResultFight)
        bossResultInfo.innerHTML = `<p class="boss-name">Result</p> 
        <p class="strikes-repelled">Strikes repelled: ${finalResultFight.beaten}</p>
        <p class="missed-hits">Missed hits: ${finalResultFight.missed}</p>
       <p class="strikes-taken">Strikes taken: ${finalResultFight.inflicted}</p>
        `
    // })
}



const getPictureMouseDown = () => {
    console.log('down')
    myFighter.src = ''
    myFighter.src = 'img/myFighter-second-position.svg'
}

const getPictureMouseUp = () => {
    console.log('up')
    myFighter.src = ''
    myFighter.src = 'img/myfighte2.svg'
}

const mouseAction = () => {
    bossWrapper.addEventListener('mousedown', getPictureMouseDown)
    bossWrapper.addEventListener('mouseup', getPictureMouseUp)
}



resultBtn.addEventListener('click', createFinalResult)




