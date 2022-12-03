export class Send {
  private readonly client

  constructor (client: any, chatId: any){
    this.client = client
  }

  async sendText (to: string, message: string): Promise<any> {
    try {
      await this.client.sendText(to, message)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
