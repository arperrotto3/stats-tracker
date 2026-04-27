const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = process.env.CLIENT_URL + '/verify?token=' + token;

    await transporter.sendMail({
        from: '"Rift & Rifle" <' + process.env.EMAIL_USER + '>',
        to: email,
        subject: 'Verify your Rift & Rifle account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: white; padding: 2rem; border-radius: 12px;">
                <h1 style="color: #c89b3c; font-size: 2rem; margin-bottom: 0.5rem;">RIFT & RIFLE</h1>
                <h2 style="color: #f0e6d3; margin-bottom: 1rem;">Verify your email address</h2>
                <p style="color: #a0a0b0; line-height: 1.6;">Thanks for signing up! Click the button below to verify your email address. This link will expire in 24 hours.</p>
                <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #c89b3c, #785a28); color:white; padding: 1rem 2rem; border-radius: 4px; text-decoration: none; font-weight: bold; margin: 1.5rem 0;">VERIFY EMAIL</a>
                <p style="color: #555; font-size: 0.85rem;">If you didn't create an account, you can safely ignore this email.</p>
            </div>
        `
    });
};

module.exports = { sendVerificationEmail };