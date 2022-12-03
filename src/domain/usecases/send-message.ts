import { SendReturn } from '../models/send-model'

export interface Send {
  send (send: any): Promise<SendReturn>
}
