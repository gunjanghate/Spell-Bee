let userScore;
let timerSeconds;
let timerInterval;
let words;
let currentWordIndex;

function initializeGame() {
    userScore = 0;
    timerSeconds = 60;
    currentWordIndex = -1; // Start with -1 to ensure the first word is displayed
    words = ["SPELL", "BEE", "JAVASCRIPT", "HTML", "CSS", "DEVELOPMENT", "CHALLENGE", "PROGRAMMING"];
    
    nextWord();
    startTimer();
}

function nextWord() {
    currentWordIndex++;
    if (currentWordIndex >= words.length) {
        endGame();
        return;
    }
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.toUpperCase();
    const resultElement = document.getElementById('result');

    if (userInput === words[currentWordIndex]) {
        userScore += 10;
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
    document.getElementById('game-container').innerHTML = '<p>Total Score:</p>'+userScore;
    document.getElementById('hint-btn').style.display = 'none';
    document.getElementById('next-word-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
}

function speakWord() {
    const wordSynthesis = new SpeechSynthesisUtterance(words[currentWordIndex]);
    window.speechSynthesis.speak(wordSynthesis);
}

function showHint() {
    alert("Hint: " + getWordMeaning(words[currentWordIndex]));
}

function restartGame() {
    location.reload();
}

function getWordMeaning(word) {
    const wordDictionary = {
        "SPELL": "To form words orally.",
        "BEE": "A gathering of people for a specific purpose.",
        "JAVASCRIPT": "A programming language commonly used for building interactive web applications.",
        "HTML": "Hypertext Markup Language, a standard markup language for creating web pages.",
        "CSS": "Cascading Style Sheets, used for styling web pages.",
        "DEVELOPMENT": "The process of designing, coding, testing, and maintaining software applications.",
        "CHALLENGE": "A stimulating and engaging task or problem.",
        "PROGRAMMING": "The act of instructing a computer to perform tasks through code or scripts."
        // ... add more words and meanings
    };

    return wordDictionary[word] || "Meaning not available.";
}

// Initialize the game on page load
initializeGame();
