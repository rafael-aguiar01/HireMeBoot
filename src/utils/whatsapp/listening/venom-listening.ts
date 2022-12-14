import { ServiceBoot } from '../service-boot'
import { Reply } from '../reply/venom-reply'

export async function listening () {
  const client = await ServiceBoot.client
  const reply = new Reply()

  client.onMessage(async (message) => {
    if (!message.isGroupMsg) {
      await reply.replyMessage(
        client,
        message.from,
        message.notifyName,
        message.body
      )
    }
  })
}
