import { ServiceBoot } from './serviceBoot'

export async function start () {
  const client = await ServiceBoot.client
  client.onMessage((message) => {
    if (message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Olá eu sou o HireMeBoot')
        .then((result) => {
          console.log('Result: ', result)
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}
