const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo, emailText, emailSubject) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
    auth: {
        user: "sarnamern@gmail.com",
        pass: "fewx mhlz leku qbwa",
    }
    });

    let mailOptions = {
        from: 'todo planner <sarnamern@gmail.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    };
    return await transporter.sendMail(mailOptions);
    

};

module.exports = SendEmailUtility;
