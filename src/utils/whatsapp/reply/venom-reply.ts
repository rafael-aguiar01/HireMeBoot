import { Whatsapp } from 'venom-bot'
import { Send } from '../send/venom-sender'
import { messages } from '../messages'

export class Reply {
  async replyMessage (
    venomClient: Whatsapp,
    userNumber: string,
    userName: string,
    messageReceived: string
  ){
    const send = new Send(venomClient)
    let answer = messages[messageReceived]
    const defaultMessage = messages[0]
    if (!answer) {
      answer = defaultMessage
    }
    await send.sendMessage(userNumber, answer(userName))
  }
}
