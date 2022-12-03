export interface Sender {
  sendText (to: string, message: string): Promise<any>
}
