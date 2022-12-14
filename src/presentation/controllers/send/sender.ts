import { Controller, HttpRequest, HttpResponse, CellphoneValidator, Sender } from './send-protocols'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'

export class SendController implements Controller {
  private readonly client: Sender
  private readonly phoneNumberValidator: CellphoneValidator

  constructor (sendData: Sender, phoneNumberValidator: CellphoneValidator) {
    this.client = sendData
    this.phoneNumberValidator = phoneNumberValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = [
        'cellphone',
        'message'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { cellphone, message } = httpRequest.body
      const isValid = this.phoneNumberValidator.isValid(cellphone)
      if (!isValid) {
        return badRequest(new InvalidParamError(cellphone))
      }
      const result = this.client.sendMessage(cellphone, message)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}
