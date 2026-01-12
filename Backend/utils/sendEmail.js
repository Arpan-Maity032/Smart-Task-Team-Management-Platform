const nodemailer = require("nodemailer");


const sendEmail =async (to, resetUrl)=>{
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const message = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below (valid for 15 minutes):</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;