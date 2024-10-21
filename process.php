<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "Vul alle velden in.";
        exit; 
    }

    
    $to = "a.appah@idcp.nl"; 
    $email_subject = "Nieuw contactformulier: $subject";
    $email_body = "Naam: $name\n";
    $email_body .= "E-mail: $email\n";
    $email_body .= "Onderwerp: $subject\n";
    $email_body .= "Bericht:\n$message\n";

    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "E-mail succesvol verzonden.";
    } else {
        echo "Er is een fout opgetreden bij het verzenden van de e-mail.";
    }
} else {
    echo "Er is een probleem met het verzenden van het formulier.";
}
?>

