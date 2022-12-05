export interface Sender {
  sendMessage (to: string, message: string): Promise<any>
}
