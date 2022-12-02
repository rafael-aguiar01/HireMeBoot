import { SendModel } from '../../../domain/models/sendModel'
import { Send } from '../../../domain/usecases/sendMessage'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { CellphoneValidator } from '../../protocols/cellphone-validator'
import { SendController } from './sender'
import { HttpRequest } from '../../protocols/http'

describe('Send Controller', () => {
  const makePhoneNumberValidator = (): CellphoneValidator => {
    class PhoneNumberValidatorStub implements CellphoneValidator {
      isValid (cellphone: string): boolean {
        return true
      }
    }
    return new PhoneNumberValidatorStub()
  }
  const makeFakeSendMessage = (): SendModel => ({
    cellphone: 'valid_cellphone',
    message: 'valid_message'
  })

  const makeFakeRequest = (): HttpRequest => ({
    body: {
      cellphone: '11977805377',
      message: 'valid_message'
    }
  })

  const makeSendMessage = (): Send => {
    class SendMessageStub implements Send {
      async send (send: SendModel): Promise<any> {
        return new Promise(resolve => resolve(makeFakeSendMessage()))
      }
    }
    return new SendMessageStub()
  }

  interface SutTypes{
    sut: SendController
    phoneNumberValidatorStub: CellphoneValidator
    sendMessageStub: Send
  }

  const makeSut = (): SutTypes => {
    const sendMessageStub = makeSendMessage()
    const phoneNumberValidatorStub = makePhoneNumberValidator()
    const sut = new SendController(sendMessageStub, phoneNumberValidatorStub)
    return {
      sut,
      phoneNumberValidatorStub,
      sendMessageStub
    }
  }

  test('Should return 400 if no cellphone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        message: 'valid_message'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cellphone')))
  })

  test('Should return 400 if no message is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cellphone: 'valid_cellphone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('message')))
  })

  test('Should return 400 if an invalid cellphone is provided', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('11977805377')))
  })

  test('Should return 500 if PhoneNumberValidator throws', async () => {
    const { sut, phoneNumberValidatorStub } = makeSut()
    jest.spyOn(phoneNumberValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, sendMessageStub } = makeSut()
    const sendSpy = jest.spyOn(sendMessageStub, 'send')
    await sut.handle(makeFakeRequest())
    expect(sendSpy).toHaveBeenCalledWith({
      cellphone: '11977805377',
      message: 'valid_message'
    })
  })
})
