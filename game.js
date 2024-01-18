let userScore;
let timerSeconds;
let timerInterval;
let randomLetters;

function initializeGame() {
    userScore = 0;
    timerSeconds = 60;
    randomLetters = generateRandomLetters();

    displayRandomLetters();
    startTimer();
}

function generateRandomLetters() {
    const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomLetters = '';

    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * allLetters.length);
        randomLetters += allLetters[randomIndex];
    }

    return randomLetters;
}

function shuffleLetters(word) {
    // Convert the word to an array of characters
    const lettersArray = word.split('');
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = lettersArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lettersArray[i], lettersArray[j]] = [lettersArray[j], lettersArray[i]];
    }

    // Convert the array back to a string
    return lettersArray.join('');
}

function displayRandomLetters() {
    const randomLettersContainer = document.getElementById('random-letters');
    randomLettersContainer.innerHTML = '';

    const shuffledLetters = shuffleLetters(randomLetters);

    for (let i = 0; i < 9; i++) {
        const letterCell = document.createElement('div');
        letterCell.className = 'letter-cell';
        letterCell.innerText = shuffledLetters[i];
        randomLettersContainer.appendChild(letterCell);
    }
}

function nextWord() {
    generateRandomLetters();
    displayRandomLetters();
}

function checkWord() {
    const userInput = document.getElementById('user-input').value.toUpperCase();
    const resultElement = document.getElementById('result');

    if (isValidWord(userInput)) {
        userScore += userInput.length;
        resultElement.innerText = 'Correct! Well done!';
        resultElement.classList.add('correct');
    } else {
        resultElement.innerText = 'Incorrect. Try again!';
        resultElement.classList.add('incorrect');
    }

    updateScore();
    document.getElementById('user-input').value = '';
    setTimeout(() => {
        resultElement.innerText = '';
        resultElement.classList.remove('correct', 'incorrect');
        generateRandomLetters();
        displayRandomLetters();
    }, 1500);
}

function isValidWord(word) {
    const validLetters = new Set(randomLetters.split(''));

    for (const letter of word) {
        if (!validLetters.has(letter)) {
            return false;
        }
    }

    return true;
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
    document.getElementById('game-container').innerHTML = '<p>Total Score: </p>'+userScore;
    document.getElementById('next-word-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'block';
}

function restartGame() {
    location.reload();
}

// Initialize the game on page load
initializeGame();
