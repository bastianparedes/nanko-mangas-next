import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendMail = async (message: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL_PASSWORD,
      subject: `${message}`,
      text: 'Mensaje desde Página Nanko Mangas'
    });
  } catch {
    return { success: false };
  }

  return { success: true };
};
export default sendMail;
