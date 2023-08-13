import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import * as path from 'path'
import { fileURLToPath } from 'url';
import mjml from 'mjml';
import handlebars from 'handlebars';


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const verifyEmailRawTemplate = readFileSync(`${__dirname}/templates/verify-email.hbs`, 'utf8');
const verifyEmailCompiledTemplate = handlebars.compile(verifyEmailRawTemplate);

const sendEmail = () => {
    try {
        const email_data = {
            verificationLink: `${process.env.ALLOWED_URL}/verify-account/?token=`
        }

        const hbshtml = verifyEmailCompiledTemplate(email_data)
        const templateMarkup = mjml(hbshtml)

        const email_message = {
            to: email_data,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject: "EFF BEE HIGH Account Verification"
        }

        await sgMail.sendEmail(email_message)
        return "Successfully sent Email"

    } catch (err) {
        console.errror(err)
        throw new Error("An error occured")
    }
}


export default sendEmail;