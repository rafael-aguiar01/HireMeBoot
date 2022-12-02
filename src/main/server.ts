import express from 'express'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const venom = require('venom-bot')
const app = express()
const port = 5050

venom
  .create({
    session: 'session-name',
    multidevice: true
  })
  .then((client) => start(client))
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
