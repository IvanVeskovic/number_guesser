/*
    GAME FUNCTION:
    - Player must guess a nmber between a min and max
    - Player gets a cecrtain amount of guesses
    - Notify player of gesses remainig
    - Notify the player of the correct answer if loose
    - Lets player choose to play again
*/

// Game values
let min = 1,
    max = 15,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if(guess === winningNum) {
        // Game over won
        gameOver(true, `${winningNum} is correct! YOU WIN`)
    } else {
        // Wrong Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
        } else {
            // Game continues - answer wrong
            // Chage border color
            guessInput.style.borderColor = 'red';

            // Clear input
            guessInput.value = '';
            
            // Tell user
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }

    }

})

// Game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
     // Set text color
     message.style.color = color;
    // Change border color
    guessInput.style.borderColor = color;
    // Set message
    setMessage(msg);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, num){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
    