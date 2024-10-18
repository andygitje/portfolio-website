<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Gegevens om de e-mail te versturen
    $to = "a.appah@idcp.nl"; // Ontvangende e-mail
    $subject = "Nieuw contactformulier verzonden";
    $body = "Naam: $name\nE-mail: $email\nBericht:\n$message";
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Verzenden van de e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "E-mail succesvol verzonden naar: $to";
    } else {
        echo "Er is een fout opgetreden bij het verzenden van de e-mail.";
    }

    // cURL om data naar externe server te sturen
    $url = '/contact.html'; // Externe server URL
    $data = [
        'name' => $name,
        'email' => $email,
        'message' => $message
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    // Hier kun je het antwoord van de externe server verwerken
    echo "Response from external server: " . $response;
}
?>
