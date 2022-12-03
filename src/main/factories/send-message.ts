import { Send } from '../../infra/VenomBot/venom-sender'
import { SendController } from '../../presentation/controllers/send/sender'
import { Controller } from '../../presentation/protocols/controller'
import { CellphoneValidatorAdapter } from '../../utils/phone-validator/cellphone-validator-adapter'
import { ServiceBoot } from '../../utils/whatsapp/service-boot'

export const makeSendMessageController = (): Controller => {
  const client = ServiceBoot.getInstance
  const phoneNumberValidator = new CellphoneValidatorAdapter()
  const sendData = new Send(client)
  const sendController = new SendController(sendData, phoneNumberValidator)
  return sendController
}
