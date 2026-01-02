import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import {transporter } from "./mailTrap.config.js";


export const sendVerificationEmail = async (email, verificationToken) => {
      const recipient = email ;
  console.log("recipient",recipient);
  try {
    const response = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(`{verificationCode}`,verificationToken),
      category:"Email Verification"
    });
    console.log("Email send successfully");
  } catch (err) {
    console.error(`Error Sending verification`,err);
    throw new Error(`Error sending verification email: ${err}`);
    }
};


export const sendWelcomeEmail= async(email,name)=>{
  const recipient = email ;
  console.log("SendWelcomeEmail",email)
  try {
    const response = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: recipient,
      subject: "Welcome you have signup successfully",
      html: `welcome ${name ? name : "dear"}, you have signup successfully`,
      category: "Welcome",
     
    })
    console.log("Welcome email sent successfully");
  }catch(err){
    
    console.log( "Error sending welcome email");
    console.log(err);
    throw new Error(`Error sending Welcome Email : ${err}`)
  }
}


export const sendPasswordResetEmail = async(email,resetURL) =>{
  const recipient = email;
  console.log("recipient",recipient);
  console.log("mailTrapsender",process.env.MYEMAIL,"recipient",recipient, "resetURL",resetURL);
  try {
    const response = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset"
      });
      console.log("Password reset email sent successfully",response);
      return true;
      } catch (err) {
        console.error("Error sending password reset email", err);
        throw new Error(`Error sending password reset email: ${err}`);
        }
        
}

export const sendResetSuccessEmail = async(email)=>{
  const recipient =  email ;
  console.log("recipient",recipient);
  try{
    const response = await transporter.sendMail({
      from: process.env.MYEMAIL,
      to: recipient,
      subject:"Password Reset Successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",

  });
}catch(err){
  console.log("Error sending password reset success email");
  console.log(err);
  throw new Error(`Error sending password reset success email : ${err}`);
}
}