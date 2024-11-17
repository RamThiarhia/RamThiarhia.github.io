// scripts.js

document.getElementById("importStudentBtn").addEventListener("click", function() {
    // Trigger the hidden file input when the Import button is clicked
    document.getElementById("excelFileInput").click();
});

document.getElementById("excelFileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        // Read the file as binary string
        reader.readAsBinaryString(file);

        reader.onload = function(e) {
            const data = e.target.result;
            
            // Parse the Excel data using XLSX.js
            const workbook = XLSX.read(data, {
                type: 'binary'
            });

            // Assuming the student data is in the first sheet
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            
            // Convert the sheet to JSON
            const students = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            // Process the data and display it
            displayStudentData(students);
        };
    }
});

function displayStudentData(students) {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = ""; // Clear existing data

    // Iterate through the rows and add them to the table
    students.forEach(row => {
        // Assuming the first column is Student Name and the second is Student ID
        const name = row[0];
        const id = row[1];

        if (name && id) {
            const rowElement = document.createElement("tr");
            rowElement.innerHTML = `
                <td>${name}</td>
                <td>${id}</td>
            `;
            tableBody.appendChild(rowElement);
        }
    });

    // Show the table
    document.getElementById("studentTable").style.display = "block";
}
