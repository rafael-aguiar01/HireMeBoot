export function start (client): any {
  client.onMessage((message) => {
    if (message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Olá eu sou o HireMeBoot')
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
