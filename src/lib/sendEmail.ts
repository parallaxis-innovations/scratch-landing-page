// ToDo: Implement email sending functionality using nodemailer


import nodemailer from 'nodemailer';


interface EmailData {
    name: string;
    email: string;
    subject?: string;
    message: string;
}


export default async function sendEmail({ name, email, subject, message }: EmailData): Promise<Response> {
    try {

        const transporter = nodemailer.createTransport({
            host: 'mail.mycalltrackings.com',
            port: 587,
            secure: false,
            auth: {
                user: 'info@mycalltrackings.com',
                pass: '{@t(*pk%_EVa',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: 'info@mycalltrackings.com',
            to: 'info@innovatevoice.com',
            subject: subject || 'Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ message: 'Failed to send email' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}