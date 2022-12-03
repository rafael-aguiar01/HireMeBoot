import express from 'express'
import { create } from 'venom-bot'
import { Send } from '../infra/VenomBot/venom-sender'
const app = express()
const port = 5050

app.use(express.json())
create({
  session: 'HireMeBoot',
  multidevice: true
}).then((client) => {
  start(client)
  app.post('/send', async (req, res) => {
    const { cellphone, message } = req.body
    const send = new Send(client, cellphone)
    const ok = await send.sendText(cellphone, message)
    res.send(ok)
  })
})
  .catch((erro) => {
    console.log(erro)
  })

function start (client): any {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome Venom 🕷')
        .then((result) => {
          console.log('Result: ', result)
          return client
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}

app.listen(port, () => {
  console.log(`HireMeBoot listening on port ${port}`)
})
