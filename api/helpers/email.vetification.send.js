const sgMail = require("@sendgrid/mail");

async function sendEmailVerification(recipient, verificationToken) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: { email: recipient },
    from: "teatrgsc@gmail.com",
    subject: "Email verification",
    text: "This link verify your email",
    html: `<a href='http://localhost:3000/api/auth/verify/${verificationToken}'>Click to verify</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}
module.exports = sendEmailVerification;
