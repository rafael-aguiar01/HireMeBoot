import { Router } from 'express'
import { makeSendMessageController } from '../factories/send-message'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/send', adaptRoute(makeSendMessageController()))
}
