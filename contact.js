document.getElementById('contactForm').addEventListener('submit', function(event) {
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    
    if (name === "" || email === "" || subject === "" || message === "") {
        alert("Vul alle velden in voordat je het formulier verstuurt.");
        event.preventDefault(); 
        return; 
    }
    
    var formData = new FormData(document.getElementById("contactForm"));

   
    fetch('process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) 
    .then(result => {
        alert('Formulier succesvol verzonden!'); 
        console.log(result); 
    })
    .catch(error => {
        alert('Er is een fout opgetreden bij het verzenden van het formulier.');
        console.error('Error:', error); 
    });

    
    event.preventDefault();
});
