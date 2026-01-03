
import dotenv from "dotenv";
dotenv.config();
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter } from "./mailTrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
  console.log("SendVerificationEmail..Signup",email,"process.env.MYEMAIL",process.env.MYEMAIL);
    const recipient = email;
try{
const message = await transporter
  .sendMail({
    from: process.env.MYEMAIL,
    to: recipient,
    subject: "Verify your email address",
    text: `Your verification code is ${verificationToken}`,
    html:VERIFICATION_EMAIL_TEMPLATE.replace(`{verificationCode}`,verificationToken),
    category: "Integration Test",
  })
  console.log(message)
 
}catch(err){
  console.log("Error sending email");
  console.log(err.message);
  throw new Error(`Error sending email : ${err.message}`);
}
}