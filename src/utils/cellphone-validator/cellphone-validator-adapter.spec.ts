import { CellphoneValidatorAdapter } from './cellphone-validator-adapter'

const makeSut = (): CellphoneValidatorAdapter => {
  return new CellphoneValidatorAdapter()
}

describe('CellphoneValidator Adapter', () => {
  test('Should return true if isValidPhoneNumber returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('11789452314')
    expect(isValid).toBe(true)
  })
})
