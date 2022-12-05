import { Sender } from '../../../domain/usecases/send-message'
import { Whatsapp } from 'venom-bot'

export class Send implements Sender {
  private readonly client

  constructor (client: Whatsapp){
    this.client = client
  }

  async sendMessage (to: string, message: string): Promise<any> {
    try {
      await this.client.sendText(to, message)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
