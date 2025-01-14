// Get the total points from localStorage
const points = localStorage.getItem('userPoints');

// Display the points on the page
if (points) {
    document.getElementById('user-points').textContent = `Total Points: ${points}`;
} else {
    document.getElementById('user-points').textContent = 'No points received.';
}

// Handle checkbox selection (only one task can be checked at a time)
const taskCheckboxes = document.querySelectorAll('input[type="checkbox"][name="Donate"]');

taskCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
        taskCheckboxes.forEach((otherCheckbox) => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;  // Uncheck other checkboxes
            }
        });
    });
});

// Handle proof submission
document.getElementById('submit-proof-form-btn').addEventListener('click', () => {
    const proofFile = document.getElementById('proof-file').files[0];
    const gradeSection = document.getElementById('gradeSection').value;
    const selectedTask = document.querySelector('input[type="checkbox"]:checked');
    
    if (!proofFile || !gradeSection || !selectedTask) {
        alert('Please fill in all fields.');
        return;    
    }

    const taskName = selectedTask.nextElementSibling.innerText;
    const points = selectedTask.getAttribute('data-points');

    // Prepare the submission data
    const submissionData = {
        gradeSection: gradeSection,
        date: new Date().toLocaleDateString(),
        task: taskName,
        points: points,
        // Since files can't be sent directly in a JSON object, use FormData for sending files
        proofFile: proofFile, 
    };

    // Send the proof and data to another link via POST
    const formData = new FormData();
    formData.append('gradeSection', gradeSection);
    formData.append('date', new Date().toLocaleDateString());
    formData.append('task', taskName);
    formData.append('points', points);
    formData.append('proofFile', proofFile); // Attach the file to FormData

    fetch('https://mine-kita.github.io/CCAP-PRES-monitor-/', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json()) // Assuming the server responds with JSON
    .then(data => {
        if (data.success) {
            alert('Proof submitted successfully!');
            document.getElementById('proof-form').reset(); // Reset the form after submission
        } else {
            alert('Failed to submit proof.');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
});

// Function to handle redirect to Scanner page
function redirectToScanner() {
    window.location.href = 'scanner.html';
}

// Handle logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.clear();
    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to login page
});

// Retrieve the username and email from localStorage
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

// Display the username and email
if (username) {
    document.getElementById('username').textContent = username;
} else {
    document.getElementById('username').textContent = 'Guest';
}

if (email) {
    document.getElementById('email').textContent = email;
} else {
    document.getElementById('email').textContent = 'No email available';
}
