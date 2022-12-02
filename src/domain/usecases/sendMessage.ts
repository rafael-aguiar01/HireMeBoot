import { SendModel, SendReturn } from '../models/sendModel'

export interface Send {
  send (send: SendModel): Promise<SendReturn>
}
