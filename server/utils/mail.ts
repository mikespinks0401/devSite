import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
const user = process.env.EMAIL_EMAIL
const pass = process.env.EMAIL_PASSWORD
const name = process.env.EMAIL_NAME

const from = `"${name}" <${user}>`

const testingServer = false
const host = testingServer ? 'localhost' : process.env.EMAIL_HOST
const port = testingServer ? '7778' : process.env.EMAIL_PORT

interface MessageDetails{
    emailAddress: string,
    emailMsg: string,
    emailName: string,
    emailSubject: string,
    emailPhone?: string
}
interface Email{
    
    to: string,
    subject: string,
    msg: MessageDetails,
    template:string
    
}

const config = useRuntimeConfig();

//get email info from .env 
export const mainEmail = config.mainEmail;
export const siteEmail = config.siteEmail;

export const email:(msgInfo: Email) => Promise<void> = async (msgInfo: Email) => {
    if(!msgInfo){
        return
    }
    if(!msgInfo.template){
        return
    }
    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false,
        auth: {
            user: user,
            pass: pass
        }
    });

    transporter.use('compile', hbs({
        viewEngine: {
        defaultLayout: false,
        layoutsDir: path.resolve('./server/utils/email/layouts/'),
        partialsDir: path.resolve('./server/utils/email/partials/')
    },
    viewPath: path.resolve('./server/utils/email/templates'),


    }, ))

    if (msgInfo.template === 'contact'){

    }


    let info = await transporter.sendMail({
        from: from,
        to: msgInfo.to,
        subject: msgInfo.subject,
        template:msgInfo.template,
        context:{
            emailAddress: msgInfo.msg.emailAddress,
            emailMsg: msgInfo.msg.emailMsg,
            emailName: msgInfo.msg.emailName,
            emailSubject: msgInfo.msg.emailSubject,
            emailPhone: msgInfo.msg.emailPhone
        }
    })

    console.log("Message Sent: %s", info.messageId)

}