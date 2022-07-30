const form                   = document.querySelector('.form');
const nameUser               = document.querySelector('#name');
const emailUser              = document.querySelector('#email');
const submit                 = document.querySelector('.submit');
const clearBtn               = document.querySelector('.clear-btn');
const fightWrapper           = document.querySelector('.fight-wrapper');
const formWrapper            = document.querySelector('.form-wrapper');
const myFighter              = document.querySelector('.myFighter');
const exit                   = document.querySelector('.exit');
const exitFinal              = document.querySelector('.exit-final');
const bossWrapper            = document.querySelector('.bossWrapper');
const audioTag1              = document.querySelector('.audioTag1');
const audioTag2              = document.querySelector('.audioTag2');
const audioTag3              = document.querySelector('.audioTag3');
const resultAction           = document.querySelector('.resultAction');
const myFighterResult        = document.querySelector('.myFighterResult');
const extraLife              = document.querySelector('.extraLife');
const greeting               = document.querySelector('.greeting');
const startGameWrapper       = document.querySelector('.start-game-wrapper');
const legendGameBtn          = document.querySelector('.legend-game-btn');
const legendWrapper          = document.querySelector('.legend-wrapper');
const startGameBtn           = document.querySelector('.start-game-btn');
const legendFightBtn         = document.querySelector('.legend-fight-btn');
const levelWrapper           = document.querySelector('.level');
const popup                  = document.getElementById('mypopupRules');
const popupToggle            = document.getElementById('myBtn');
const popupClose             = document.querySelector('.close');
const closeRules             = document.querySelector('.close-rules');
const bossResultInfo         = document.querySelector('.boss-result-info');
const currentFightersWrapper = document.querySelector('.current-fighters-wrapper');
const finalResult            = document.querySelector('.final-result');
const gameOver               = document.querySelector('.game-over');
const resultBtn              = document.querySelector('.result-btn');
const finalPopup             = document.querySelector('.final-popup');

let values;
let currentBossIndex = 0;
let parsePlayer;
let currentBossesInfo;
let currentMyFighterInfo;
const LOW_LIFE_LEVEL = 5;
const EXTRA_LOW_LIFE_LEVEL = 1;

const myFighterInfo = {
    life: 10,
    newGame: false
}

const bosses = [
    {
        name: 'Bostor',
        life: 5,
        image: "img/boss3.svg",
        level: 1,
    }, {
        name: 'Selevan',
        life: 7,
        image: "img/secondBoss.svg",
        level: 2,
    }, {
        name: 'Duran',
        life: 10,
        image: "img/thirdBoss.svg",
        level: 3,
    },
]

const finalResultFight = {
    beaten: 0,
    missed: 0,
    inflicted: 0,
}

const setUserName = (element) => localStorage.setItem('player', JSON.stringify(element));

const getPlayerInfo = () => {
    let player = localStorage.getItem('player');
    parsePlayer = JSON.parse(player);
}

const setBossesInfo = () => localStorage.setItem('bosses', JSON.stringify(bosses));

const getBossInfo = () => {
    let bosses = localStorage.getItem('bosses');
    currentBossesInfo = JSON.parse(bosses);
}

const setMyFighterInfo = () => localStorage.setItem('myFighter', JSON.stringify(myFighterInfo));

const getMyFighterInfo = () => {
    let fighter = localStorage.getItem('myFighter');
    currentMyFighterInfo = JSON.parse(fighter);
}

getMyFighterInfo();

const firstPage = () => {
    getPlayerInfo();

    if (localStorage.getItem('player') !== null) {
        fightWrapper.style.display = 'block';
        formWrapper.style.display = 'none';
    } else {
        formWrapper.style.display = 'flex';
    }
}

firstPage();

const validateEmail = (email) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
};

const getUserNameForGreeting = () => {
    getPlayerInfo();
    greeting.innerHTML = `Welcome to the game, ${parsePlayer.name}. Choose the following action.`;
}

