import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
const user = process.env.IONOS_EMAIL
const pass = process.env.IONOS_PASSWORD



export const email = async (to, subject, msg) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 587,
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
    viewPath: path.resolve('./server/utils/email/emailTemplates'),


    }, ))


    let info = await transporter.sendMail({
        from: '"Michael Spinks" <michael.spinks@mikespinks.dev>',
        to: to,
        subject: "Formatted #2",
        text: `${msg}`,
        template:'index'
    })

    console.log("Message Sent: %s", info.messageId)

}