import { create, Whatsapp, SocketState } from 'venom-bot'

export interface QRCode {
  baseQR: string
  asciiQR: string
  attempts: number
}

export interface MenuItem {
  title: string
  description: string
}

export interface ListMenu {
  title: string
  rows: MenuItem[]
}

class Work {
  private client: Whatsapp
  private qr: QRCode
  private connected: boolean

  constructor () {
    this.initialize()
  }

  get qrCode (): QRCode {
    return this.qr
  }

  get isConnected (): boolean {
    return this.connected
  }

  private initialize (): any {
    const qr = (baseQR: string, asciiQR: string, attempts: number): any => {
      this.qr = { baseQR, asciiQR, attempts }
    }

    const statusFind = (statusSession: string, status: string): any => {
      this.connected = [
        'isLogged',
        'qrReadSuccess',
        'chatsAvailable'
      ].includes(statusSession)
      console.log('Status', status)
    }

    const start = async (client: Whatsapp): Promise<any> => {
      this.client = client

      await client.onStateChange((state) => {
        this.connected = state === SocketState.CONNECTED
      })
    }

    create('ws-sender', qr, statusFind)
      .then(async (client) => start(client))
      .catch((error) => console.error(error))
  }
}

export default Work
