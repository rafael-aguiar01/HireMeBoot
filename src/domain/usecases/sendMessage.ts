import { SendReturn } from '../models/sendModel'

export interface Send {
  send (send: any): Promise<SendReturn>
}
