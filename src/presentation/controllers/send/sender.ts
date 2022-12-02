import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { SendModel } from '../../../domain/models/sendModel'
import { badRequest } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { CellphoneValidator } from '../../protocols/cellphone-validator'

export class SendController implements Controller {
  private readonly sendData: SendModel
  private readonly phoneNumberValidator: CellphoneValidator

  constructor (sendData: SendModel, phoneNumberValidator: CellphoneValidator) {
    this.sendData = sendData
    this.phoneNumberValidator = phoneNumberValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = [
      'cellphone',
      'message'
    ]
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { cellphone } = httpRequest.body

    const isValid = this.phoneNumberValidator.isValid(cellphone)
    if (!isValid) {
      return badRequest(new InvalidParamError(cellphone))
    }
  }
}
