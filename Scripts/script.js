let currentCourse = ''; // To store the current course name from URL

// Mapping of course names to prefixes
const coursePrefixes = {
    "BSCS": "IT",
    "BSIT": "IT",
    "BSHM": "HM",
    "BSBA": "BA",
    "BSMA": "MA",
    "BSCrim": "CR",
    "BSTM": "TM",
    "BA": "A",
};

// Function to load subjects from localStorage when the page is loaded
function loadSubjects() {
    // Get the course name from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentCourse = urlParams.get('course');
    
    // Set the course name in the header
    document.getElementById("course-name").textContent = currentCourse;

    // Retrieve stored subjects for this specific course
    const storedSubjects = JSON.parse(localStorage.getItem(currentCourse)) || [];
    
    // Display the subjects for this course
    storedSubjects.forEach(subject => {
        displaySubject(subject.name, subject.referenceID);
    });
}

// Open Modal
function openModal() {
    document.getElementById("subjectModal").style.display = "block";
}

// Close Modal
function closeModal() {
    document.getElementById("subjectModal").style.display = "none";
}

// Add Subject from the Modal
function addSubject() {
    const subjectName = document.getElementById("subjectName").value;
    if (subjectName) {
        const referenceID = generateUniqueReferenceID();
        const subject = { name: subjectName, referenceID };
        
        // Store the subject in localStorage for this course
        storeSubject(subject);

        // Display the newly added subject
        displaySubject(subjectName, referenceID);
        
        // Close the modal after adding the subject
        closeModal();
    } else {
        alert("Please enter a subject name.");
    }
}

// Generate a Unique Random Reference ID with Course-Specific Prefix
function generateUniqueReferenceID() {
    const prefix = coursePrefixes[currentCourse] || "GEN"; // Default to "GEN" if course not found
    let referenceID;
    let isUnique = false;
    
    // Get the global counter from localStorage for the specific prefix
    let globalCounter = JSON.parse(localStorage.getItem(`globalCounter_${prefix}`)) || 100000000001;

    // Keep generating until we find a unique ID for this prefix
    while (!isUnique) {
        referenceID = prefix + generateRandomNumber(globalCounter);
        
        // Check if the reference ID is unique across all subjects with the same prefix
        isUnique = !isReferenceIDUsed(referenceID);

        // If unique, increment the global counter for the prefix
        if (isUnique) {
            globalCounter++;
            localStorage.setItem(`globalCounter_${prefix}`, JSON.stringify(globalCounter)); // Update prefix counter
        }
    }
    
    return referenceID;
}

// Generate a Random 12-digit Number
function generateRandomNumber(counter) {
    return counter.toString().padStart(12, '0');
}

// Check if the reference ID is already used globally
function isReferenceIDUsed(referenceID) {
    const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];
    return allSubjects.some(subject => subject.referenceID === referenceID);
}

// Store subject in localStorage for the current course
function storeSubject(subject) {
    const storedSubjects = JSON.parse(localStorage.getItem(currentCourse)) || [];
    storedSubjects.push(subject);
    localStorage.setItem(currentCourse, JSON.stringify(storedSubjects));

    // Store the subject in a global all subjects list to track used reference IDs
    const allSubjects = JSON.parse(localStorage.getItem('allSubjects')) || [];
    allSubjects.push(subject);
    localStorage.setItem('allSubjects', JSON.stringify(allSubjects));
}

// Display a subject card with its name and reference ID
function displaySubject(subjectName, referenceID) {
    const subjectCards = document.querySelector(".subject-cards");

    // Create a new subject card
    const newSubjectCard = document.createElement("a");
    newSubjectCard.href = `answerkey.html?referenceID=${encodeURIComponent(referenceID)}&subject=${encodeURIComponent(subjectName)}`;
    newSubjectCard.classList.add("card");

    // Add Subject Name and Reference ID to the Card
    newSubjectCard.innerHTML = `
        <h3>${subjectName}</h3>
        <p class="reference-id">${referenceID}</p>
    `;

    subjectCards.appendChild(newSubjectCard);
}

// Attach the loadSubjects function to the window's load event
window.addEventListener('load', loadSubjects);
