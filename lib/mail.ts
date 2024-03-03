import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.email,
    pass: process.env.emailPassword
  }
});

const sendMail = async (message: string) => {
  try {
    await transporter.sendMail({
      from: process.env.email,
      to: process.env.email,
      subject: `${message}`,
      text: 'Mensaje desde Página Nanko Mangas'
    });
    return { success: true };
  } catch {
    return { success: false };
  }
};
export default sendMail;
