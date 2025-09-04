// DOM element selections
const stepContents = document.querySelectorAll('.step-content');
const mainStepButtons = document.querySelectorAll('.next-main-step-btn');
const progressBar = document.getElementById('progress-bar');
const stepIndicator = document.getElementById('step-indicator');
const totalSteps = 7;
let currentStep = 0;

// Quiz variables and elements
const quizQuestions = [
    {
        question: "What is the main goal of phishing?",
        options: ["To increase a computer's performance", "To steal user data and personal information", "To increase website traffic"],
        answer: 1,
        image: ""
    },
    {
        question: "Which of the following URLs is more suspicious for a phishing attack?",
        options: ["https://www.google.com", "https://google.com.in", "http://google.com-security.net"],
        answer: 2,
        image: "https://placehold.co/400x200/FCA5A5/ffffff?text=URL+Example"
    },
    {
        question: "Which of the following is a common feature of a phishing email?",
        options: ["Creating a sense of urgency and demanding quick action", "Including a personalized greeting", "Being written in a formal and trusted language"],
        answer: 0,
        image: ""
    },
    {
        question: "What should you do to prevent phishing?",
        options: ["Open and check all emails", "Check the URL before clicking on suspicious links", "Trust every message you receive"],
        answer: 1,
        image: ""
    },
    {
        question: "Where should you report a suspicious message?",
        options: ["Forward it via email to all your colleagues", "Delete and forget about it", "Report it to the IT department or a relevant unit"],
        answer: 2,
        image: ""
    },
    {
        question: "What is a phishing attack carried out via a phone call called?",
        options: ["Smishing", "Vishing", "Whaling"],
        answer: 1,
        image: ""
    },
    {
        question: "What do phishing attacks typically target?",
        options: ["Credit card information", "Social security numbers", "Both of them"],
        answer: 2,
        image: ""
    },
];
let currentQuestion = 0;
let score = 0;
const questionText = document.getElementById('question-text');
const questionImage = document.getElementById('question-image');
const quizOptions = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const nextQuizBtn = document.getElementById('next-quiz-btn');
const scoreDisplay = document.getElementById('score-display');
const restartButton = document.getElementById('restart-button');

// Function to update the UI
function updateUI() {
    stepContents.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
    });
    const progress = (currentStep / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progress}%`;
    stepIndicator.textContent = `Step ${currentStep + 1}/${totalSteps}`;
}

// Function to show a specific step
function showStep(stepIndex) {
    currentStep = stepIndex;
    updateUI();
    if (currentStep === 5) {
        loadQuizQuestion();
    }
}

// Event listeners for the main "Continue" buttons
mainStepButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showStep(index + 1);
    });
});

// Quiz functions
function loadQuizQuestion() {
    // Move to the results screen when all questions are finished
    if (currentQuestion >= quizQuestions.length) {
        showStep(6);
        scoreDisplay.textContent = score;
        return;
    }
    const q = quizQuestions[currentQuestion];
    questionText.textContent = `Question ${currentQuestion + 1}/${quizQuestions.length}: ${q.question}`;
    quizOptions.innerHTML = '';
    quizFeedback.innerHTML = '';
    nextQuizBtn.classList.add('hidden');

    if (q.image) {
        questionImage.innerHTML = `<img src="${q.image}" alt="Quiz Image" class="mx-auto rounded-lg shadow-md max-w-sm w-full h-auto">`;
    } else {
        questionImage.innerHTML = '';
    }

    q.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('quiz-option', 'w-full', 'bg-white', 'hover:bg-gray-50', 'text-gray-800', 'font-semibold', 'py-3', 'px-4', 'border', 'rounded-xl', 'shadow-sm', 'transition-transform', 'transform', 'duration-200', 'ease-in-out', 'text-left');
        button.addEventListener('click', () => selectOption(index));
        quizOptions.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const q = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.answer) {
        options[selectedIndex].classList.add('correct');
        quizFeedback.innerHTML = '<p class="text-green-600 font-bold">Correct!</p>';
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[q.answer].classList.add('correct');
        quizFeedback.innerHTML = '<p class="text-red-600 font-bold">Incorrect.</p>';
    }
    nextQuizBtn.classList.remove('hidden');
}

nextQuizBtn.addEventListener('click', () => {
    currentQuestion++;
    loadQuizQuestion();
});

restartButton.addEventListener('click', () => {
    currentStep = 0;
    currentQuestion = 0;
    score = 0;
    updateUI();
});

// Initialize the UI on page load
updateUI();
