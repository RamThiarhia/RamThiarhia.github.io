// Show Modals
document.getElementById('openLoginModal').onclick = () => $('#loginModal').modal('show');
document.getElementById('openRegisterModal').onclick = () => $('#registerModal').modal('show');

// Handle Login Form
document.getElementById('loginForm').onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists and password matches
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        window.location.href = '/Structures/main.html';  // Redirect to dashboard (or home page)
    } else {
        alert('Invalid credentials');
    }
};

// Handle Register Form
document.getElementById('registerForm').onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.some(u => u.username === username)) {
        alert('User already exists');
        return;
    }

    // Save the new user to localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully');
    $('#registerModal').modal('hide');
};
