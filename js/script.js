/*
    - Visualizzare in pagina 5 numeri casuali diversi. Da lì parte un timer di 30 secondi.
    - Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
    - Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

Bonus:
    - Mostriamo il countdown dei 30 secondi in pagina
    - Facciamo inserire i numeri all'utente tramite 5 campi di input invece che via prompt
*/

/* -----------------------------------------
* INIT
-------------------------------------------*/


//*** DOM ELEMENTS ***//
const messageElem = document.getElementById('game-message');
const gamePanelElem = document.getElementById('game-panel');
const playBtn = document.getElementById('play-btn');
const submitBtn = document.getElementById('submit-btn');
const numbersElem = document.querySelectorAll('.game-number');



// !Log Data
console.log('--- INIT ---');
console.log('### Eleemnti DOM:');
console.log('Messaggio: ' + messageElem);
console.log('Pannello: ' + gamePanelElem);
console.log('Bottone Play: ' + playBtn);
console.log('Bottone Invia: ' + submitBtn);
console.table('Numeri: ' + numbersElem);
console.log('--- INIT DONE ---');

/* -----------------------------------------
* LOGIC
-------------------------------------------*/

//*** CLICK PLAY BUTTON ***//
playBtn.addEventListener('click', () => {

    /* --------
    * FUNCTIONS
    ----------*/

    //*** GENERATE UNIQUE NUMBERS ***//
    const generateUniqueNumbers = (number, minValue, maxValue) => {

        const numbers = [];

        // Populate list
        while (numbers.length < number) {

            let randomNumber;

            // Get a random number until is unique
            do {
                randomNumber = Math.floor(Math.random() * (maxValue + 1 - minValue)) + minValue;

            } while (numbers.includes(randomNumber));

            // Add unique number inside the list
            numbers.push(randomNumber);
        }

        return numbers;
    }


    /* --------
    * LOGIC
    ----------*/

    // Hide Button
    playBtn.classList.add('d-none');


    // Generete 5 numbers from 1 to 20
    const numbers = generateUniqueNumbers(5, 1, 20);
    console.log(numbers);

    // Show Panel
    gamePanelElem.classList.remove('d-none');

});


