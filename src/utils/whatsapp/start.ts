import { ServiceBoot } from './service-boot'
import { defaultMessage } from './messages/default-message'

export async function start () {
  const client = await ServiceBoot.client

  client.onMessage(async (message) => {
    if (!message.isGroupMsg){
      await client.sendText(message.from, defaultMessage(message.notifyName))
        .then()
        .catch((erro) => {
          console.error('Error when sending: ', erro)
        })
    }
  })
}