const watchLegend = () => {
    startGameWrapper.style.display = 'none';
    legendWrapper.style.display = 'flex';
}

const openFighterPage = () => {
    legendWrapper.style.display = 'none';
    startGameWrapper.style.display = 'none';
    fightWrapper.style.display = 'block';
    formWrapper.style.display = 'none';
}

const startGameAgain = () => {
    location.reload();
    myFighterInfo.newGame = true;
    setMyFighterInfo();
    fightWrapper.style.display = 'block';
    finalResult.style.display = 'none';
}

function playSingleBossSound() {
    audioTag1.play();
}

function playSingleRepulsedAttackSound() {
    audioTag2.play();
}

function playSingleMyFighterSound() {
    audioTag3.play();
}

function getFormElement(event) {
    event.preventDefault();

    const name = form.querySelector("[name = 'name' ]");
    const email = form.querySelector("[name = 'email']");

    values = {
        name: name.value,
        email: email.value,
    }

    if (name.value.length > 0 && email.value.length > 0) {
        if (validateEmail(email.value)) {
            setUserName(values);
            nameUser.value = '';
            emailUser.value = '';

            formWrapper.style.display = 'none';
            startGameWrapper.style.display = 'flex';

            myFighterInfo.newGame = false;
            setMyFighterInfo();

        } else {
            emailUser.value = '';
            alert('Enter correct email!');
        }

        setBossesInfo();
        setMyFighterInfo();
        getUserNameForGreeting();
    }
}

const clearForm = (event) => {
    event.preventDefault();

    nameUser.value = '';
    emailUser.value = '';
}

const createBoss = (boss) => {
    return `
        <div class="fighter-main-wrapper">
            <div class="info-wrapper-boss">
               <p>Fighter: ${boss.name}. Life: ${boss.life}.</p>
            </div>
            
            <div>
               <img class="fighterBoss" onclick="getResultAttack( getBossAction(3))"  src=${boss.image} alt="boss">
            </div>
        </div>
    `
}

const getBossAction = (max) => Math.floor(Math.random() * max);

const getResultAttack = (value) => {

    switch (value) {
        case 0 :
            resultAction.innerHTML = 'The attack was repulsed';
            resultAction.style.background = 'orange';
            attackRepulsedMusic();
            getBeatenKicked();
            mouseAction();
            break;
        case 1 :
            resultAction.innerHTML = '';
            resultAction.innerHTML = 'Damage dealt to the boss';
            resultAction.style.background = 'green';
            getMissedKicked();
            bossAttack();
            mouseAction();
            break;
        case 2 :
            resultAction.innerHTML = '';
            resultAction.innerHTML = 'Aaron\'s damage is done';
            resultAction.style.background = 'red';
            damageMusic();
            getMyFighterWound();
            getInflictedKicked();
            mouseAction();
            break;
        default:
            break;
    }
}


const getMyFighterWound = () => {
    --myFighterInfo.life;

    if (myFighterInfo.life === LOW_LIFE_LEVEL) {
        extraLife.style.display = 'block';
    }
    if (myFighterInfo.life > LOW_LIFE_LEVEL) {
        extraLife.style.display = 'none';
    }
    if (myFighterInfo.life === EXTRA_LOW_LIFE_LEVEL) {

        fightWrapper.style.display = 'none';
        finalResult.style.display = 'flex';
        gameOver.innerHTML = `<div class="game-over-lost-wrapper">
                              <br><h1 class="lost">You lost. Start the game again.</h1> 
                              <h2 class="lost">Use extra life to win</h2> 
                              <button class="start-game-btn" onclick="startGameAgain()">Start game</button>
                              </div>`
    }
    myFighterResult.innerHTML = '';
    myFighterResult.innerHTML = `Fighter: Aaron.  Life: ${myFighterInfo.life}`;
    setMyFighterInfo();
}

