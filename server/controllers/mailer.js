import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from "dotenv"

dotenv.config()



// Gmail configuration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // your Gmail email address
        pass: process.env.PASSWORD // your Gmail password
    }
});

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
 *   "username" : "example123",
 *   "userEmail" : "admin123",
 *   "text" : "",
 *   "subject" : "",
 * }
 */
export const registerMail = async (req, res) => {
    const { firstName, userEmail, text, subject } = req.body;

    // body of the email
    var email = {
        body: {
            name: firstName,
            intro: text || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };

    var emailBody = MailGenerator.generate(email);

    let message = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: subject || 'Signup Successful',
        html: emailBody
    };

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: 'You should receive an email from us.' });
        })
        .catch(error => res.status(500).send({ error }));
};
