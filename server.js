const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = 5500;
app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    console.log("Received POST request for /send-email");
    console.log(req.body);  
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: 'appah.ko@gmail.com', 
        subject: subject,
        text: `Naam: ${name}\nEmail: ${email}\n\nBericht:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Er ging iets mis bij het verzenden van de e-mail.');
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('/thankyou.html');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
