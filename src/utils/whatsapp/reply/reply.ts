import { Whatsapp } from 'venom-bot'
import { Send } from '../send/sender'
import { messages } from '../messages'

export class Reply {
  async reply (
    client: Whatsapp,
    from: string,
    notifyName: string,
    messageBody: string
  ){
    let answer = messages[messageBody]
    const defaultMessage = messages[0]
    const send = new Send(client)
    if (!answer) {
      answer = defaultMessage
    }
    await send.sendText(from, answer(notifyName))
  }
}
