import { Whatsapp } from 'venom-bot'
import { listening } from './listening/venom-listening'

export class ServiceBoot {
  static instance: ServiceBoot

  static client: Whatsapp

  public static setInstance (client: Whatsapp): any {
    ServiceBoot.client = client
  }

  public static start () {
    listening()
  }
}
