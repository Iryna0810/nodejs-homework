import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_PASSWORD, EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525, // 25, 2525
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: UKR_PASSWORD,
  }
};


const transport = nodemailer.createTransport(nodemailerConfig);

 const sendEmail = async data => {
  const email = { ...data, from: EMAIL_FROM };
  await transport.sendMail(email);
};

export default sendEmail

