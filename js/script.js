/* -----------------------------------------
* FUNCTIONS
-------------------------------------------*/

//*** RESET GAME ***//
const resetGame = () => {

    // Set start message
    messageElem.innerText = 'Premi il tasto "Gioca" per iniziare.';

    // Reset elements visibility
    countdownElem.classList.add('d-none');
    gamePanelElem.classList.add('d-none');
    playBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');

    // Reset Previous numbers
    simonNumbers.splice(0, numbersToGuess);

}


/* -----------------------------------------
* INIT
-------------------------------------------*/


//*** DOM ELEMENTS ***//
const messageElem = document.getElementById('game-message');
const countdownElem = document.getElementById('game-countdown');
const gamePanelElem = document.getElementById('game-panel');
const playBtn = document.getElementById('play-btn');
const submitBtn = document.getElementById('submit-btn');


//*** DATA ***//
const numbersToGuess = 5;
const simonNumbers = [];


// !Log Data
console.log('--- INIT ---');
console.log('### Eleemnti DOM:');
console.log('Messaggio: ' + messageElem);
console.log('Countdown: ' + countdownElem);
console.log('Pannello: ' + gamePanelElem);
console.log('Bottone Play: ' + playBtn);
console.log('Bottone Invia: ' + submitBtn);
console.log('--- INIT DONE ---');

/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY BUTTON ***//
playBtn.addEventListener('click', () => {

    /* --------
    * FUNCTIONS
    ----------*/


    /* --------
    * INIT
    ----------*/

    //*** DATA ***//
    let countdown;
    let count = 30;


    /* --------
    * LOGIC
    ----------*/

    //*** CREATE NUMBERS ***//
    let numbersElemList = '';

    // Populate list with unique numbers from 1 to 20
    while (simonNumbers.length < numbersToGuess) {

        let randomNumber;

        // Get a random number until is unique
        do {
            randomNumber = Math.floor(Math.random() * 20) + 1;

        } while (simonNumbers.includes(randomNumber));

        // Add unique number inside the list
        simonNumbers.push(randomNumber);

        // Create numbers elements
        numbersElemList += `
        <div class="col">

            <div class="border rounded p-4 game-number">
                
                <div class="fs-3">${randomNumber}</div>
                <input type="number" class="d-none" min="1" max="20" value="1">

            </div>

        </div>
        `;
    }

    // Insert numbers elements
    gamePanelElem.innerHTML = numbersElemList;


    //*** SET COUNTDOWN ***//

    // Set countdown on page
    countdownElem.innerText = count;

    // Start countdown
    countdown = setInterval(() => {

        // Update countdown
        countdownElem.innerText = --count;


        //*** COUNTDOWN OVER ***//
        if (count === 0) {

            // Stop timer
            clearInterval(countdown);

            // Hide countdown element
            countdownElem.classList.add('d-none');

            // Get dynamic elements
            const numbersElem = gamePanelElem.querySelectorAll('.game-number div');
            const numbersInput = gamePanelElem.querySelectorAll('.game-number input');

            // Hide numbers and show inputs 
            for (let i = 0; i < numbersToGuess; i++) {

                const numberElem = numbersElem[i];
                const numberinput = numbersInput[i];

                numberElem.classList.add('d-none');
                numberinput.classList.remove('d-none');
                
            }

            //*** SHOW GUESS STATE ELEMENTS ***//
            // Update message
            messageElem.innerText = `Digita i numeri precedenti in qualsiasi ordine.`;

            // Show submit button
            submitBtn.classList.remove('d-none');

        }

    }, 1000);


    //*** SHOW START GAME ELEMENTS ***//
    // Hide Button
    playBtn.classList.add('d-none');

    // Update message
    messageElem.innerText = `Hai ${count} secondi per memorizzare i numeri!`;

    // Show countdown
    countdownElem.classList.remove('d-none');

    // Show Panel
    gamePanelElem.classList.remove('d-none');

});



//*** CLICK SUBMIT BUTTON ***//
submitBtn.addEventListener('click', () => {

    // Get inputs Elem
    const numbersInput = gamePanelElem.querySelectorAll('.game-number input');

    // Get guessed numbers
    const guessedNumbers = [];
    let guessedNumbersString = '';

    for (let i = 0; i < numbersToGuess; i++) {

        // Get current input
        const currentInput = numbersInput[i];

        // Get user number
        const userNumber = parseInt(currentInput.value);

        // Check number guess
        if(!guessedNumbers.includes(userNumber) && simonNumbers.includes(userNumber)) {
            guessedNumbers.push(userNumber);
            guessedNumbersString += userNumber + ', ';
        }
    }

    //*** SHOW END GAME ELEMENTS ***//
    // Hide submit button
    submitBtn.classList.add('d-none');

    // Hide Panel
    gamePanelElem.classList.add('d-none');

    // Update message
    messageElem.innerText = 'Non hai individuato alcun numero.'
    if(guessedNumbers.length) messageElem.innerText = `Hai indovinato i numeri: ${guessedNumbersString} per un totale di ${guessedNumbers.length} numeri.`;

    // Start reset counter
    setTimeout(resetGame, 5000);

});