import nodemailer from "nodemailer";

interface IMail {
    to: string,
    subject: string,
    text: string,
    html: string
}

export interface IMailResponse {
    success: boolean,
    message: string,
    rejected?: string[]
}

const EMAIL_USER = process.env.EMAIL_USER as string;
const EMAIL_PASS = process.env.EMAIL_PASS as string;

if (!EMAIL_PASS || !EMAIL_USER) {
    throw new Error("Email User or Pass is undefined")
}

const transporter = nodemailer.createTransport(({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
}));

const sendMail = async ({ to, subject, text, html }: IMail): Promise<IMailResponse> => {

    const mailOptions = {
        from: `TODO <${EMAIL_USER}>`,
        to,
        subject,
        text,
        html
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        if (info.rejected.length > 0) {
            const rejectedList = info.rejected.map((i) => typeof i === 'string' ? i : i.address)
            return { success: false, message: "Mail not sent", rejected: rejectedList }
        }
        return { success: true, message: "Mail sent successfully" }

    } catch (err: any) {
        console.log("Error in Sending email:", err?.message);
        return { success: false, message: err?.message || "Unknown error" }
    }
}

export default sendMail