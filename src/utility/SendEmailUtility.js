const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo, emailSubject, emailText) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
    auth: {
        user: "sarnaqueen@gmail.com",
        pass: "$$sarna3333",
    }
    });

    const mailOptions = {
        from: 'to-do-planner <sarnaqueen@gmail.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    };
    return await transporter.sendMail(mailOptions);
    

};

module.exports = SendEmailUtility;
