import { ServiceBoot } from './service-boot'
import { Reply } from './reply'

export async function start () {
  const client = await ServiceBoot.client
  const reply = new Reply()

  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      await reply.reply(
        client,
        message.from,
        message.notifyName,
        message.body
      )
    }
  })
}
