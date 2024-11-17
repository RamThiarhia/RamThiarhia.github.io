let currentReferenceID = ''; // To track the current reference ID
let answerKey = {}; // Object to store answers
console.log("Answer Key Reference ID:", currentReferenceID);


// Load the Answer Key page for the selected subject
function loadAnswerKey() {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectName = urlParams.get('subject');
    currentReferenceID = urlParams.get('referenceID');

    // Set the subject name in the header
    document.getElementById('subject-name').textContent = `Answer Key for ${subjectName}`;

    // Load existing answers for this reference ID
    answerKey = JSON.parse(localStorage.getItem(`answerKey_${currentReferenceID}`)) || {};

    // Generate the question list dynamically
    const questionList = document.querySelector('.question-list');
    for (let i = 1; i <= 20; i++) {
        const question = document.createElement('div');
        question.className = 'question';

        // Question Number
        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.textContent = `Question ${i}`;
        question.appendChild(questionNumber);

        // Options A to E
        for (let option of ['A', 'B', 'C', 'D', 'E']) {
            const optionButton = document.createElement('div');
            optionButton.className = 'option';
            optionButton.textContent = option;
            optionButton.setAttribute('data-question', i);
            optionButton.setAttribute('data-option', option);

            // Highlight if previously selected
            if (answerKey[i] === option) {
                optionButton.classList.add('selected');
            }

            // Add click event to toggle selection
            optionButton.addEventListener('click', () => selectAnswer(i, option));
            question.appendChild(optionButton);
        }

        questionList.appendChild(question);
    }
}

// Select an answer for a question
function selectAnswer(questionNumber, option) {
    // Remove "selected" class from all options of the question
    const options = document.querySelectorAll(`.option[data-question="${questionNumber}"]`);
    options.forEach(opt => opt.classList.remove('selected'));

    // Add "selected" class to the chosen option
    const selectedOption = document.querySelector(`.option[data-question="${questionNumber}"][data-option="${option}"]`);
    selectedOption.classList.add('selected');

    // Update the answer key
    answerKey[questionNumber] = option;
}

// Save the answer key to localStorage
function saveAnswerKey() {
    if (currentReferenceID) {
        localStorage.setItem(`answerKey_${currentReferenceID}`, JSON.stringify(answerKey));
        alert('Answer key saved successfully!');
    } else {
        alert('Unable to save. Reference ID is missing.');
    }
}

// Go back to the previous page
function goBack() {
    window.history.back();
}

// Load the answer key when the page is ready

window.addEventListener('load', loadAnswerKey);
