import { LibPhoneNumberAdapter } from './libphonenumber-adapter'

const makeSut = (): LibPhoneNumberAdapter => {
  return new LibPhoneNumberAdapter()
}
const validPhoneNumber = '11977805388'
const parsePhoneNumber = '5511977805388@c.us'

describe('Libphonenumber Adapter', () => {
  test('Should return a correct number on success', async () => {
    const sut = makeSut()
    const parseReturn = await sut.parse(validPhoneNumber)
    expect(parseReturn).toBe(parsePhoneNumber)
  })
})
