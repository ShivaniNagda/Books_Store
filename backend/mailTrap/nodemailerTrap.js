
import dotenv from "dotenv";
dotenv.config();
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter } from "./mailTrap.config.js";

// const TOKEN = process.env.MAILTRAP_TOKEN;
// console.log("nodemailerTrap...",TOKEN)
export const sendVerificationEmail = async (email, verificationToken) => {
  console.log("SendVerificationEmail..Signup",email);
    const recipient = email;
try{
const message = await transporter
  .sendMail({
    from: process.env.MYEMAIL,
    to: recipient,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    html:VERIFICATION_EMAIL_TEMPLATE.replace(`{verificationCode}`,verificationToken),
    category: "Integration Test",
  })
  console.log(message)
  // return true;
}catch(err){
  console.log("Error sending email");
  console.log(err.message);
  throw new Error(`Error sending email : ${err}`);
  // return false;
  // return res.status(500).json({success:false,message:"Error sending verification email"});
}
}