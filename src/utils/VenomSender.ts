export class Send {
  private readonly client
  private readonly number

  constructor (client: any, chatId: any){
    this.client = client
    this.number = chatId
  }

  async sendText (to: string, message: string): Promise<any> {
    try {
      await this.client.sendText(this.number(to), message)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
