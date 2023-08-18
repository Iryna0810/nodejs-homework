import nodemailer from "nodemailer";
import "dotenv/config";

const { UKR_PASSWORD, EMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 25, // 465, 2525
  secure: false,
  auth: {
    user: EMAIL_FROM,
    pass: UKR_PASSWORD,
  }
};


const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   from: EMAIL_FROM,
//   to: "irinavakulenko2000@meta.ua",
//   subject: "Test email",
//   html: "<h3> <strong>TEST EMAIL </strong>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
// };

const sendEmail = data => {
  const email = { ...data, from: EMAIL_FROM };
  return transport.sendMail(email)
};

export default sendEmail


// transport.sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message))



// const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC, EMAIL_FROM } = process.env;


// const mailjet = Mailjet.apiConnect(MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC)
// const request = mailjet
// .post("send", {'version': 'v3.1'})
// .request({
//   "Messages":[
//     {
//       "From": {
//         "Email": "irinavakulenko2000@meta.ua",
//         "Name": "irina"
//       },
//       "To": [
//         {
//           "Email": "irinavakulenko2000@meta.ua",
//           "Name": "irina"
//         }
//       ],
//       "Subject": "Greetings from Mailjet.",
//       "TextPart": "My first Mailjet email",
//       "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       "CustomID": "AppGettingStartedTest"
//     }
//   ]
// })
// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })

//   export default request





// import Mailjet from 'node-mailjet'
// import "dotenv/config";

// const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC, EMAIL_FROM } = process.env;


// const mailjet = Mailjet.apiConnect(
//     MJ_APIKEY_PUBLIC,
//     MJ_APIKEY_PRIVATE,
// );


// const request = mailjet.post("send", {'version': 'v3.1'})
// .request({
//   "Messages":[
//     {
//       "From": {
//         "Email": "irinavakulenko2000@meta.ua",
//         "Name": "irina"
//       },
//       "To": [
//         {
//           "Email": "irinavakulenko2000@meta.ua",
//           "Name": "irina"
//         }
//       ],
//       "Subject": "Greetings from Mailjet.",
//       "TextPart": "My first Mailjet email",
//       "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
//       "CustomID": "AppGettingStartedTest"
//     }
//   ]
// })

// request
//   .then((result) => {
//     console.log(result.body)
//   })
//   .catch((err) => {
//     console.log(err.statusCode)
//   })

// export default request