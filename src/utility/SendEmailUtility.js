const nodemailer = require("nodemailer");

const SendEmailUtility = async (emailTo, emailText, emailSubject) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: sarna, // Use environment variables
            pass: sarna5080, // Use environment variables
        },
    });

    const mailOptions = {
        from: 'Todo Planner <XJ8Zs@example.email>',
        to: emailTo,
        subject: emailSubject,
        text: emailText,
        
    
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", result);
        return result;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

module.exports = SendEmailUtility;
