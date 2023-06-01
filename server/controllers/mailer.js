import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const registerMail = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let emailContent = `
    <html>
      <head>
        <style>
          /* Add your custom styles here */
        </style>
      </head>
      <body>
        <h1>Your reservation  request has been confirmed</h1>
        <p>Name: Jesse bett</p>
        <table>
          <thead>
            <tr>
              <th>Table Number </th>
              <th>Duration</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Table 5</td>
              <td>3 hours</td>
              <td> 17:00-</td>
            </tr>
          </tbody>
        </table>
        <p>Enjoy you meals </p>
      </body>
    </html>
  `;

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Place Order',
    html: emailContent,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: 'You should receive an email',
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};
