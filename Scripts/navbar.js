function loadNavbar() {
    fetch('/Structures/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        });
}

// Call the loadNavbar function when the page loads
window.onload = loadNavbar;