<?php

header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type");  


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang de waarden van het formulier
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Gegevens voor de e-mail
    $to = "a.appah@idcp.nl";  // Ontvangende e-mail
    $email_subject = "Nieuw contactformulier verzonden: $subject";  // Onderwerp van de e-mail
    $email_body = "Naam: $name\nE-mail: $email\nOnderwerp: $subject\nBericht:\n$message";  // Inhoud van de e-mail
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Verstuur de e-mail
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(["status" => "success", "message" => "E-mail succesvol verzonden naar: $to"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Er is een fout opgetreden bij het verzenden van de e-mail."]);
    }

    // Als je data naar een externe server wil sturen, kun je dit met cURL doen (optioneel)
    $url = 'https://example.com/api/contact';  // De URL van de externe server
    $data = [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    // Verwerk het antwoord van de externe server (optioneel)
    echo "Response from external server: " . $response;
} else {
    // Geef een foutmelding als het geen POST-aanvraag is
    echo json_encode(["status" => "error", "message" => "Ongeldig verzoek."]);
}
?>
