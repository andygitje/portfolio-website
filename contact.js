// script.js
document.getElementById('contactForm').addEventListener('submit', function(event) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Simpele validatie
    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        event.preventDefault(); // Voorkom het verzenden van het formulier
    }
});


function submitForm() {
    var formData = new FormData(document.getElementById("contactForm"));

    fetch('https://a.appah.idcp.nl', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())  // Handle the response as text or json
    .then(result => {
        alert('Form successfully submitted!');
        console.log(result);
    })
    .catch(error => {
        alert('There was an error submitting the form.');
        console.error('Error:', error);
    });
}