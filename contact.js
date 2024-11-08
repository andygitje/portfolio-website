document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Voorkom standaardformulieractie

    // Verzamel formuliergegevens
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        // Verstuur POST-verzoek naar de server
        const response = await fetch("/send-email", {
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

        // Controleer of de e-mail succesvol is verzonden
        const result = await response.text();
        document.getElementById("responseMessage").textContent = result;
    } catch (error) {
        console.error("Fout bij het verzenden van de e-mail:", error);
        document.getElementById("responseMessage").textContent = "Er ging iets mis bij het versturen van je bericht. Probeer het later opnieuw.";
    }
});
