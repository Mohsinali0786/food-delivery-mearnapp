const  { emailTransporter }  = require("./createMailTransport");


const sendVerificationEmail = (user,emailToken) =>{
    const transporter =emailTransporter()
    const verificationUrl = `http://localhost:5174/verify-email/?userId=${user?.id}`;
    // let  verificationUrl = `http://mm-traders-app-frontend.vercel.app/verify-email?emailToken=${user.emailToken}`;
    console.log(verificationUrl, 'verificationUrl')
            console.log(verificationUrl,'verificationUrl')
            const mailOptions = {
                from: 'freelancers00786@gmail.com',
                to: user.email,
                subject: 'Verify Your Email',
                html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`

            };
            transporter.sendMail(mailOptions,function(error, info){ 
                if (error) console.log(error,'errr'); 
                console.log('Email Sent Successfully',info); 
                return info
            });
}
module.exports = {sendVerificationEmail}