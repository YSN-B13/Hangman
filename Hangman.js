const words = ["python", "hangman", "programming", "computer", "algorithm", "developer", "challenge"];
let word = "";
let wordLetters = new Set();
let usedLetters = new Set();
let tries = 6;

const hangmanParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];

function chooseWord() {
    word = words[Math.floor(Math.random() * words.length)];
    wordLetters = new Set(word);
}

function updateDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = word.split('').map(letter => 
        `<span class="letter ${usedLetters.has(letter) ? 'revealed' : ''}">${usedLetters.has(letter) ? letter : '_'}</span>`
    ).join(' ');

    document.getElementById('used-letters').textContent = 'Used letters: ' + Array.from(usedLetters).join(', ');
}

function updateHangman() {
    const partsToShow = 6 - tries;
    hangmanParts.forEach((part, index) => {
        document.getElementById(part).style.opacity = index < partsToShow ? 1 : 0;
    });
}

function guessLetter() {
    const guessInput = document.getElementById('guess-input');
    const letter = guessInput.value.toLowerCase();
    guessInput.value = '';

    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        showMessage('Please enter a valid letter.', 'warning');
        return;
    }

    if (usedLetters.has(letter)) {
        showMessage('You have already used that letter.', 'warning');
        return;
    }

    usedLetters.add(letter);

    if (wordLetters.has(letter)) {
        wordLetters.delete(letter);
        showMessage('Good guess!', 'correct');
    } else {
        tries--;
        updateHangman();
        showMessage(`Wrong guess! ${tries} tries left.`, 'wrong');
    }

    updateDisplay();

    if (tries === 0) {
        endGame(false);
    } else if (wordLetters.size === 0) {
        endGame(true);
    }
}

function showMessage(text, className) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = className;
}

function endGame(isWin) {
    const message = isWin ? 'Congratulations! You won!' : `Game over! The word was "${word}".`;
    showMessage(message, isWin ? 'win' : 'game-over');
    document.getElementById('guess-button').disabled = true;
    document.getElementById('guess-input').disabled = true;
    document.getElementById('restart-button').style.display = 'inline-block';
}

function restartGame() {
    tries = 6;
    usedLetters.clear();
    chooseWord();
    updateDisplay();
    updateHangman();
    showMessage('', '');
    document.getElementById('guess-button').disabled = false;
    document.getElementById('guess-input').disabled = false;
    document.getElementById('restart-button').style.display = 'none';
}

function initGame() {
    chooseWord();
    updateDisplay();
    updateHangman();
    document.getElementById('guess-button').addEventListener('click', guessLetter);
    document.getElementById('guess-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            guessLetter();
        }
    });
    document.getElementById('restart-button').addEventListener('click', restartGame);
}

initGame();