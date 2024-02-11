import sgMail from "@sendgrid/mail";
import "dotenv/config";


const { SENDGRID_API_KEY, SENGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = data => {
    const msg = { ...data, from: SENGRID_EMAIL_FROM };
    return sgMail.send(msg);
};

export default sendMail;