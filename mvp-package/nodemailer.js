const nodemailer = require("nodemailer")

// async function sendMail() {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: 'agungstwn645@gmail.com',
//             pass: "sd",
//         }
//     })
// }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agungstwn645@gmail.com',
        pass: 'Qq@1234567'
    }
});

const mailOptions = {
  from: 'agungstwn645@gmail.com', // sender address
  to: "agungsyon@gmail.com", // list of receivers
  subject: "Success Make New Account", // Subject line
  text: `
  Congratulation! 
  Welcome to isWatch Family. 
  Makes your day Happy. 
  Enjoy the ride!
  `
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
});