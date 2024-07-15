const questions = [
    {
        question: "Which brand's tagline is 'Just Do It'?",
        answers: [
            { text: "Adidas", correct: false },
            { text: "Puma", correct: false },
            { text: "Nike", correct: true },
            { text: "Reebok", correct: false }
        ]
    },
    {
        question: "Which fabric is made from flax fibers?",
        answers: [
            { text: "Cotton", correct: false },
            { text: "Linen", correct: true },
            { text: "Silk", correct: false },
            { text: "Wool", correct: false }
        ]
    },
    {
        question: "Which brand's tagline is 'I'm Lovin' It'?",
        answers: [
            { text: "Burger King", correct: false },
            { text: "McDonald's", correct: true },
            { text: "KFC", correct: false },
            { text: "Subway", correct: false }
        ]
    },
    {
        question: "Which fashion house introduced the concept of the bikini swimsuit in 1946?",
        answers: [
            { text: "Chanel", correct: false },
            { text: "Louis Reard", correct: true },
            { text: "Louis Vuitton", correct: false },
            { text: "Dior", correct: false }
        ]
    },
    {
        question: "Which clothing brand's tagline is 'Because You're Worth It'?",
        answers: [
            { text: "Maybelline", correct: false },
            { text: "L'Oréal", correct: true },
            { text: "Revlon", correct: false },
            { text: "Estée Lauder", correct: false }
        ]
    },
    {
        question: "What is the term for a sleeveless garment worn over a shirt, often as part of formal wear?",
        answers: [
            { text: "Blazer", correct: false },
            { text: "Vest", correct: true },
            { text: "Jacket", correct: false },
            { text: "Cardigan", correct: false }
        ]
    },
    {
        question: "Which brand is known for its red-soled shoes?",
        answers: [
            { text: "Gucci", correct: false },
            { text: "Prada", correct: false },
            { text: "Jimmy Choo", correct: false },
            { text: "Christian Louboutin", correct: true }
        ]
    },
    {
        question: "What is the name of the hat typically worn by chefs?",
        answers: [
            { text: "Beret", correct: false },
            { text: "Toque", correct: true },
            { text: "Fedora", correct: false },
            { text: "Bowler", correct: false }
        ]
    }
];

let players = [];
let currentQuestionIndex, score, timerInterval;
const totalQuestions = questions.length;
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const endButton = document.getElementById('end-btn');
const scoreElement = document.getElementById('score');
const leaderboardList = document.getElementById('leaderboard-list');
const popup = document.getElementById('popup');
const nameInput = document.getElementById('name');
const finalScoreElement = document.getElementById('final-score');
const questionInfo = document.getElementById('question-info');
const timeLeftElement = document.getElementById('time-left');
const leaderboardContainer = document.getElementById('leaderboard-container');
const playAgainButton = document.getElementById('play-again-btn');

nextButton.addEventListener('click', nextQuestion);
endButton.addEventListener('click', endGame);
playAgainButton.addEventListener('click', playAgain);

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    nextButton.style.display = 'none';
    endButton.style.display = 'none';
    updateQuestionInfo();
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    if (answer.correct) {
        score += 10;
        scoreElement.innerText = `Score: ${score}`;
    }
    clearInterval(timerInterval);
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.style.display = 'block';
    } else {
        endButton.style.display = 'block';
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        updateQuestionInfo();
        showQuestion(questions[currentQuestionIndex]);
        startTimer();
        nextButton.style.display = 'none';
        endButton.style.display = 'none';
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    popup.style.display = 'flex';
    finalScoreElement.innerText = `Final Score: ${score}`;
}

function submitScore() {
    const playerName = nameInput.value.trim();
    if (playerName) {
        const player = { name: playerName, score: score };
        players.push(player);
        updateLeaderboard();
        popup.style.display = 'none';
        showLeaderboard();
    }
}

function updateLeaderboard() {
    players.sort((a, b) => b.score - a.score);
    leaderboardList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${player.name}: ${player.score}`;
        leaderboardList.appendChild(li);
    });
}

function showLeaderboard() {
    questionContainer.style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    leaderboardContainer.style.display = 'block';
}

function playAgain() {
    players = [];
    popup.style.display = 'none';
    questionContainer.style.display = 'block';
    document.getElementById('controls').style.display = 'flex';
    leaderboardContainer.style.display = 'none';
    startGame();
}

function updateQuestionInfo() {
    questionInfo.innerText = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
}

function startTimer() {
    let timeLeft = 15;
    timeLeftElement.innerText = timeLeft;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

startGame();
