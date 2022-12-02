import { parsePhoneNumber } from 'libphonenumber-js'
import { ParsePhoneNumber } from '../../data/protocols/pharsePhoneNumber'

export class LibPhoneNumberAdapter implements ParsePhoneNumber{
  async parse (value: string): Promise<string> {
    const numberParsed = parsePhoneNumber(value, 'BR').format('E.164').replace('+', '')
    const result = numberParsed.includes('@c.us') ? numberParsed : `${numberParsed}@c.us`
    return result
  }
}
