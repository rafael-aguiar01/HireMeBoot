import { SendModel } from '../../../domain/models/sendModel'
import { Send } from '../../../domain/usecases/sendMessage'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { SendController } from './sender'

describe('Send Controller', () => {
  const makeFakeSendMessage = (): SendModel => ({
    cellphone: 'valid_cellphone',
    message: 'valid_message'
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
    sendMessageStub: Send
  }

  const makeSut = (): SutTypes => {
    const sendMessageStub = makeSendMessage()
    const sut = new SendController(makeFakeSendMessage())
    return {
      sut,
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
})
