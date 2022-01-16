const sData = require('./serverData.js')
const mailer = require('nodemailer')

const transport = mailer.createTransport(sData.mailerData)

async function serverCallback(req, res) {
   try {
      const data = Object.entries(req.body).map(e => {
         return `${e[0]}: ${e[1]},\n`
      }).join('')
   
      await transport.sendMail({
         from: '"MOTOSHAR" <info@motoshar.ru>',
         to: 'info@motoshar.ru',
         subject: 'CALLBACK MOTOSHAR',
         text: data,
      })
   
      res.send('ok')
   } catch (err) {
      console.log(err)
   }
}

module.exports = serverCallback