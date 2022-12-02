export interface ParsePhoneNumber {
  parse (value: string): Promise<string>
}
