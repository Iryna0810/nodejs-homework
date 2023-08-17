import Mailjet from 'node-mailjet'
import "dotenv/config";

const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC, EMAIL_FROM } = process.env;


const mailjet = Mailjet.apiConnect(
    MJ_APIKEY_PUBLIC,
    MJ_APIKEY_PRIVATE,
);

const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: EMAIL_FROM,
                Name: "Mailjet Pilot"
              },
              To: [
                {
                  Email: "irinavakulenko2000@gmail.com",
                  Name: "passenger 1"
                }
              ],
              Subject: "Your email flight plan!",
              TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
              HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
            }
          ]
        })

request
    .then((result) => {
        console.log(result.body)
    })
    .catch((err) => {
        console.log(err.statusCode)
    })

    export default request