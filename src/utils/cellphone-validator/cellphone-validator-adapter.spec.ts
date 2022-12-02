import { CellphoneValidatorAdapter } from './cellphone-validator-adapter'

const makeSut = (): CellphoneValidatorAdapter => {
  return new CellphoneValidatorAdapter()
}
const validPhoneNumber = '11977805388'
const invalidPhoneNumber = 'AHJHAJDFAD'

describe('CellphoneValidator Adapter', () => {
  test('Should return false if isValidPhoneNumber returns false', () => {
    const sut = makeSut()
    const isvalid = sut.isValid(invalidPhoneNumber)
    expect(isvalid).toBe(false)
  })
  test('Should return true if isValidPhoneNumber returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(validPhoneNumber)
    expect(isValid).toBe(true)
  })
})
