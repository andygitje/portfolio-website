<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    $to = "aappah.ko@gmail.com";  
    $email_subject = "Nieuw contactformulier bericht: $subject";
    $email_body = "Je hebt een nieuw bericht ontvangen van je portfolio website.\n\n";
    $email_body .= "Naam: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Onderwerp: $subject\n";
    $email_body .= "Bericht:\n$message\n";
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Bedankt voor je bericht, $name. We nemen zo snel mogelijk contact met je op.";
    } else {
        echo "Er is een fout opgetreden bij het versturen van het bericht. Probeer het later opnieuw.";
    }
} else {
    echo "Ongeldige verzoekmethode.";
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
