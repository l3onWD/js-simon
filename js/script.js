/* -----------------------------------------
* FUNCTIONS
-------------------------------------------*/



/* -----------------------------------------
* INIT
-------------------------------------------*/

//*** DOM ELEMENTS ***//
const messageElem = document.getElementById('message');
const countdownElem = document.getElementById('countdown');
const numbersElem = document.getElementById('numbers');
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
console.log('Pannello: ' + numbersElem);
console.log('Bottone Play: ' + playBtn);
console.log('Bottone Invia: ' + submitBtn);
console.log('--- INIT DONE ---');

/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** MEMORIZE PHASE ***//
playBtn.addEventListener('click', () => {

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

    // Reset Previous numbers
    simonNumbers.splice(0, numbersToGuess);

    // Create Numbers
    while (simonNumbers.length < numbersToGuess) {

        let randomNumber;

        // Get a random number from 1 to 20 until is unique
        do {
            randomNumber = Math.floor(Math.random() * 20) + 1;

        } while (simonNumbers.includes(randomNumber));

        // Add unique number inside the list
        simonNumbers.push(randomNumber);

        // Create HTML elements
        numbersElemList += `
        <div class="col">

            <div class="border rounded p-4 number">
                
                <div class="fs-3">${randomNumber}</div>
                <input type="number" class="d-none" min="1" max="20" value="1">

            </div>

        </div>
        `;
    }

    // Insert numbers elements
    numbersElem.innerHTML = numbersElemList;


    //*** SHOW MEMORIZE PHASE ELEMENTS ***//
    // Hide Button
    playBtn.classList.add('d-none');

    // Update message
    messageElem.innerText = `Hai ${count} secondi per memorizzare i numeri!`;

    // Show countdown
    countdownElem.classList.remove('d-none');

    // Show Numbers
    numbersElem.classList.remove('d-none');

    // Set countdown on page
    countdownElem.innerText = count;
    
    
    //*** SET COUNTDOWN ***//
    countdown = setInterval(() => {

        // Update countdown
        countdownElem.innerText = --count;


        //*** GUESSING PHASE ***//
        if (count === 0) {

            // Stop timer
            clearInterval(countdown);


            //*** SHOW GUESS PHASE ELEMENTS ***//
            // Get dynamic elements
            const simonNumbersElem = numbersElem.querySelectorAll('.number div');
            const userNumbersElem = numbersElem.querySelectorAll('.number input');

            // Hide numbers and show inputs 
            for (let i = 0; i < numbersToGuess; i++) {

                const simonNumberElem = simonNumbersElem[i];
                const userNumberElem = userNumbersElem[i];

                simonNumberElem.classList.add('d-none');
                userNumberElem.classList.remove('d-none');
            }

            // Hide countdown element
            countdownElem.classList.add('d-none');

            // Update message
            messageElem.innerText = `Digita i numeri precedenti in qualsiasi ordine.`;

            // Show submit button
            submitBtn.classList.remove('d-none');

        }

    }, 1000);

});



//*** RESULT PHASE ***//
submitBtn.addEventListener('click', () => {

    //*** GET GUESSED NUMBERS ***//
    // Prepare guessed numbers
    const guessedNumbers = [];
    let guessedNumbersString = '';

    // Get inputs Elem
    const userNumbersElem = numbersElem.querySelectorAll('.number input');

    for (let i = 0; i < numbersToGuess; i++) {

        // Get current input
        const UserNumberElem = userNumbersElem[i];

        // Get user number
        const userNumber = parseInt(UserNumberElem.value);

        // Check number guess
        if(!guessedNumbers.includes(userNumber) && simonNumbers.includes(userNumber)) {
            guessedNumbers.push(userNumber);
            guessedNumbersString += userNumber + ', ';
        }
    }

    
    //*** SHOW RESULT PHASE ELEMENTS ***//
    // Hide submit button
    submitBtn.classList.add('d-none');

    // Hide Numbers
    numbersElem.classList.add('d-none');

    // Update message
    messageElem.innerText = 'Non hai indovinato nessun numero.'
    if(guessedNumbers.length) messageElem.innerText = `Hai indovinato i numeri: ${guessedNumbersString} per un totale di ${guessedNumbers.length} numeri.`;

    // Show Play button after a delay
    setTimeout(() => {

        playBtn.classList.remove('d-none');
        playBtn.innerText = 'Rigioca';

    }, 5000);

});