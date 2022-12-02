import { parsePhoneNumber } from 'libphonenumber-js'
import { ParsePhoneNumber } from '../../data/protocols/pharsePhoneNumber'

export class LibPhoneNumberAdapter implements ParsePhoneNumber{
  async parse (value: string): Promise<string> {
    return parsePhoneNumber(value, 'BR').format('E.164').replace('+', '')
  }
}
