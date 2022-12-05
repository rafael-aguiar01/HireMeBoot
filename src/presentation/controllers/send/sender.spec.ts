import { SendModel } from '../../../domain/models/send-model'
import { HttpRequest, CellphoneValidator, Sender } from './send-protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MissingParamError, ServerError } from '../../errors'
import { SendController } from './sender'

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
    message: 'valid_message'
  })

  const makeFakeRequest = (): HttpRequest => ({
    body: {
      cellphone: '11977805377',
      message: 'valid_message'
    }
  })

  const makeFakeClient = (): Sender => {
    class SendMessageStub implements Sender {
      async sendMessage (to: string, message: string): Promise<any> {
        return new Promise(resolve => resolve(makeFakeSendMessage()))
      }
    }
    return new SendMessageStub()
  }

  interface SutTypes{
    sut: SendController
    phoneNumberValidatorStub: CellphoneValidator
    client: Sender
  }

  const makeSut = (): SutTypes => {
    const phoneNumberValidatorStub = makePhoneNumberValidator()
    const client = makeFakeClient()
    const sut = new SendController(client, phoneNumberValidatorStub)
    return {
      sut,
      phoneNumberValidatorStub,
      client
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

  test('Should call client with correct values', async () => {
    const { sut, client } = makeSut()
    const sendSpy = jest.spyOn(client, 'sendMessage')
    await sut.handle(makeFakeRequest())
    expect(sendSpy).toHaveBeenCalledWith('11977805377', 'valid_message')
  })
})
