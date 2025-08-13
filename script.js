const questions = [
    {
        category: "history",
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        category: "history",
        question: "Which ancient civilization built the pyramids?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        answer: "Egyptians"
    },
    {
        category: "history",
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        answer: "1945"
    },
    {
        category: "astronomy",
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        category: "astronomy",
        question: "What is the largest planet in our solar system?",
        options: ["Mars", "Saturn", "Jupiter", "Neptune"],
        answer: "Jupiter"
    },
    {
        category: "astronomy",
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Triangulum", "Centaurus A"],
        answer: "Milky Way"
    },
    {
        category: "biology",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
        answer: "Mitochondrion"
    },
    {
        category: "biology",
        question: "What is the process by which plants make their food?",
        options: ["Photosynthesis", "Respiration", "Digestion", "Fermentation"],
        answer: "Photosynthesis"
    },
    {
        category: "biology",
        question: "Which blood type is known as the universal donor?",
        options: ["Type A", "Type B", "Type AB", "Type O-"],
        answer: "Type O-"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('progress-bar');
const quizContent = document.getElementById('quiz-content');
const resultsContainer = document.getElementById('results-container');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const clickSound = document.getElementById('click-sound');
const quizContainer = document.querySelector('.quiz-container');
const darkModeBtn = document.getElementById('dark-mode-toggle');

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    setTheme(currentQuestion.category);
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
            checkAnswer(option);
        });
        optionsContainer.appendChild(button);
    });

    updateProgress();
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct-answer');
        }
        if (btn.textContent === selectedOption && selectedOption !== correctAnswer) {
            btn.classList.add('wrong-answer');
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        scoreText.textContent = score;
        // Add animation class
        scoreText.classList.add('animate');
        // Remove animation class after animation completes
        setTimeout(() => {
            scoreText.classList.remove('animate');
        }, 500);
    }

    // Wait 1.5 seconds before moving to next question
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1500);
}

function updateProgress() {
    const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showResults() {
    quizContent.style.display = 'none';
    resultsContainer.style.display = 'block';
    finalScore.textContent = `Your final score is ${score} out of ${questions.length}.`;
}

function setTheme(category) {
    quizContainer.className = `quiz-container theme-${category}`;
}

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const modeText = darkModeBtn.querySelector('.mode-text');
    modeText.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
});

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = 'Score: 0';
    quizContent.style.display = 'block';
    resultsContainer.style.display = 'none';
    loadQuestion();
});

// Initial load
loadQuestion();
