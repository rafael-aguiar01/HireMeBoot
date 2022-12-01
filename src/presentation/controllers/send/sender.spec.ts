import { MissingParamError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
import { SendController } from "./sender"

describe('Send Controller', () => {
    test('Should return 400 if no cellphone is provided', async() => {
        const sendStub = {
            cellphone: 'valid_celphone',
            message: 'valid_message'
        }
        const sut = new SendController(sendStub)
        const httpRequest = {
            body: {
                message: 'valid_message'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('cellphone')))
    })
})