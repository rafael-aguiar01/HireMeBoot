import { Whatsapp } from 'venom-bot'
import { Send } from '../../infra/VenomBot/venom-sender'
import { messages } from './messages'

export class Reply {
  async reply (
    client: Whatsapp,
    from: string,
    notifyName: string,
    messageBody: string
  ){
    let answer = messages[messageBody]
    if (!answer) {
      answer = messages[0]
    }
    const send = new Send(client)
    await send.sendText(from, answer(notifyName))
  }
}
