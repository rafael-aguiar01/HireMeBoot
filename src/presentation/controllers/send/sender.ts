import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { CellphoneValidator } from '../../protocols/cellphone-validator'
import { Sender } from '../../../data/protocols/send-message'

export class SendController implements Controller {
  private readonly sendData: Sender
  private readonly phoneNumberValidator: CellphoneValidator

  constructor (sendData: Sender, phoneNumberValidator: CellphoneValidator) {
    this.sendData = sendData
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
      const result = this.sendData.sendText(cellphone, message)
      return ok(result)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