const attackRepulsedMusic = () => {
    playSingleRepulsedAttackSound();
}

const damageMusic = () => {
    playSingleMyFighterSound();
}

const getBeatenKicked = () => {
    finalResultFight.beaten += 1;
}

const getMissedKicked = () => {
    finalResultFight.missed += 1;
}

const getInflictedKicked = () => {
    finalResultFight.inflicted += 1;
}

const bossAttack = () => {
    playSingleBossSound();
    getBossInfo();

    if (currentBossesInfo[2].life === EXTRA_LOW_LIFE_LEVEL) {
        currentFightersWrapper.style.display = 'none';
        levelWrapper.style.display = 'none';
        finalResult.style.display = 'flex';
        fightWrapper.style.display = 'none';
        gameOver.innerHTML = `<div class="game-over-win-wrapper">
                                 <h1 class="game-over-win">Game over</h1>
                                 <h2 class="win">You win</h2>
                                 <h2 class="win">Now Aaron can sleep in peace.</h2>
                                  <button class="start-game-btn" onclick="startGameAgain()">Start game</button>
                              </div>`
    }

    const currentBoss = bosses[currentBossIndex];

    if (currentBoss.life !== EXTRA_LOW_LIFE_LEVEL) {
        bosses[currentBossIndex] = {
            ...currentBoss,
            life: --currentBoss.life
        }
    } else {
        currentBossIndex += 1;
    }

    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex]);
    levelWrapper.innerHTML = '';
    levelWrapper.innerHTML = `Level: ${bosses[currentBossIndex].level}`;

    setBossesInfo();
}

const startGame = () => {
    bossWrapper.innerHTML = createBoss(bosses[currentBossIndex]);
}

startGame();

const endGame = () => {
    localStorage.clear();
    location.reload();
    fightWrapper.style.display = 'none';
    formWrapper.style.display = 'flex';
    finalResult.style.display = 'none';
}

const getExtraLife = () => {
    myFighterInfo.life += 10;
    myFighterResult.innerHTML = `Fighter: Aaron.  Life: ${myFighterInfo.life}`;
    setMyFighterInfo();
}

popupToggle.onclick = () => {
    popup.style.display = 'block';
};

closeRules.onclick = () => {
    popup.style.display = 'none';
}

popupClose.onclick = () => {
    finalPopup.style.display = 'none';
}

window.onclick = (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
}

window.onclick = (e) => {
    if (e.target === finalPopup) {
        finalPopup.style.display = 'none';
    }
}

const createFinalResult = () => {
    finalPopup.style.display = 'block';
    finalResult.style.display = 'flex';

    for (let prop in finalResultFight)
        bossResultInfo.innerHTML = `<p class="final-rules-name">Result</p> 
        <p class="strikes-repelled">Strikes repelled: ${finalResultFight.beaten}</p>
        <p class="missed-hits">Missed hits: ${finalResultFight.missed}</p>
       <p class="strikes-taken">Strikes taken: ${finalResultFight.inflicted}</p>
        `
}

const getPictureMouseDown = () => {
    myFighter.src = '';
    myFighter.src = 'img/myFighter-second-position.svg';
}

const getPictureMouseUp = () => {
    myFighter.src = '';
    myFighter.src = 'img/myfighte2.svg';
}

const mouseAction = () => {
    bossWrapper.addEventListener('mousedown', getPictureMouseDown);
    bossWrapper.addEventListener('mouseup', getPictureMouseUp);
}

legendGameBtn.addEventListener('click', watchLegend);
startGameBtn.addEventListener('click', openFighterPage);
legendFightBtn.addEventListener('click', openFighterPage);
submit.addEventListener('click', getFormElement);
clearBtn.addEventListener('click', clearForm);
exit.addEventListener('click', endGame);
exitFinal.addEventListener('click', endGame);
extraLife.addEventListener('click', getExtraLife);
resultBtn.addEventListener('click', createFinalResult);


