const nodemailer = require('nodemailer');

module.exports = async function main(mail, msg) {


    let mailTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        // service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });

    let mailDetails = {
        from: process.env.USER,
        to: mail,
        subject: 'Spericorn Welcomes You',
        text: msg
        // html: '<b>Spericorn</b>'
    };

    await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        } else {
            console.log('Email successfully sent to ', mail);

        }
    });

}
// main().catch(console.error)
// module.exports = { main } 