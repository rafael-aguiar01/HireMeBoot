import { CellphoneValidator } from '../../presentation/protocols/cellphone-validator'
import isValidPhoneNumber from 'libphonenumber-js'

export class CellphoneValidatorAdapter implements CellphoneValidator {
  isValid (cellphone: string): boolean {
    if (isValidPhoneNumber(cellphone, 'BR')){
      return true
    } else {
      return false
    }
  }
}
