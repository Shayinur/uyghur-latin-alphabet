//step2 - Get the elements you’ll need from your HTML
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset')
const phraseList = document.querySelector('#phrase ul');
const heart = document.querySelectorAll('.tries img');
const promptDisplay = document.querySelector('.prompt');

//Create a missed variable, initialized to 0
let missed = 0;


//Step 3 - Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', () => {
    overlay.style.display='none';      
});

//Step 3.5 show the prompt
let prompt = [
    'eggplant OR Cheze',
    'cabbage OR Basai',
    'coconut',
    'ginger OR Singjiang',
    'mint OR Bohe',
    'Spinach OR Bosai',
    'Cucumber OR Hangga',
    'Pineapple OR Bolo',
    'Celery OR ChinSai',
    'Strawberry',
    'Arugula',
    'Cilantro'
];


let index = Math.floor((Math.random() * prompt.length)); 
promptDisplay.innerHTML = prompt[index];


//Step 4 - Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
    'pedigen',
    'yeswilek',
    'kokus',
    'zenjiwil',
    'yalpuz',
    'palek',
    'terhemek',
    'ananas',
    'kerepshe',
    'boljurgen',
    'taratizaq',
    'ashkoki'
];

//Step 5 - Create a getRandomPhraseAsArray function
function getRandomPhraseAsArray(arr){
    let randomPhrase = arr[Math.floor(Math.random()* arr.length)];
    return randomPhrase.split('');
} 


//Step 6 - Set the game display
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++){
        const li = document.createElement('li');
        li.textContent = arr[i];
        phraseList.append(li);
        if(arr[i] === " ") {
            li.className = "space"; 
        } else {
            li.className = "letter";
        }
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 


//Step 7 -  Create a checkLetter function
const checkLetter = button => {
    const checkLetter = document.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < checkLetter.length; i++) {
        if (checkLetter[i].textContent === button) {
            checkLetter[i].classList.add('show');
            match = button;
        }
    }
    return match;
}

//Step 8 - Add an event listener to the keyboard
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        e.target.className = 'chosen';
        const checked = checkLetter(e.target.textContent);
        if (checked === null) {
            heart[missed].src = 'images/lostHeart.png';
            missed ++;
         }
    }
    checkWin();
});

//Step 9 - Count the missed guesses in the game.
//step 10 - Create a checkWin function.
const checkWin = () => {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const headline = document.querySelector('.title');
    if (letter.length === show.length) {
        overlay.classList.add('win');
        headline.textContent = 'You win!';
        overlay.style.display = 'flex';
        reset();
    } else if (missed > 4) {
        overlay.classList.add('lose');
        headline.textContent = 'You lose:(';
        overlay.style.display = 'flex';
        reset();
    }
}


function reset() {
    missed = 0;
    phraseList.innerHTML = '';
    const resetPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(resetPhrase);
    const chosenBtn = document.querySelectorAll('button');
    for (let i = 0; i < chosenBtn.length; i++) {
        chosenBtn[i].classList.remove('chosen');
    }
    for (let i = 0; i < heart.length; i++) {
        heart[i].src = 'images/liveHeart.png';
    }
}