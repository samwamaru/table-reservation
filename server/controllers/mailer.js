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
        <h1>Your bill has arrived!</h1>
        <p>Name: Daily Tuition</p>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nodemailer Stack Book</td>
              <td>A Backend application</td>
              <td>$10.99</td>
            </tr>
          </tbody>
        </table>
        <p>Looking forward to doing more business</p>
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
