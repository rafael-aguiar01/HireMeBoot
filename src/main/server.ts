import express from 'express'
import { create } from 'venom-bot'
// import { create, Whatsapp } from 'venom-bot'
// import { Send } from '../infra/VenomBot/venom-sender'
import { start } from './start'

const app = express()
const port = 5050
app.use(express.json())

create({
  session: 'HireMeBoot',
  multidevice: true
}).then((client) => {
  start(client)
}).catch((error) => {
  console.error(error)
})

// create({
//   session: 'HireMeBoot',
//   multidevice: true
// }).then((client) => {
//   start(client)
//   app.post('/send', async (req, res) => {
//     const { cellphone, message } = req.body
//     const send = new Send(client)
//     const ok = await send.sendText(cellphone, message)
//     res.send(ok)
//   })
// })
//   .catch((erro) => {

//   })

// function start (client): any {
//   client.onMessage((message) => {
//     if (message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'Olá eu sou o HireMeBoot')
//         .then((result) => {
//           console.log('Result: ', result)
//           return client
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro)
//         })
//     }
//   })
// }

app.listen(port, () => {
  console.log(`HireMeBoot listening on port ${port}`)
})
