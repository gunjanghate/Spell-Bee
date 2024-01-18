let currentWord;
let missingLettersIndices;
let userScore;
let timerSeconds;
let timerInterval;

function initializeGame() {
    userScore = 0;
    timerSeconds = 60;
    nextWord();
    startTimer();
}

function nextWord() {
    currentWord = getRandomWord();
    missingLettersIndices = getRandomMissingIndices(currentWord);
    displayWord();
}

function displayWord() {
    const wordWithBlanks = currentWord.split('').map((letter, index) => {
        return missingLettersIndices.includes(index) ? '_' : letter;
    }).join(' ');

    document.getElementById('word').innerText = wordWithBlanks;
}

function getRandomWord() {
    const words = ["COMPLEX", "PUZZLE", "CURIOSITY", "ENIGMA", "BRAINSTORM", "CHALLENGE"];
    return words[Math.floor(Math.random() * words.length)];
}

function getRandomMissingIndices(word) {
    const wordLength = word.length;
    const missingCount = Math.floor(wordLength / 3); // Randomly decide the number of missing letters
    const indices = [];

    while (indices.length < missingCount) {
        const index = Math.floor(Math.random() * wordLength);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }

    return indices;
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.toUpperCase();
    const resultElement = document.getElementById('result');

    if (userInput === currentWord) {
        resultElement.innerText = 'Correct! Well done!';
        resultElement.classList.add('correct');
        userScore += 10;
    } else {
        resultElement.innerText = 'Incorrect. Try again!';
        resultElement.classList.add('incorrect');
    }

    updateScore();
    document.getElementById('user-input').value = '';
    setTimeout(() => {
        resultElement.innerText = '';
        resultElement.classList.remove('correct', 'incorrect');
        nextWord();
    }, 1500);
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + userScore;
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (timerSeconds > 0) {
            timerSeconds--;
            document.getElementById('timer').innerText = 'Time: ' + timerSeconds + 's';
        } else {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('timer').innerText = 'Time: 0s';
    document.getElementById('result').innerText = 'Game Over! Total Score: ' + userScore;
    document.getElementById('game-container').innerHTML = '<p>Total score: </p>' + userScore;
    document.getElementById('hint-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
}

function provideHint() {
    const hintIndex = missingLettersIndices[Math.floor(Math.random() * missingLettersIndices.length)];
    const hintLetter = currentWord[hintIndex];
    document.getElementById('word').innerText = document.getElementById('word').innerText.replace('_', hintLetter);
}

function restartGame() {
    location.reload();
}

// Initialize the game on page load
initializeGame();
