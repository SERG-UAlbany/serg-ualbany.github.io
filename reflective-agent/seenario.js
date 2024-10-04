// Scenarios data
const scenarios = [
    {
        id: 1,
        text: "The system should handle user input errors.",
        options: [
            {
                text: "The system should display a generic error message for all input errors.",
                feedback: "This choice is too vague. It does not provide a specific action for the system or address all input error scenarios.",
                nextStep: "retry"
            },
            {
                text: "The system should highlight the specific input field causing an error and provide a descriptive message to the user.",
                feedback: "This is a more specific and complete requirement. It describes how the system responds and provides useful information to the user.",
                nextStep: "next"
            },
            {
                text: "The system should log input errors for future analysis.",
                feedback: "This choice addresses logging but doesn’t directly tackle how the system communicates errors to the user.",
                nextStep: "retry"
            }
        ]
    },
    {
        id: 2,
        text: "The system should authenticate users.",
        options: [
            {
                text: "The system should check the username and password combination.",
                feedback: "This is a good start but lacks detail. How will the system handle incorrect attempts, or what security measures will it implement?",
                nextStep: "retry"
            },
            {
                text: "The system should use two-factor authentication (2FA) to enhance security during user login.",
                feedback: "This is a detailed and complete requirement that addresses security.",
                nextStep: "end"
            },
            {
                text: "The system should store passwords in plaintext for quick access.",
                feedback: "This is a poor choice due to serious security implications. Never store passwords in plaintext.",
                nextStep: "retry"
            }
        ]
    }
];

let currentScenarioIndex = 0;

// Elements
const scenarioText = document.getElementById('scenario-text');
const optionsDiv = document.getElementById('options');
const feedbackDiv = document.getElementById('feedback');
const retryBtn = document.getElementById('retry-btn');
const nextBtn = document.getElementById('next-btn');

// Functions to handle scenario steps
function loadScenario(index) {
    const scenario = scenarios[index];
    scenarioText.textContent = scenario.text;
    feedbackDiv.textContent = '';
    retryBtn.classList.add('d-none');
    nextBtn.classList.add('d-none');
    optionsDiv.innerHTML = ''; // Clear previous options

    scenario.options.forEach((option, optionIndex) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'btn btn-outline-primary btn-block mt-2';
        optionButton.textContent = option.text;
        optionButton.onclick = () => handleOptionSelect(optionIndex);
        optionsDiv.appendChild(optionButton);
    });
}

function handleOptionSelect(index) {
    const scenario = scenarios[currentScenarioIndex];
    const selectedOption = scenario.options[index];
    feedbackDiv.textContent = selectedOption.feedback;

    if (selectedOption.nextStep === 'retry') {
        retryBtn.classList.remove('d-none');
    } else if (selectedOption.nextStep === 'next') {
        nextBtn.classList.remove('d-none');
    } else if (selectedOption.nextStep === 'end') {
        optionsDiv.innerHTML = ''; // Clear options
        feedbackDiv.textContent += " Scenario complete!";
    }
}

// Retry button click handler
retryBtn.onclick = () => loadScenario(currentScenarioIndex);

// Next button click handler
nextBtn.onclick = () => {
    currentScenarioIndex++;
    if (currentScenarioIndex < scenarios.length) {
        loadScenario(currentScenarioIndex);
    } else {
        scenarioText.textContent = "All scenarios complete!";
        optionsDiv.innerHTML = '';
        feedbackDiv.textContent = '';
        retryBtn.classList.add('d-none');
        nextBtn.classList.add('d-none');
    }
};

// Load the initial scenario on page load
window.onload = () => loadScenario(currentScenarioIndex);
