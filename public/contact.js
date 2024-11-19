document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5500/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        });

        
        if (response.ok) {  
    window.location.href = "/thankyou.html";
        } else {
            document.getElementById("responseMessage").textContent = "Er ging iets mis bij het versturen van je bericht. Probeer het later opnieuw.";
            document.getElementById("responseMessage").style.color = "red"; 
        }
    } catch (error) {
        console.error("Fout bij het verzenden van de e-mail:", error);
        document.getElementById("responseMessage").textContent = "Er ging iets mis bij het versturen van je bericht. Probeer het later opnieuw.";
        document.getElementById("responseMessage").style.color = "red";
    }
});
